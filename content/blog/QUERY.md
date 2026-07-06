---
title: "The new HTTP method - QUERY"
date: "2026-07-07"
description: "The QUERY method is used to ask the target resource to perform a query operation within the scope of that target resource."
---

## 1. Why HTTP needed a new verb

- `GET` can't reliably carry a request body, so complex queries get crammed into the URL, hitting length limits across proxies, paying URL-encoding overhead, and leaking sensitive filters into access logs.
- `POST` accepts a body, but it promises nothing: not safe, not idempotent, not cacheable. Clients, proxies, and caches must assume the worst.
- The gap: a method that means "this is a read, but the query lives in the body".

## 2. What QUERY actually is

- `QUERY` ([RFC 10008](https://www.rfc-editor.org/info/rfc10008)): a safe, idempotent HTTP method where the query goes in the request content, scoped to the target resource.
- Semantics of `GET`, body of `POST` - responses are cacheable (the cache key includes the request body).
- Servers advertise support and accepted query formats via the `Accept-Query` header.
- `Location` / `Content-Location` in the response can point at a stored query / stored results, so a follow-up plain `GET` can re-fetch without resending the body.
- `QUERY` requests are safe with regard to the target resource; that is, the client does not request or expect any change to the state of the target resource. This does not prevent the server from creating additional HTTP resources through which additional information can be retrieved.
- Furthermore, `QUERY` requests are idempotent; they can be retried or repeated when needed, for instance, after a connection failure.

## 3. QUERY on the wire - try it live

The wire format: a `QUERY` request with `Content-Type` describing the query, and a normal `200` response with results.

```bash
QUERY /api/cities HTTP/1.1
Host: www.rushilpatel.dev
Content-Type: application/x-www-form-urlencoded
Accept: application/json

select=name,district&limit=10&match="name=A*"
```

You might get a response like this:

```bash
HTTP/1.1 200 OK
Content-Type: application/json

[{"name": "Ahmedabad", "district": "Ahmedabad"}, {"name": "Anand", "district": "Anand"}]
```

Try it yourself - edit the query below and hit send to this [api](https://www.rushilpatel.dev/api/cities).

[query-demo]

Or from your terminal:

```bash
curl -i -X QUERY https://www.rushilpatel.dev/api/cities \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'select=name,district&limit=2&match="name=S*"'
```

## 4. Can you use it today?

- Ecosystem support: browsers' `fetch()`, server frameworks, proxies, and CDNs need to recognize the method before it's practical.
- Natural fits: search endpoints, GraphQL-over-HTTP, database gateways anywhere reads outgrew the query string.
- Until support lands: keep using `POST` for query-with-body, and treat `QUERY` as the migration target.
