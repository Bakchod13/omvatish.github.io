# 🚀 Your Portfolio — Setup Guide

## File Structure
```
portfolio/
├── index.html          ← Main page (all sections)
├── css/
│   ├── style.css       ← Main styles
│   └── blog.css        ← Blog post styles
├── js/
│   └── main.js         ← Animations & interactions
├── blog/
│   └── post-template.html  ← Copy this for each blog post
├── images/             ← Put all your images here
└── README.md
```

## GitHub Pages Setup
1. Push this folder to a GitHub repo (name it `yourusername.github.io` for root, or any name for project page)
2. Go to repo Settings → Pages → Source: Deploy from branch → main → / (root)
3. Done! Live at `https://yourusername.github.io`

## Customization Checklist
- [ ] Replace `YOUR NAME` / `YN` throughout with your actual name
- [ ] Update `your@email.com` in contact section
- [ ] Add your photo at `images/your-photo.jpg` and update the `<img>` tag in About section
- [ ] Fill in your actual skills, projects, and bio text
- [ ] Add gallery images — replace `<div class="gallery-placeholder">` with `<img src="images/photo.jpg" alt="...">`
- [ ] Update social links (GitHub, LinkedIn, Instagram, Twitch)
- [ ] Add blog posts by copying `blog/post-template.html`

## Adding a Blog Post
1. Copy `blog/post-template.html` → `blog/my-post-title.html`
2. Edit the content
3. Link to it from the blog cards in `index.html` (change `href="blog/post-1.html"`)

## Adding Gallery Images
Replace the placeholder divs in index.html:
```html
<!-- Before -->
<div class="gallery-item tall reveal"><div class="gallery-placeholder"><span>Photo 1</span></div></div>

<!-- After -->
<div class="gallery-item tall reveal">
  <img src="images/photo1.jpg" alt="Your description" style="width:100%;height:100%;object-fit:cover;">
</div>
```

## Color Customization
Edit `css/style.css` at the top under `:root`:
```css
--accent: #00e5ff;    /* Main cyan accent */
--accent2: #ff6b35;   /* Orange accent */
--accent3: #a855f7;   /* Purple accent */
```

## Fonts
Uses Google Fonts (loaded via CDN):
- **Syne** — headings & display text
- **Space Mono** — labels, tags, mono text
- **DM Sans** — body text

No build step needed. Pure HTML/CSS/JS. Works directly on GitHub Pages.
