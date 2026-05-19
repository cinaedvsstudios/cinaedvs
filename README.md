# CINAEDVS static GitHub Pages files

This folder contains a clean static HTML/CSS/JS version of the CINAEDVS Google Sites page.

It is built to use the existing image folders already in the repository:

- `logo small.jpg`
- `lion head.jpg`
- `lion logo test.png`
- `marble background.jpg`
- `Music/note.jpg`
- `Artwork/Dior Bust.jpg`
- `Artwork/beach torso.jpg`
- `Artwork/dance remix.jpg`
- `Artwork/techo bust.png`
- `Artwork/woman.jpg`
- `Clothes/pic.jpg`
- `3d/3d.jpg`

Upload these files into the root of the repository, keeping the current image folders where they are:

- `index.html`
- `about.html`
- `music.html`
- `artwork.html`
- `clothing.html`
- `models.html`
- `.nojekyll`
- `assets/css/style.css`
- `assets/js/main.js`

Then enable GitHub Pages from Settings → Pages → Deploy from a branch → `main` → `/ (root)`.


## Added pages

This version adds two extra navigation items and homepage cards:

- Software (`software.html`)
- Streaming Shows (`streaming.html`)

Both currently use existing root images from the repo as placeholders. When you add dedicated folders, update the image paths in `index.html`, `software.html`, and `streaming.html`.
