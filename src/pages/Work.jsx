const prs = [
  {
    title: "Add Breadcrumb to website editor",
    repo: "odoo/odoo",
    url: "https://github.com/odoo/odoo/pull/224247",
    status: "merged",
  },
  {
    title: "Migrate Google Maps to new Places API and AdvancedMarkerElement",
    repo: "odoo/odoo",
    url: "https://github.com/odoo/odoo/pull/242765",
    status: "open",
  },
  {
    title: "Add Dynamic Snippet Carousels for blogs, events & appointments",
    repo: "odoo/odoo",
    url: "https://github.com/odoo/odoo/pull/238099",
    status: "open",
  },
  {
    title: "Add \"s_icon_list\" snippet with FontAwesome icon support",
    repo: "odoo/odoo",
    url: "https://github.com/odoo/odoo/pull/225823",
    status: "open",
  },
  {
    title: "Refactor WebsiteUrlPicker component",
    repo: "odoo/odoo",
    url: "https://github.com/odoo/odoo/pull/226324",
    status: "open",
  },
  {
    title: "Add \"s_icon\" inner snippet",
    repo: "odoo/odoo",
    url: "https://github.com/odoo/odoo/pull/214112",
    status: "merged",
  },
  {
    title: "Fix drag and drop of apps on odoo home screen (won't be accessbile: enterprise)",
    repo: "odoo/enterprise",
    url: "https://github.com/odoo/enterprise/pull/82752",
    status: "merged",
  },
  {
    title: "Custom Input in builder dropdown & Lazy Load dynamic snippet",
    repo: "odoo/odoo",
    url: "https://github.com/odoo/odoo/pull/215388",
    status: "closed",
  },
];

const statusDot = {
  merged: "#8957e5",
  open: "#238636",
  closed: "#da3633",
};

export default function Work() {
  return (
    <section id="Work" className="mt-10">
      <h2 className="text-2xl font-bold">Some of my work</h2>
      <div className="flex flex-col p-4">
        {prs.map((pr, index) => (
          <a
            key={index}
            href={pr.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between py-1 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <span style={{ backgroundColor: statusDot[pr.status] }} className="w-1.5 h-1.5 rounded-full shrink-0" />
              <span className="text-sm font-medium text-app-primary truncate group-hover:text-app-secondary transition-colors duration-200">
                {pr.title}
              </span>
            </div>
            <span className="text-xs font-mono text-app-muted opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                {pr.repo}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
