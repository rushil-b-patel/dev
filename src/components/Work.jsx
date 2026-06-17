const prs = [
    { title: "Added Breadcrumb to website editor", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/224247", status: "merged" },
    { title: "Can use Query Params to prefill form fields", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/264921", status: "open" },
    { title: "Can select multiple options from dropdown list", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/255671" , status: "open" },
    { title: "Migrate Google Maps to new Places API and AdvancedMarkerElement", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/242765", status: "open" },
    { title: "Added Dynamic Snippet Carousels for blogs, events & appointments", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/238099", status: "open" },
    { title: "Lazy Load Dynamic Snippets", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/215388", status: "open" },
    { title: "Refactored WebsiteUrlPicker component", repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/226324", status: "open" },
    { title: 'Added "Icon List" snippet with FontAwesome icon support', repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/225823", status: "open" },
    { title: 'Added icon inner snippet', repo: "odoo/odoo", url: "https://github.com/odoo/odoo/pull/214112", status: "merged" },
];

const statusDot = { merged: "#8957e5", open: "#238636", closed: "#da3633" };

export default function Work() {
    return (
        <section id="Work" className="mt-10">
            <h2 className="text-2xl font-bold">Some of my work</h2>
            <div className="flex flex-col p-4">
                {prs.map((pr, index) => (
                    <a key={index} href={pr.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-1.5 transition-all duration-200">
                        <div className="flex items-center gap-3 min-w-0">
                            <span style={{ backgroundColor: statusDot[pr.status] }} className="w-1.5 h-1.5 rounded-full shrink-0" />
                            <span className="text-sm font-medium text-app-primary truncate group-hover:text-app-secondary transition-colors duration-200">{pr.title}</span>
                        </div>
                        <span className="text-xs font-mono text-app-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0 hidden sm:inline">{pr.repo}</span>
                    </a>
                ))}
            </div>
        </section>
    );
}
