# HealthMind Setup Guide 🚀

Complete step-by-step guide to get your fitness app running on GitHub Pages.

## 📦 Files You Need

Make sure you have these 6 files:
- ✅ `index.html` - The main app
- ✅ `manifest.json` - PWA configuration
- ✅ `sw.js` - Service worker for offline mode
- ✅ `README.md` - Documentation
- ✅ `generate-icons.html` - Icon generator (optional)
- ✅ `.gitignore` - Git configuration (optional)

## 🎯 Step-by-Step Setup

### Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `healthmind-app` (or any name)
4. Make it **PUBLIC** (required for free Pages)
5. Don't initialize with README
6. Click **"Create repository"**

### Step 2: Upload All Files

**Method A: Drag & Drop (Easiest)**
1. On your repository page, click **"uploading an existing file"**
2. Drag ALL 6 files into the upload area
3. Scroll down, click **"Commit changes"**

**Method B: Using Git (Advanced)**
```bash
git clone https://github.com/yourusername/healthmind-app.git
cd healthmind-app
# Copy all 6 files into this folder
git add .
git commit -m "Initial commit"
git push
```

### Step 3: Generate App Icons

**Option A: Use the Generator**
1. Open `generate-icons.html` in your browser
2. Right-click each canvas image
3. "Save Image As..." → `icon-192.png` and `icon-512.png`
4. Upload these 2 images to your GitHub repo

**Option B: Create Your Own**
- Create two PNG images: 192x192 and 512x512
- Name them `icon-192.png` and `icon-512.png`
- Upload to repository

**Option C: Skip Icons (Works Without Them)**
- The app will work fine without icons
- Just won't have a custom icon when installed

### Step 4: Enable GitHub Pages

1. Go to repository **Settings** tab
2. Scroll to **"Pages"** in left sidebar
3. Under **"Source"**: 
   - Select **"Deploy from a branch"**
4. Under **"Branch"**:
   - Select **"main"** (or "master")
   - Select **"/ (root)"**
5. Click **"Save"**
6. Wait 2-3 minutes

### Step 5: Find Your URL

1. Refresh the Settings → Pages page
2. You'll see: 
   ```
   ✅ Your site is live at https://yourusername.github.io/healthmind-app/
   ```
3. Click the URL to test!

## 📱 Install on Phone

### iPhone (iOS):
1. Open your site URL in **Safari** (must be Safari!)
2. Tap the **Share** button (square with arrow)
3. Scroll down → **"Add to Home Screen"**
4. Tap **"Add"**
5. App icon appears on home screen! 🎉

### Android:
1. Open your site URL in **Chrome**
2. Tap the **menu** (⋮)
3. Tap **"Install app"** or **"Add to Home screen"**
4. Tap **"Install"**
5. App icon appears on home screen! 🎉

## ✅ Testing Checklist

After setup, test these features:

### Test 1: Basic Navigation
- [ ] Splash screen shows
- [ ] Onboarding slides work
- [ ] Can navigate to login

### Test 2: Account Creation
- [ ] Sign up with email/password works
- [ ] Login with credentials works
- [ ] Error messages show for invalid input

### Test 3: Profile Setup
- [ ] Can select a goal
- [ ] Can enter profile info
- [ ] Dashboard loads

### Test 4: Photo Upload (On Phone)
- [ ] Tap avatar
- [ ] Camera/gallery opens
- [ ] Permission granted
- [ ] Photo updates

### Test 5: GPS Tracking (Outside!)
- [ ] Tap + button
- [ ] GPS permission granted
- [ ] Timer starts
- [ ] Distance increases while walking
- [ ] Can finish and save workout

## 🐛 Troubleshooting

### "Service Worker Failed" Error
✅ **Fixed!** This error is now harmless. The app works without the service worker.

### "Can't access files" or "404 Error"
**Problem:** Files not in the right place
**Solution:**
- All files must be in repository root (not in folders)
- File names are case-sensitive
- Make sure `index.html` exists

### "GPS Not Working"
**Problem:** GPS requires special conditions
**Solution:**
- Must be **outside** (indoors won't work)
- Need clear view of sky
- Grant location permission
- Wait 10-30 seconds for first lock

### "Camera Not Working"
**Problem:** Permission not granted
**Solution:**
- **iOS**: Settings → Safari → Camera → Allow
- **Android**: Chrome → Site Settings → Camera → Allow
- Must use HTTPS (GitHub Pages does this automatically)

### "App Doesn't Look Right"
**Problem:** Browser cache showing old version
**Solution:**
- **iOS**: Settings → Safari → Clear History and Data
- **Android**: Chrome → Settings → Clear browsing data
- Or use Private/Incognito mode

### "Can't Install to Home Screen"
**Problem:** Browser doesn't support PWA or missing manifest
**Solution:**
- Make sure `manifest.json` is uploaded
- Use Safari (iOS) or Chrome (Android)
- Some browsers don't support PWA

## 🔄 Updating Your App

When you make changes:

1. Edit the file on GitHub (click pencil icon)
2. Make your changes
3. Click "Commit changes"
4. Wait 2-3 minutes
5. Clear browser cache
6. Refresh your site

## 📊 Checking If It's Working

Visit your GitHub repo and you should see:
```
index.html
manifest.json
sw.js
README.md
icon-192.png (optional)
icon-512.png (optional)
generate-icons.html (optional)
.gitignore (optional)
```

Visit Settings → Pages and you should see:
```
✅ Your site is live at https://...
```

## 🎓 What Each File Does

| File | Purpose | Required? |
|------|---------|-----------|
| `index.html` | Main app code | ✅ YES |
| `manifest.json` | PWA config (installable) | ✅ YES |
| `sw.js` | Offline mode | ⚠️ Optional but recommended |
| `README.md` | Documentation | ❌ Optional |
| `icon-192.png` | Small app icon | ❌ Optional |
| `icon-512.png` | Large app icon | ❌ Optional |
| `generate-icons.html` | Icon creator tool | ❌ Optional |
| `.gitignore` | Git settings | ❌ Optional |

## 💡 Pro Tips

1. **Bookmark your GitHub Pages URL** for easy access
2. **Test on actual phone** - some features don't work in desktop browser
3. **Export data regularly** - use the Export button in Profile
4. **Use outdoors** for best GPS accuracy
5. **Grant all permissions** when asked

## 🆘 Still Having Issues?

Common mistakes:
- ❌ Repository is Private (must be Public)
- ❌ Files in subfolder (must be in root)
- ❌ Wrong file name (`Index.html` vs `index.html`)
- ❌ Testing indoors (GPS won't work)
- ❌ Not granting permissions

If all else fails:
1. Delete repository
2. Create new one
3. Follow these steps exactly
4. Test each step before moving on

## 🎉 Success!

When working correctly, you should be able to:
- ✅ Visit your GitHub Pages URL
- ✅ Create an account
- ✅ Upload a photo
- ✅ Start a workout
- ✅ See GPS distance increase
- ✅ Save workout history
- ✅ Install to home screen

**Now you have a fully functional fitness app hosted for free!** 🏃‍♂️💪

---

Need more help? Check the main README.md for detailed feature documentation!
