import { useEffect, useState } from 'react';
import { fetchPRs } from '../services/githubService';
import { FaCodeBranch, FaGithub } from 'react-icons/fa';

const ITEMS_PER_PAGE = 6;

export default function Github() {
    const [prs, setPrs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [userFilter, setUserFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    useEffect(() => {
        const loadPRs = async () => {
            const data = await fetchPRs();
            setPrs(data);
            setLoading(false);
        };
        loadPRs();
    }, []);

    const filteredPrs = prs.filter(pr => {
        const searchMatch = searchQuery === '' || pr.title.toLowerCase().includes(searchQuery.toLowerCase());
        const userMatch = userFilter === 'all' || (userFilter === 'personal' && pr.user.login === 'rushil-b-patel') || (userFilter === 'work' && pr.user.login === 'rusp-odoo');
        let statusMatch = true;
        if (statusFilter === 'open') statusMatch = pr.state === 'open';
        else if (statusFilter === 'closed') statusMatch = pr.state === 'closed' && !pr.mergedAt;
        else if (statusFilter === 'merged') statusMatch = !!pr.mergedAt;

        return searchMatch && userMatch && statusMatch;
    });

    const visiblePrs = filteredPrs.slice(0, visibleCount);
    const hasMore = visibleCount < filteredPrs.length;

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + ITEMS_PER_PAGE);
    };

    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
    }, [searchQuery, userFilter, statusFilter]);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'open':
                return 'border-green-600 text-green-700 dark:text-green-400';
            case 'merged':
                return 'border-purple-600 text-purple-700 dark:text-purple-400';
            default:
                return 'border-red-600 text-red-700 dark:text-red-400';
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                <div className="flex items-center gap-3">
                    <FaGithub className="text-2xl text-gray-900 dark:text-white" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Pull Requests
                    </h2>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-neutral-600 w-32 sm:w-40"
                    />
                    <select
                        value={userFilter}
                        onChange={(e) => setUserFilter(e.target.value)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 focus:outline-none"
                    >
                        <option value="all">All Users</option>
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-700 dark:text-gray-300 focus:outline-none"
                    >
                        <option value="all">All Status</option>
                        <option value="open">Open</option>
                        <option value="merged">Merged</option>
                        <option value="closed">Closed</option>
                    </select>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900 dark:border-white" />
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {visiblePrs.map(pr => {
                            const isMerged = !!pr.mergedAt;
                            const status = pr.state === 'open' ? 'open' : isMerged ? 'merged' : 'closed';

                            return (
                                <a
                                    key={pr.id}
                                    href={pr.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block p-4 sm:p-5 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl hover:shadow-md transition-all duration-200 group"
                                >
                                    <div className="flex items-start justify-between gap-3 mb-4">
                                        <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors leading-snug">
                                            {pr.title}
                                        </h3>
                                        <img
                                            src={pr.user.avatar_url}
                                            alt={pr.user.login}
                                            className="w-7 h-7 rounded-full border border-gray-200 dark:border-neutral-700 flex-shrink-0"
                                            title={pr.user.login}
                                        />
                                    </div>

                                    <div className="flex flex-wrap items-center justify-between gap-2">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 rounded-md border border-gray-200 dark:border-neutral-700">
                                                <FaCodeBranch className="mr-1 text-[10px]" />
                                                {pr.repo}
                                            </span>
                                            <span className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-neutral-800 text-gray-500 dark:text-gray-400 rounded-md border border-gray-200 dark:border-neutral-700">
                                                {new Date(pr.createdAt).toLocaleDateString(undefined, {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    year: 'numeric'
                                                })}
                                            </span>
                                        </div>
                                        <span className={`px-2.5 py-0.5 text-xs font-semibold border rounded-md capitalize ${getStatusStyle(status)}`}>
                                            {status}
                                        </span>
                                    </div>
                                </a>
                            );
                        })}
                    </div>

                    {hasMore && (
                        <div className="flex justify-center mt-8">
                            <button
                                onClick={handleLoadMore}
                                className="px-6 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-200 dark:hover:bg-neutral-700 transition-colors"
                            >
                                Load More ({filteredPrs.length - visibleCount} remaining)
                            </button>
                        </div>
                    )}

                    {filteredPrs.length === 0 && (
                        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                            No pull requests match the selected filters.
                        </div>
                    )}
                </>
            )}
        </div>
    );
}