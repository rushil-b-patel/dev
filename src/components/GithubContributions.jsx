import { useContext } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { ThemeContext } from "./ThemeContext";


const THEME = {
	light: ["#f4f4f5", "#d4d4d8", "#a1a1aa", "#52525b", "#18181b"],
	dark: ["#18181b", "#3f3f46", "#71717a", "#a1a1aa", "#e4e4e7"],
};

export default function GithubContributions() {
	const { theme } = useContext(ThemeContext);
	const colorScheme = theme === "dark" ? "dark" : "light";

  	return (
		<section id="Contributions" className="mt-10">
			<div className="rounded-xl border border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-3 py-4">
				<div className="w-full flex justify-center select-none">
					<div className="w-full max-w-full overflow-x-auto [scrollbar-width:thin]">
						<GitHubCalendar
							username="rushil-b-patel"
							year="last"
							theme={THEME}
							colorScheme={colorScheme}
							fontSize={12}
							blockSize={10}
							blockMargin={2}
							blockRadius={2}
							labels={{
								totalCount: "{{count}} contributions in the last year",
								legend: { less: "Less", more: "More" },
							}}
							tooltips={{
								activity: {
								text: (activity) =>
									`${activity.count} contribution${activity.count === 1 ? "" : "s"} on ${activity.date}`,
								},
							}}
							errorMessage="Could not load contributions."
						/>
					</div>
				</div>
			</div>
		</section>
  );
}
