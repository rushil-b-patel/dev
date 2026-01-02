
export const fetchPRs = async () => {
    try {
        const response = await fetch('https://api.github.com/search/issues?q=is:pr+author:rushil-b-patel+author:rusp-odoo');
        if (!response.ok) {
            throw new Error('Failed to fetch PRs');
        }
        const data = await response.json();
        return data.items.map(pr => ({
            id: pr.id,
            title: pr.title,
            url: pr.html_url,
            state: pr.state,
            createdAt: pr.created_at,
            repo: pr.repository_url.replace('https://api.github.com/repos/', ''),
            number: pr.number,
            user: pr.user,
            mergedAt: pr.pull_request?.merged_at
        }));
    } catch (error) {
        console.error('Error fetching PRs:', error);
        return [];
    }
};
