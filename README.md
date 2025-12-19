# GreenSpace - No-Build Version

A completely self-contained, production-ready version of the Creative garden design consultancy website. This version requires **no build tools** and works entirely with CDN-hosted dependencies, making it perfect for static hosting on GitHub Pages or any simple web server.

## 📁 Project Structure

```
no-build/
├── index.html          # Main HTML file with all markup
├── css/
│   └── styles.css      # Custom styles (Tailwind CDN + custom CSS)
├── js/
│   └── app.js          # Vanilla JavaScript (no frameworks)
└── README.md           # This file
```

## 🚀 Quick Start

### Option 1: Local Development
Simply open `index.html` in your browser:
```bash
# Navigate to the no-build folder
cd no-build

# Open in browser (macOS)
open index.html

# Open in browser (Windows)
start index.html

# Open in browser (Linux)
xdg-open index.html
```

### Option 2: Local Web Server
For better development experience with live reload, use Python:

```bash
cd no-build

# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Then navigate to `http://localhost:8000`

### Option 3: Deploy to GitHub Pages
1. Copy the `no-build` folder contents to your GitHub Pages repository
2. Push to GitHub
3. Your site is live at `https://yourusername.github.io`

## 📦 Dependencies (All via CDN)

- **Tailwind CSS 3**: Styling framework (via CDN)
- **Vanilla JavaScript**: No framework dependencies
- **Custom Toast Notifications**: Built-in, no external library needed

## ✨ Features

- **Responsive Design**: Mobile-first, works on all devices
- **Mobile Menu**: Hamburger menu for mobile devices
- **Contact Form**: Fully functional form with validation
- **Toast Notifications**: Success/error messages (built-in)
- **Smooth Scrolling**: Navigation links animate to sections
- **No Build Required**: Pure HTML/CSS/JavaScript
- **Fast Loading**: Minimal dependencies, optimized for performance

## 📝 Form Integration

### Current State
The contact form currently displays a success message locally. Form data is logged to the browser console:
```javascript
console.log('Form submitted:', { name, email, message })
```

### Connect to Backend API
To connect to a real backend service (Convex, Firebase, etc.), update the form submission in `js/app.js`:

```javascript
// Replace the form submission section with:
const response = await fetch('https://your-api-endpoint.com/submit-contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formState)
});

if (!response.ok) throw new Error('API error');
const data = await response.json();
```

### Using Convex Backend
If you want to connect to the original Convex backend, use the Convex HTTP endpoint:

```javascript
// In js/app.js form submission:
const response = await fetch(
  `${import.meta.env.VITE_CONVEX_URL}/api/submitContact`,
  {
    method: 'POST',
    body: JSON.stringify(formState)
  }
);
```

Note: You'll need to set up CORS and authentication headers appropriately.

## 🎨 Customization

### Update Colors
Edit the CSS variables in `css/styles.css`:
```css
:root {
  --color-emerald-700: #047857;
  --color-emerald-800: #065f46;
  /* ... more colors ... */
}
```

### Update Content
Edit `index.html` to:
- Change company name "GreenSpace" to your business name
- Update services, portfolio items, testimonials
- Modify contact information
- Add your own images/placeholder graphics

### Add Custom JavaScript
All custom interactivity is in `js/app.js`. Add new functions there for:
- Form validation
- Analytics tracking
- Third-party integrations
- Animation effects

## 📋 Form Submission Options

### Option 1: Email (Recommended for Simple Use)
Add mailto link:
```html
<a href="mailto:hello@greenspace.com?subject=Garden%20Design%20Inquiry">Send Email</a>
```

### Option 2: FormSpree (Free Form Backend)
Replace the form action in `js/app.js`:
```javascript
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Accept': 'application/json' },
  body: JSON.stringify(formState)
});
```

### Option 3: Netlify Forms
Add to form tag: `netlify`
```html
<form netlify>
  <!-- form inputs -->
</form>
```

### Option 4: Custom Backend
Set up your own backend server and point to it in the fetch request.

## ⚠️ Important Notes

1. **CORS Issues**: If connecting to external APIs, ensure they allow requests from your domain
2. **No Authentication**: This version doesn't include authentication. Add it based on your needs
3. **Environment Variables**: If you need them, use a simple JavaScript configuration file instead of `.env`
4. **Browser Support**: Works on all modern browsers (Chrome, Firefox, Safari, Edge)

## 🔧 Troubleshooting

### Form not submitting?
Check browser console (F12 → Console) for JavaScript errors

### Styles not loading?
Make sure Tailwind CSS CDN is accessible from your location

### Mobile menu not working?
Check if JavaScript is enabled in your browser

## 📱 Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (14+)
- Mobile browsers: ✅ Full support

## 📚 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [MDN JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [GitHub Pages Documentation](https://pages.github.com/)

## 📄 License

Same as the main project. See main `README.md` for details.

## 🚀 Deployment Checklist

- [ ] Update company name and branding
- [ ] Update contact information
- [ ] Add your portfolio images
- [ ] Test form submission on all devices
- [ ] Test all navigation links
- [ ] Check mobile responsiveness
- [ ] Set up form backend (FormSpree, Netlify, custom API, etc.)
- [ ] Add analytics (Google Analytics, Plausible, etc.)
- [ ] Deploy to GitHub Pages or preferred hosting
