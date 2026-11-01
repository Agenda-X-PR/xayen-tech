// Generates dist/404.html from dist/index.html for GitHub Pages SPA fallback.
// Unknown paths are served 404.html, which bounces the browser to
// "/?/<path>" and the receiver script in index.html restores the route.
import { readFile, writeFile } from "node:fs/promises"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = dirname(dirname(fileURLToPath(import.meta.url)))
const dist = join(root, "dist")

const indexHtml = await readFile(join(dist, "index.html"), "utf8")

const redirectScript = [
  "<script>",
  ";(function () {",
  "  var l = window.location",
  "  var keep = 0 // deployed at the domain root",
  "  l.replace(",
  "    l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +",
  "    l.pathname.split('/').slice(0, 1 + keep).join('/') + '/?/' +",
  "    l.pathname.slice(1).split('/').slice(keep).join('/').replace(/&/g, '~and~') +",
  "    (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +",
  "    l.hash",
  "  )",
  "})()",
  "</script>",
].join("\n")

const notFoundHtml = indexHtml.replace("</title>", "</title>\n    " + redirectScript)

if (notFoundHtml === indexHtml) {
  throw new Error("Could not inject the redirect script into index.html")
}

await writeFile(join(dist, "404.html"), notFoundHtml)
console.log("dist/404.html written (SPA fallback)")
