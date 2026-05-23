import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const abs = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(abs("dist/index.html"), "utf-8");
const { render } = await import("./dist/server/entry-server.js");

// Derive blog slugs from actual content files
const blogFiles = fs.readdirSync(abs("src/content/blog")).filter((f) =>
  f.endsWith(".md") || f.endsWith(".mdx")
);
const blogRoutes = blogFiles.map((f) => `/blog/${f.replace(/\.mdx?$/, "")}`);

const routes = ["/", "/blog", ...blogRoutes];

for (const url of routes) {
  const { html: appHtml, helmet } = render(url);

  let page = template.replace("<!--app-html-->", appHtml);

  if (helmet) {
    const { title, meta, link, script } = helmet;
    page = page
      .replace(/<title>[^<]*<\/title>/, title.toString())
      .replace("</head>", `${meta.toString()}${link.toString()}${script.toString()}</head>`);
  }

  const outPath =
    url === "/" ? abs("dist/index.html") : abs(`dist${url}.html`);

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, page);
  console.log("pre-rendered:", outPath.replace(abs("dist"), ""));
}
