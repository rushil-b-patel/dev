import { useEffect, useState, useMemo, useContext } from 'react';
import { fetchContributions } from '../services/githubService';
import { ThemeContext } from './ThemeContext';

const CONTRIBUTION_COLORS = {
    light: ['#ebedf0', '#9be9a8', '#40c463', '#30a14e', '#216e39'],
    dark: ['#161b22', '#646464', '#A5A5A5', '#DDDDDD', '#F6F6F6']
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function ContributionHeatMap({ username }) {
    const [contributions, setContributions] = useState([]);
    const [totals, setTotals] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedYear, setSelectedYear] = useState('last');
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, date: '', count: 0 });

    const currentYear = new Date().getFullYear();
    const years = useMemo(() => {
        const yrs = [];
        for (let y = currentYear; y >= 2021; y--) {
            yrs.push(y);
        }
        return yrs;
    }, [currentYear]);

    useEffect(() => {
        const loadContributions = async () => {
            setLoading(true);
            const data = await fetchContributions(username, selectedYear);
            setContributions(data.contributions);
            setTotals(data.total);
            setLoading(false);
        };
        loadContributions();
    }, [username, selectedYear]);

    const weeks = useMemo(() => {
        if (!contributions.length) return [];

        const weeksArr = [];
        let currentWeek = [];

        if (contributions.length > 0) {
            const firstDate = new Date(contributions[0].date);
            const firstDayOfWeek = firstDate.getDay();
            for (let i = 0; i < firstDayOfWeek; i++) {
                currentWeek.push(null);
            }
        }

        contributions.forEach((contrib) => {
            currentWeek.push(contrib);
            if (currentWeek.length === 7) {
                weeksArr.push(currentWeek);
                currentWeek = [];
            }
        });

        if (currentWeek.length > 0) {
            while (currentWeek.length < 7) {
                currentWeek.push(null);
            }
            weeksArr.push(currentWeek);
        }

        return weeksArr;
    }, [contributions]);

    const monthLabels = useMemo(() => {
        if (!weeks.length) return [];

        const labels = [];
        let currentMonth = -1;
        let startWeek = 0;

        weeks.forEach((week, weekIndex) => {
            const validDay = week.find(d => d !== null);
            if (validDay) {
                const month = new Date(validDay.date).getMonth();
                if (month !== currentMonth) {
                    if (currentMonth !== -1) {
                        labels.push({
                            month: MONTHS[currentMonth],
                            startWeek,
                            span: weekIndex - startWeek
                        });
                    }
                    currentMonth = month;
                    startWeek = weekIndex;
                }
            }
        });

        if (currentMonth !== -1) {
            labels.push({
                month: MONTHS[currentMonth],
                startWeek,
                span: weeks.length - startWeek
            });
        }

        return labels;
    }, [weeks]);

    const handleMouseEnter = (e, contrib) => {
        if (!contrib) return;
        const rect = e.target.getBoundingClientRect();
        setTooltip({
            visible: true,
            x: rect.left + rect.width / 2,
            y: rect.top - 8,
            date: new Date(contrib.date).toLocaleDateString(undefined, {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            }),
            count: contrib.count
        });
    };

    const handleMouseLeave = () => {
        setTooltip({ ...tooltip, visible: false });
    };

    const { theme } = useContext(ThemeContext);
    const colors = theme === 'dark' ? CONTRIBUTION_COLORS.dark : CONTRIBUTION_COLORS.light;

    const totalContributions = useMemo(() => {
        if (selectedYear === 'last') {
            return totals.lastYear || contributions.reduce((sum, c) => sum + c.count, 0);
        }
        return totals[selectedYear] || contributions.reduce((sum, c) => sum + c.count, 0);
    }, [totals, selectedYear, contributions]);

    const totalWeeks = weeks.length;

    return (
        <div className="mb-10">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                <div className="flex items-center gap-2">
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="px-2 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 focus:outline-none"
                    >
                        <option value="last">Last Year</option>
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 dark:border-white" />
                </div>
            ) : (
                <div className="p-4 sm:p-5 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {totalContributions.toLocaleString()} contributions {selectedYear === 'last' ? 'in the last year' : `in ${selectedYear}`}
                    </div>

                    <div className="w-full">
                        <div
                            className="grid text-xs text-gray-500 dark:text-gray-400 mb-1"
                            style={{
                                gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`,
                                paddingLeft: '0'
                            }}
                        >
                            {monthLabels.map((label, i) => (
                                <div
                                    key={i}
                                    style={{
                                        gridColumn: `${label.startWeek + 1} / span ${Math.max(1, label.span)}`,
                                        paddingLeft: '2px'
                                    }}
                                >
                                    {label.month}
                                </div>
                            ))}
                        </div>

                        <div
                            className="grid gap-[2px]"
                            style={{
                                gridTemplateColumns: `repeat(${totalWeeks}, 1fr)`,
                                gridTemplateRows: 'repeat(7, 1fr)'
                            }}
                        >
                            {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => (
                                weeks.map((week, weekIndex) => {
                                    const day = week[dayIndex];
                                    return (
                                        <div
                                            key={`${weekIndex}-${dayIndex}`}
                                            className="aspect-square rounded-sm cursor-pointer transition-transform hover:scale-110"
                                            style={{
                                                backgroundColor: day ? colors[day.level] : 'transparent',
                                                gridColumn: weekIndex + 1,
                                                gridRow: dayIndex + 1
                                            }}
                                            title={day ? `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${new Date(day.date).toLocaleDateString()}` : ''}
                                            onMouseEnter={(e) => handleMouseEnter(e, day)}
                                            onMouseLeave={handleMouseLeave}
                                        />
                                    );
                                })
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-1 mt-4 text-xs text-gray-500 dark:text-gray-400">
                        <span>Less</span>
                        {colors.map((color, i) => (
                            <div
                                key={i}
                                className="w-[10px] h-[10px] rounded-sm"
                                style={{ backgroundColor: color }}
                            />
                        ))}
                        <span>More</span>
                    </div>
                </div>
            )}

            {tooltip.visible && (
                <div
                    className="fixed z-50 px-2 py-1 text-xs bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded shadow-lg pointer-events-none whitespace-nowrap"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y,
                        transform: 'translate(-50%, -100%)'
                    }}
                >
                    <strong>{tooltip.count} contribution{tooltip.count !== 1 ? 's' : ''}</strong> on {tooltip.date}
                </div>
            )}
        </div>
    );
}
