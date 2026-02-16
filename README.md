# Carpentry by Lee — Website

A modern, professional website for **Carpentry by Lee**, with a warm wood-inspired palette, subtle retro touches, and smooth animations.

## Contents

- **Home** — Hero, services grid, testimonials, CTA
- **About Us** — Company story, values, hours
- **Past Work** — Gallery (placeholders; add your own images)
- **Contact** — Phone, email, address, contact form (opens mailto)

## Running locally

Open `index.html` in a browser, or use a simple local server:

```bash
# Python
python -m http.server 8000

# Node (npx)
npx serve .
```

Then visit `http://localhost:8000`. Styles and scripts are in the project root: `style.css` and `main.js`.

## Customisation

- **Contact form**: The form currently opens the user’s email client via `mailto`. For server-side handling, replace the form `action` and add a backend (e.g. PHP, Netlify Forms, Formspree).
- **Past Work**: Replace the `.gallery-placeholder` divs with `<img src="images/your-photo.jpg" alt="Description">` and remove the placeholder div.
- **About**: Add real images by replacing the `.about-placeholder` divs with `<img>` tags.
- **Email**: Update `info@carpentrybylee.ie` in `contact.html` and `main.js` to your real address.

## Tech

- HTML5, CSS3 (custom properties, Grid, Flexbox)
- Vanilla JavaScript (Intersection Observer for scroll reveal, mobile menu, form)
- No build step required

## Contact details (from original site)

- **Phone**: 087 954 9579 · 021 420 0950  
- **Address**: Robert Lee, Ballinvarrig, Whitechurch, Co. Cork  
- **Hours**: Mon–Sat; Sundays & bank holidays by arrangement. Enquiries up to 9pm.
