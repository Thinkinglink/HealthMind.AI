# HealthMind AI - Intelligent Fitness Companion

A professional PWA fitness tracking app with AI coaching, GPS workout tracking, nutrition logging, and goal management.

## Features

✅ **User Authentication** - Secure signup/login with localStorage  
✅ **GPS Workout Tracking** - Real-time tracking for Walking, Running, Cycling, Hiking  
✅ **Background Tracking** - Continues running while switching screens  
✅ **Live Map** - OpenStreetMap integration with smooth cursor updates  
✅ **AI Health Coach** - 50+ topics with Chrome AI + keyword fallback  
✅ **Voice Input** - Speech recognition with text-to-speech responses  
✅ **Nutrition Logging** - Food calories, water, coffee tracking  
✅ **Hydration Charts** - Visual timeline of water vs coffee intake  
✅ **Goal Management** - Weight loss goals with pink theme and progress tracking  
✅ **Dashboard Sync** - Real-time updates from all activities  
✅ **Offline Support** - Service worker for offline functionality  
✅ **Mobile Responsive** - Perfect on all devices  

## Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Upload these files to the root directory:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `README.md`
3. Go to Settings → Pages
4. Source: Deploy from branch
5. Branch: main, folder: / (root)
6. Save and wait 2-3 minutes
7. Access at: `https://yourusername.github.io/repo-name/`

### Clear Cache After Updates

**Desktop:**
- Press F12 → Right-click reload → "Empty Cache and Hard Reload"

**Mobile:**
- Chrome Settings → Privacy → Clear browsing data
- Select "Cached images and files"
- Click "Clear data"

## Installation as App

**iPhone:**
1. Open in Safari
2. Tap Share button
3. "Add to Home Screen"

**Android:**
1. Open in Chrome
2. Tap menu (⋮)
3. "Add to Home screen"

## Tech Stack

- **Frontend:** Pure HTML5, CSS3, JavaScript (ES6+)
- **Maps:** OpenStreetMap (free, no API key needed)
- **AI:** Chrome AI API + 50+ keyword fallback
- **Storage:** localStorage (persistent)
- **GPS:** HTML5 Geolocation API
- **Voice:** Web Speech API

## Key Features Explained

### Background Workout Tracking
- Timer continues when switching screens
- GPS updates in real-time
- Stats accumulate continuously
- Visual "TRACKING..." indicator at top
- No data loss when navigating

### Accurate Activity Calculations
- **Walking:** 1,315 steps/km, 65 cal/km
- **Running:** 1,570 steps/km, 100 cal/km
- **Cycling:** Speed-based calories
- **Hiking:** Altitude bonus calories

### Smooth Map Updates
- 2-second delay prevents blinking
- Cursor moves smoothly as user walks
- No constant reloading
- OpenStreetMap embed with marker

### AI Coach
- 50+ comprehensive topics
- 5 varied fallback responses
- Chrome AI integration
- No repetitive messages
- Voice input/output

### Goals - Pink Theme
- Changed from yellow to pink (#FF69B4)
- Accurate progress based on days elapsed
- Shows "X days left of Y total"
- Visual progress bars
- Daily calorie targets

## File Structure

```
/
├── index.html       - Main application (production-ready)
├── manifest.json    - PWA configuration
├── sw.js           - Service worker
└── README.md       - Documentation
```

## Browser Compatibility

- ✅ Chrome (Desktop & Mobile) - Full support
- ✅ Safari (Desktop & Mobile) - Full support
- ✅ Firefox (Desktop) - Full support
- ✅ Edge (Desktop) - Full support

## Support

For issues or questions, check:
1. GPS permissions are enabled
2. Location services are on
3. Using HTTPS (required for GPS)
4. Browser cache cleared after updates

## License

MIT License - Free to use and modify

---

**Built with ❤️ for fitness enthusiasts**
