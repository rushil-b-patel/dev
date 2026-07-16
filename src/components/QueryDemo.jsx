"use client";
import { useEffect, useState } from "react";

function Panel({ title, children }) {
    return (
        <div className="space-y-1">
            <div className="text-xs text-app-muted">{title}</div>
            <pre className="rounded-lg border border-rule p-3 text-xs overflow-x-auto text-app-primary">{children}</pre>
        </div>
    );
}

export default function QueryDemo() {
    const [select, setSelect] = useState("name,district");
    const [match, setMatch] = useState("name=S*");
    const [limit, setLimit] = useState(3);
    const [response, setResponse] = useState(null);
    const [sending, setSending] = useState(false);
    const [host, setHost] = useState("rushilpatel.dev");

    useEffect(() => setHost(window.location.host), []);

    const body = `select=${select}&limit=${limit}&match="${match}"`;
    const request = `QUERY /api/cities HTTP/1.1\nHost: ${host}\nContent-Type: application/x-www-form-urlencoded\nAccept: application/json\n\n${body}`;

    const send = async () => {
        setSending(true);
        setResponse(null);
        try {
            const res = await fetch("/api/cities", {
                method: "QUERY",
                headers: { "Content-Type": "application/x-www-form-urlencoded", Accept: "application/json" },
                body
            });
            const headers = ["content-type", "content-location", "accept-query", "cache-control"]
                .map((h) => {
                    const value = res.headers.get(h);
                    return value && `${h}: ${value}`;
                })
                .filter(Boolean)
                .join("\n");
            let content = await res.text();
            try { content = JSON.stringify(JSON.parse(content), null, 2); } catch {}
            setResponse(`HTTP ${res.status} ${res.statusText || "OK"}\n${headers}\n\n${content}`);
        } catch (e) {
            setResponse(`Request failed: ${e.message}\n\nSomething between your browser and the server refused to carry QUERY - which is exactly the “ecosystem support” problem from section 4.`);
        } finally {
            setSending(false);
        }
    };

    const fields = [
        { label: "select (fields)", value: select, onChange: (e) => setSelect(e.target.value) },
        { label: "match (field=glob)", value: match, onChange: (e) => setMatch(e.target.value) },
        { label: "limit", type: "number", min: 1, max: 7, value: limit, onChange: (e) => setLimit(Number(e.target.value)) },
    ];

    return (
        <div className="not-prose my-8 space-y-4 font-geist">
            <div className="grid gap-3 sm:grid-cols-3">
                {fields.map(({ label, ...input }) => (
                    <label key={label} className="text-xs text-app-muted space-y-1">
                        <span>{label}</span>
                        <input className="w-full rounded-md border border-rule bg-transparent px-2 py-1 text-sm font-mono text-app-primary" {...input} />
                    </label>
                ))}
            </div>

            <Panel title="Request">{request}</Panel>

            <div className="flex items-center gap-3">
                <button
                    onClick={send}
                    disabled={sending}
                    className="rounded-md border border-rule px-3 py-1.5 text-sm text-app-primary hover:bg-surface disabled:opacity-50"
                >
                    {sending ? "Sending…" : "Send QUERY"}
                </button>
            </div>

            {response && <Panel title="Response">{response}</Panel>}

            <div className="text-xs text-app-muted">
                plain GET returns everything, QUERY filters it.
            </div>

            <div className="text-xs border border-saffron rounded-md px-3 py-2">
                This is a controlled demo, it works because your browser sends the method string as-is and this server accepts it. In production, proxies, CDNs, or older infrastructure may reject the QUERY method.
            </div>
        </div>
    );
}
