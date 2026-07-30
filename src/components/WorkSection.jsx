import Work from "./Work";

const prs = [
    { title: "Add copy button to code blocks in markdown preview", url: "https://api.github.com/repos/microsoft/vscode/pulls/323609" },
    { title: "Multi-select dropdown options", url: "https://api.github.com/repos/odoo/odoo/pulls/255671" },
    { title: "Migrate Google Maps to Places API & AdvancedMarkerElement", url: "https://api.github.com/repos/odoo/odoo/pulls/242765" },
    { title: "Prefill form fields via query params", url: "https://api.github.com/repos/odoo/odoo/pulls/264921" },
    { title: "Icon List snippet with FontAwesome support", url: "https://api.github.com/repos/odoo/odoo/pulls/225823" },
    { title: "Breadcrumb support in website editor", url: "https://api.github.com/repos/odoo/odoo/pulls/224247" },
];

const webUrl = (api) =>
    api.replace("https://api.github.com/repos/", "https://github.com/").replace("/pulls/", "/pull/");

export default async function WorkSection() {
    const withStatus = await Promise.all(
        prs.map(async ({ title, url }) => {
            const res = await fetch(url, {
                headers: {
                    Accept: "application/vnd.github+json",
                    ...(process.env.GITHUB_TOKEN && { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }),
                },
                next: { revalidate: 3600 },
            });

            if (!res.ok) return { title, url: webUrl(url) };

            const pr = await res.json();
            return {
                title,
                url: pr.html_url,
                repo: pr.base.repo.full_name,
            };
        }),
    );

    return <Work prs={withStatus} />;
}
