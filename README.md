# AlbumPortfolio

Matthew Lin's portfolio: a static site where each project is an album. The home page has a small jukebox window for personal photos, a Spotify-style grid for projects, a separate experience timeline, skills and contact.

No build step and no dependencies. Open `index.html` through any static server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Layout

| Path | What it is |
|---|---|
| `index.html` | Page structure and the media viewer markup. |
| `styles.css` | All styling. |
| `app.js` | The page content (projects, experience, skills) and the rendering code. |
| `data/media.js` | Which cover and gallery files belong to which project. |
| `media/<project>/` | Photos, videos and diagrams, numbered in gallery order. |

## Editing content

- **Project text and bullets:** the `P` array near the top of `app.js`. Each entry has a `k` key such as `p-rocky`, tags, a status, advancement bullets and an optional `desc` block (a "why I built it" paragraph, stat tiles and an event call-to-action).
- **Experience and skills:** the `X` and `SK` arrays in `app.js`.
- **Covers and galleries:** put the file in `media/<project>/` and list it in `data/media.js`. A `covers` entry sets the square cover image. A `gallery` entry has a `src`, a `type` of `image` or `video`, and a `cap` caption. Gallery order is the array order.
- **Personal jukebox discs:** the four discs in the home-page window use the keys `m-1` to `m-4`. Add a photo by giving that key a path under `covers` in `data/media.js`. The disc titles and captions are the `M` array in `app.js`.

Cover images are cropped to a square, so square or near-square pictures look best. Compress videos to roughly 720p before adding them.

## Media sources

- Selphy Photobooth, Rocky, Pseudo Vinyl: own photos, CAD and PCB renders, and simulation output from the project repositories.
- TeleBuddy and EcoDepot: photos from their Devpost submissions, plus PCB images rendered from the TeleBuddy 6-DOF Gerbers.
- LightBox Controller: own demo videos and the flow charts from its README.
- Voice Agent, ArduCAM Bakeout Test UI (and the hidden LLM-Deployment): architecture diagrams drawn from the project READMEs, used as covers because these projects have no photos yet.

The Rocky results are from simulation only: the control board is designed but not built.
