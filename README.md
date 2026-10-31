# Bean to Bar Chocolate: one page site

Static site: `index.html`, `style.css`, `script.js` and `assets/`. No build step.

## Deploy
1. Push this folder to a GitHub repo (files at the repo root).
2. GitHub Pages: Settings > Pages > Deploy from branch > `main` / root.
3. Cloudflare: add a CNAME record pointing your domain to `<user>.github.io`, then add the domain under Pages > Custom domain. Create a file named `CNAME` containing the domain if GitHub asks for one.
   Alternatively use Cloudflare Pages: connect the repo, framework preset None, build command empty, output directory `/`.

## Edit
- Order links point to `https://3achocolate.com/order`. Search and replace to change.
- Bar copy lives in the `V` array in `script.js`.
- Colors are CSS variables at the top of `style.css`, taken from the brand guide.
- Fonts (Playfair Display, Montserrat, Great Vibes, Hind Siliguri) load from Google Fonts.
