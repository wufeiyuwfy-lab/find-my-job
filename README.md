# Find My Job Dashboard

This folder is the source of truth for the published GitHub Pages website.

Public URL:

```text
https://wufeiyuwfy-lab.github.io/find-my-job/
```

## Edit and preview

Edit website files directly in this folder:

```text
app.js
styles.css
index.html
data/*.json
```

Preview this same folder locally:

```bash
python3 -m http.server 4317 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:4317/
```

## Commit and push

Run Git commands from this folder:

```bash
git status --short
git add app.js styles.css index.html data/*.json README.md
git commit -m "version message"
git push origin main
```

Only commit and push after Fei explicitly asks to push.

Before pushing, make sure the update is complete for the public website:

- Update every relevant source file in this folder, not only `data/*.json`.
- If page content, layout, styles, scripts, or public assets need to change, edit `index.html`, `styles.css`, `app.js`, or the relevant asset too.
- Regenerate `data/*.json` only when job data/state changed.
- If a future build step is added, run it before committing and confirm the output directory is still this folder or the configured GitHub Pages output.
- Check `git status --short` from this folder and stage only intended website files.

After pushing, verify the public website:

```bash
curl -I https://wufeiyuwfy-lab.github.io/find-my-job/
```

Then open the public URL and confirm the latest visible change is present. GitHub Pages can cache for a few minutes, so refresh after the deployment finishes if needed.

## Data refresh

When job analysis output changes, regenerate the published JSON data from the workspace root:

```bash
node job-dashboard/scripts/export-static.js
```

The exporter updates only `data/*.json`. It must not overwrite `app.js`, `styles.css`, or `index.html`.

Do not treat data export as deployment. Data changes reach the live public website only after the changed files are committed and pushed from this folder.

## Deployment target

This repository is a static GitHub Pages site. The project root and output directory are both this folder:

```text
job-dashboard/static
```

There is currently no separate build command. If one is added later, document it here before using it.

## Deprecated local app

`../public` and `../server.js` are legacy local-only files. Do not edit them for GitHub Pages website changes.
