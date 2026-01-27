# HealthMind Fitness Tracker 💪

A **fully functional** mobile-first fitness tracking Progressive Web App (PWA) with real GPS tracking, camera access, and local storage. No backend required - everything runs 100% free!

## 🎉 What's NEW - Fully Functional!

This is NOT just a prototype - it actually works! Here's what's real:

### ✅ **Real User Authentication**
- Sign up with email & password
- Login with credentials
- "Remember me" functionality
- Account stored locally on your phone
- Password validation (6+ characters)
- Email validation

### ✅ **Real GPS Distance Tracking**
- Uses your phone's GPS to track location
- Calculates actual distance traveled (Haversine formula)
- Real-time distance updates
- Position history saved
- Works outdoors (needs GPS signal)

### ✅ **Working Stopwatch Timer**
- Accurate workout duration tracking
- Pause/Resume functionality
- Shows hours, minutes, seconds
- Calculates pace (min/km)
- Calculates speed (km/h)

### ✅ **Camera Access & Photo Upload**
- Tap avatar to change photo
- Access camera or photo gallery
- Photos saved as base64 (no server needed!)
- Works on iOS and Android
- Instant photo updates across app

### ✅ **Local Storage Database**
- All data saved to phone's storage
- Workout history preserved
- Profile data persistent
- No internet needed after first load
- Can export data as JSON

### ✅ **Calorie Tracking**
- Calculates calories based on distance
- Real-time calorie counter during workout
- Daily calorie totals
- History of all calories burned

### ✅ **Steps Estimation**
- Converts distance to steps (1km ≈ 1,250 steps)
- Daily step counter
- Progress bar to 10,000 steps goal

## 📱 How It Actually Works

### **Starting a Workout:**
1. Tap the **+ button** on bottom nav
2. App requests GPS permission (approve it!)
3. GPS starts tracking your location
4. Timer starts automatically
5. Walk/Run outside - watch distance grow!
6. Tap **Finish** to save workout

### **GPS Requirements:**
- Must be **outside** for GPS signal
- Won't work indoors (GPS can't get signal)
- May take 10-30 seconds to get first location
- More accurate in open areas

### **Photo Upload:**
1. Tap on avatar anywhere in app
2. Choose "Take Photo" or "Choose from Library"
3. Grant camera/photo permission
4. Photo instantly updates everywhere
5. Saved to your phone's storage

## 🚀 How to Deploy (Still FREE!)

### Step 1: Upload to GitHub
1. Go to your GitHub repository
2. Delete the old `index.html` file
3. Upload the NEW `index.html` (this one!)
4. Also upload `manifest.json` and `sw.js` (if not already there)
5. Commit changes

### Step 2: GitHub Pages Should Auto-Update
- If already enabled, your site updates automatically
- Wait 2-3 minutes for deployment
- Visit your URL to see the new version

### Step 3: Clear Cache on Phone
**Important!** Your phone might show the old version:

**On iPhone:**
1. Settings → Safari → Clear History and Website Data
2. Or: Long-press the refresh button in Safari

**On Android:**
1. Chrome → Settings → Privacy → Clear browsing data
2. Or: Open incognito tab

## 📊 What Data Is Stored Locally

All data is stored in your browser's `localStorage`:

```javascript
// User account data
localStorage: user_[email] = {
  name, email, password, avatar (base64), phone, nickname
}

// App state
localStorage: healthmind_state = {
  user: { current user data },
  workouts: [ { date, duration, distance, calories, positions } ],
  selectedGoal: "lose-weight"
}

// Session
localStorage: current_user = "user@email.com" (if "remember me")
```

## 🎯 Features List

### Working Features:
- ✅ Email/password signup
- ✅ Login authentication  
- ✅ Profile creation
- ✅ Goal selection (saved)
- ✅ Photo upload (camera/gallery)
- ✅ GPS distance tracking
- ✅ Stopwatch timer
- ✅ Pause/Resume workouts
- ✅ Calorie calculation
- ✅ Steps estimation
- ✅ Workout history
- ✅ Dashboard with stats
- ✅ Data export (JSON)
- ✅ Logout functionality
- ✅ "Remember me" option
- ✅ Real-time workout stats
- ✅ Pace & speed calculation

### Limitations (Because It's Local):
- ❌ No sync between devices
- ❌ Data lost if browser cache cleared
- ❌ No social features (can't add friends)
- ❌ No cloud backup
- ❌ GPS only works outdoors

## 🔒 Privacy

**Your data NEVER leaves your phone!**
- No servers involved
- No data collection
- No tracking
- 100% private
- You can export and delete anytime

## 🐛 Troubleshooting

### "GPS not working"
- Make sure you're **outside** (GPS doesn't work indoors)
- Grant location permission when asked
- Wait 10-30 seconds for signal
- Try open area away from buildings

### "Camera not working"
- Grant camera/photo permission
- On iOS: Settings → Safari → Camera
- On Android: Chrome → Site Settings → Camera

### "My data disappeared"
- Don't clear browser data/cache
- Data is tied to the browser
- Export data regularly as backup

### "Distance seems wrong"
- GPS accuracy varies (typically 5-10m)
- Better in open areas
- Worse near buildings/trees
- Cold start takes longer

### "App looks old after update"
- Clear browser cache
- Force refresh (Ctrl+Shift+R)
- Reinstall from home screen

## 💡 Tips for Best Experience

1. **Allow all permissions** when asked
2. **Use outdoors** for GPS tracking
3. **Export data** regularly as backup
4. **Don't clear browser data** to keep workouts
5. **Add to home screen** for app-like experience

## 📈 How Calories Are Calculated

```
Calories = Distance (km) × 60
```

This is a simple estimate. Actual calories depend on:
- Your weight
- Speed/intensity
- Terrain
- Fitness level

## 🎓 What This Teaches You

This app demonstrates:
- **Progressive Web Apps (PWA)** - works like native app
- **Geolocation API** - GPS tracking
- **LocalStorage** - client-side database
- **FileReader API** - photo upload
- **Canvas/Base64** - image handling
- **Haversine Formula** - GPS distance calculation
- **State Management** - without frameworks
- **Vanilla JavaScript** - no libraries needed!

## 🔮 Future Enhancements (Would Need Backend)

To add these, you'd need Firebase or similar:
- [ ] Cloud sync between devices
- [ ] Social features (friends, challenges)
- [ ] Route maps (would need mapping library)
- [ ] Heart rate tracking (needs wearable)
- [ ] Nutrition tracking
- [ ] Community challenges
- [ ] Achievements/badges

## 📄 License

Free to use for personal and commercial projects!

## 🙋 Support

Having issues?
1. Check the troubleshooting section above
2. Make sure you're on HTTPS (required for GPS/camera)
3. Test on actual phone (not all features work in desktop browser)
4. GitHub Pages automatically uses HTTPS ✅

---

**Built with ❤️ using vibe coding**

Everything works locally - no backend, no servers, no costs. Just pure JavaScript, GPS APIs, and local storage! 🚀
