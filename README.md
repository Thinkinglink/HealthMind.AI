# HealthMind Fitness Tracker 💪

A beautiful, mobile-first fitness tracking app that works as a Progressive Web App (PWA). Users can install it on their phones and use it like a native app!

## 🚀 Live Demo on GitHub Pages

Follow these steps to host your app **100% FREE** on GitHub:

### Step 1: Create a GitHub Account
1. Go to [github.com](https://github.com)
2. Click "Sign up" and create a free account

### Step 2: Create a New Repository
1. Click the "+" icon in the top right corner
2. Select "New repository"
3. Name it: `healthmind-app` (or any name you like)
4. Make it **Public** (required for free GitHub Pages)
5. Click "Create repository"

### Step 3: Upload Your Files
1. Click "uploading an existing file"
2. Drag and drop these 3 files:
   - `healthmind-app.html`
   - `manifest.json`
   - `sw.js`
3. Click "Commit changes"

### Step 4: Rename the HTML File
1. Click on `healthmind-app.html` in your repo
2. Click the pencil icon to edit
3. Change the filename to `index.html` (GitHub Pages requires this)
4. Click "Commit changes"

### Step 5: Enable GitHub Pages
1. Go to your repository Settings (tab at the top)
2. Scroll down to "Pages" in the left sidebar
3. Under "Source", select "Deploy from a branch"
4. Under "Branch", select `main` and `/ (root)`
5. Click "Save"

### Step 6: Wait 2-3 Minutes
GitHub will build your site. Refresh the page and you'll see:
```
Your site is live at https://yourusername.github.io/healthmind-app/
```

## 📱 How to Install on Phone

### On iPhone (iOS):
1. Open the URL in Safari
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right
5. The app icon will appear on your home screen!

### On Android:
1. Open the URL in Chrome
2. Tap the three dots menu (⋮)
3. Tap "Add to Home screen" or "Install app"
4. Tap "Add" or "Install"
5. The app icon will appear on your home screen!

## ✨ Features

- **Splash Screen** - Beautiful welcome screen
- **Onboarding** - Introduction to the app
- **Login/Signup** - User authentication UI
- **Goal Setting** - Choose your fitness goals
- **Profile Creation** - Set up your profile
- **Dashboard** - Track steps, calories, weight
- **Progress Tracking** - Visual progress bars and charts
- **Daily Challenges** - Stay motivated with challenges
- **Workout History** - View past exercises
- **Bottom Navigation** - Easy navigation between screens

## 🎨 Customization

Want to change colors or text? Open `index.html` and look for:

**Colors** (search for these in the CSS):
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```
Change `#667eea` and `#764ba2` to your favorite colors!

**App Name** (search for "HEALTHMIND"):
```html
<div class="splash-title">HEALTHMIND</div>
```
Change to your app name!

## 🔧 Technical Details

- **Framework**: Pure HTML, CSS, JavaScript (no dependencies!)
- **Size**: ~50KB (super lightweight)
- **Works offline**: Yes (with service worker)
- **Mobile-first**: Optimized for phones
- **No backend needed**: All runs in the browser
- **Free hosting**: GitHub Pages

## 💰 Cost Breakdown

| Item | Cost |
|------|------|
| GitHub Account | **FREE** ✅ |
| GitHub Pages Hosting | **FREE** ✅ |
| Custom Domain (optional) | $10-15/year |
| Total to Get Started | **$0** 🎉 |

## 🚫 What's NOT Included

This is a **demo/prototype** app. It does NOT include:
- Real user authentication (login is just UI)
- Database to store user data
- Real fitness tracking (it's simulated data)
- Backend server

**Perfect for:**
- Demos and presentations
- Portfolio projects
- UI/UX showcases
- Learning web development
- Prototyping ideas

**To make it fully functional**, you'd need to add:
- Firebase or Supabase (for user auth & database)
- Real fitness tracking APIs
- Payment processing (if premium features)

## 📸 Screenshots

The app includes all these screens:
1. Splash Screen
2. Onboarding
3. Login
4. Sign Up
5. Goal Setting
6. Profile Creation
7. Dashboard with Progress
8. Workout History
9. Profile View
10. Congratulations

## 🤝 Need Help?

Having trouble? Common issues:

**"My site isn't loading"**
- Make sure you renamed the file to `index.html`
- Wait 2-3 minutes after enabling Pages
- Check the Pages settings show "Your site is live"

**"Images aren't loading"**
- Images are loaded from Unsplash (requires internet)
- You can replace with your own images later

**"Can't install on phone"**
- Make sure you're using Safari (iOS) or Chrome (Android)
- Not all browsers support PWA installation

## 📄 License

Free to use for personal and commercial projects!

## 🎓 Learning Resources

Want to learn how this was built?
- HTML/CSS basics: [MDN Web Docs](https://developer.mozilla.org)
- PWA tutorial: [web.dev/progressive-web-apps](https://web.dev/progressive-web-apps/)
- GitHub Pages: [pages.github.com](https://pages.github.com)

---

Built with ❤️ using vibe coding in Claude
