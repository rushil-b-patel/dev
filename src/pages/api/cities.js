// Pages-router API route: unlike app-router route handlers, it receives every
// HTTP method, which is what lets us answer QUERY (RFC 10008).
const CITIES = [
    { name: "Ahmedabad", district: "Ahmedabad", type: "city" },
    { name: "Anand", district: "Anand", type: "city" },
    { name: "Nadiad", district: "Kheda", type: "city" },
    { name: "Vadodara", district: "Vadodara", type: "city" },
    { name: "Changa", district: "Anand", type: "village" },
    { name: "Sonaiya", district: "Kheda", type: "village" },
    { name: "Sevaliya", district: "Kheda", type: "village" },
];

const globToRegex = (glob) =>
    new RegExp(`^${glob.split("*").map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".*")}$`, "i");

export const config = { api: { bodyParser: false } };

const readBody = (req) =>
    new Promise((resolve) => {
        let data = "";
        req.on("data", (chunk) => (data += chunk));
        req.on("end", () => resolve(data));
    });

export default async function handler(req, res) {
    res.setHeader("Accept-Query", '"application/x-www-form-urlencoded"');

    if (req.method === "GET") return res.status(200).json(CITIES);
    if (req.method !== "QUERY") {
        res.setHeader("Allow", "GET, QUERY");
        return res.status(405).json({ error: `${req.method} not allowed` });
    }
    if (!req.headers["content-type"]?.includes("application/x-www-form-urlencoded")) {
        return res.status(415).json({ error: "expected application/x-www-form-urlencoded" });
    }

    const params = new URLSearchParams(await readBody(req));
    const fields = (params.get("select") ?? "name,district").split(",").map((f) => f.trim()).filter((f) => f in CITIES[0]);
    const [field, pattern] = (params.get("match") ?? "").replace(/^"|"$/g, "").split(/=(.*)/);
    const re = pattern ? globToRegex(pattern) : /.*/;
    const limit = Number(params.get("limit")) || CITIES.length;

    const rows = CITIES.filter((c) => re.test(c[field ?? ""] ?? ""))
        .slice(0, Math.max(1, limit))
        .map((c) => Object.fromEntries(fields.map((f) => [f, c[f]])));

    res.setHeader("Content-Location", "/api/cities/results/1");
    res.setHeader("Cache-Control", "public, max-age=60");
    return res.status(200).json(rows);
}
