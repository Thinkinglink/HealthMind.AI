# HealthMind AI 🏃‍♂️💪

A beautiful, modern Progressive Web App (PWA) for fitness tracking, nutrition monitoring, and AI-powered health coaching.

![HealthMind AI](https://img.shields.io/badge/PWA-Ready-success)
![Chrome AI](https://img.shields.io/badge/Chrome%20AI-Supported-blue)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🏋️ Workout Tracking
- **Real-time GPS tracking** for Walking, Running, Cycling, and Hiking
- Live map visualization with OpenStreetMap
- Automatic calculation of distance, steps, and calories
- Background tracking that continues when switching screens
- Pause/Resume functionality
- Activity-specific metrics:
  - Walking: 1,315 steps/km, 65 cal/km
  - Running: 1,570 steps/km, 100 cal/km
  - Cycling: Speed-based calories
  - Hiking: Altitude bonus

### 🤖 AI Health Coach
- **Chrome AI integration** with fallback to keyword matching
- 50+ fitness and nutrition topics covered
- Voice input with speech recognition
- Text-to-speech responses
- Topics include:
  - Weight loss strategies
  - Muscle building
  - Nutrition advice
  - Workout routines
  - Recovery tips
  - Motivation and consistency

### 🍎 Nutrition Tracking
- Daily calorie goals and tracking
- Food logging with timestamps
- Hydration monitoring (water & coffee)
- 7-day calorie chart
- Hourly hydration timeline
- Calories remaining calculation: Goal - Eaten + Burned

### 🎯 Goals Management
- Weight loss goal setting
- Automatic calorie deficit calculation
- Progress tracking with percentage
- 7-day activity tracker
- Motivational messages
- Visual progress bars

### 📊 Dashboard
- Welcome card with personalized greeting
- Progress rings for steps (10,000 goal) and calories (500 goal)
- Stats cards: miles today, total workouts
- Weekly activity bar chart
- Nutrition summary
- Active goals display

## 🎨 Design Highlights

### Modern Glassmorphism UI
- Premium glass-effect cards with backdrop blur
- Smooth gradients throughout
- Vibrant color palette
- Rounded corners (24-32px)
- Soft shadows with colored glows
- Smooth transitions and animations

### Color Scheme
- Primary: Sky Blue (#0EA5E9)
- Secondary: Rose Red (#F43F5E)
- Tertiary: Teal (#14B8A6)
- Accent (Goals): Pink (#EC4899)
- Purple, Orange, Green highlights

### Typography
- Font: Poppins (Google Fonts)
- Headers: 800 weight, 24-36px
- Body: 400-600 weight, 15-16px
- Line height: 1.6-1.7

## 🚀 Quick Start

### Installation

1. **Clone or download this repository**
```bash
git clone https://github.com/yourusername/healthmind-ai.git
cd healthmind-ai
```

2. **Serve the files** (choose one method):

**Option A: Python**
```bash
python -m http.server 8000
```

**Option B: Node.js**
```bash
npx serve
```

**Option C: PHP**
```bash
php -S localhost:8000
```

3. **Open in browser**
```
http://localhost:8000
```

### GitHub Pages Deployment

1. Push code to GitHub
2. Go to repository Settings > Pages
3. Select main branch as source
4. Your app will be live at `https://yourusername.github.io/healthmind-ai/`

### Install as PWA

1. Open the app in Chrome/Edge
2. Click the install icon in the address bar
3. Or use "Install HealthMind AI" from the browser menu
4. Launch from home screen like a native app!

## 📱 Usage Guide

### First Time Setup
1. **Sign Up**: Create an account with name, email, and password
2. **Login**: Use your credentials to access the app
3. Data is stored locally using localStorage

### Dashboard
- View daily progress for steps and calories
- Check weekly activity chart
- Monitor nutrition summary
- See active goals

### Start a Workout
1. Tap **Workout** in bottom navigation
2. Select activity type (Walking/Running/Cycling/Hiking)
3. Tap **Start Tracking**
4. Allow GPS permission
5. Track appears at top showing "🏃 TRACKING WORKOUT..."
6. View real-time stats: distance, steps, calories
7. Use **Pause/Resume** as needed
8. Tap **Stop** when finished

### Chat with AI Coach
1. Tap the **AI** button (center of nav)
2. Type your fitness question
3. Or tap microphone for voice input
4. Get instant advice on 50+ topics
5. Responses are spoken aloud

### Track Nutrition
1. Tap **Nutrition** tab
2. Tap **+ Add Food** to log meals
3. Tap water/coffee cards to log hydration
4. View daily and weekly charts

### Create Goals
1. Tap **Goals** tab
2. Tap **+ Create New Goal**
3. Enter current weight, target weight, and days
4. App calculates daily calorie deficit
5. Track progress with visual charts

## 🔧 Technical Details

### Technologies Used
- **HTML5**: Geolocation API, Canvas API
- **CSS3**: Custom properties, glassmorphism effects, animations
- **JavaScript (Vanilla)**: ES6+, async/await
- **PWA**: Service Worker, Web App Manifest
- **APIs**:
  - Chrome AI (Prompt API)
  - Web Speech API (recognition & synthesis)
  - Geolocation API
  - OpenStreetMap (embedded)

### Data Storage
- **localStorage** for all user data
- Keys:
  - `u_${email}`: User credentials
  - `hm_data`: App state (workouts, foods, goals, hydration)

### State Structure
```javascript
STATE = {
  user: { name, email },
  workouts: [{ type, date, distance, steps, calories, duration }],
  foods: [{ name, calories, time }],
  goals: [{ title, current, target, days, dailyCalDeficit, created }],
  hydration: [{ type, oz, time, hour }],
  selectedWorkoutType: 'Walking'
}
```

### Browser Compatibility
- ✅ Chrome/Edge 90+ (full features including Chrome AI)
- ✅ Safari 14+ (all features except Chrome AI)
- ✅ Firefox 88+ (all features except Chrome AI)
- 📱 Mobile browsers supported

### Chrome AI Setup
Chrome AI (Prompt API) provides advanced conversational abilities. To enable:

1. Use Chrome Dev/Canary (version 127+)
2. Enable flags:
   - `chrome://flags/#optimization-guide-on-device-model`
   - `chrome://flags/#prompt-api-for-gemini-nano`
3. App auto-detects availability and falls back gracefully

## 🎯 AI Coach Topics (50+)

The AI can answer questions about:

**Weight Management**: lose weight, weight loss, calories, diet, nutrition, carbs, fat, protein

**Exercise**: workout, cardio, strength, running, cycling, walking, hiking, HIIT, abs, core, flexibility, stretch

**Nutrition**: meal prep, food, supplements, creatine, hydration, water

**Recovery**: rest, sleep, recovery, sore, injury

**Motivation**: motivated, motivation, consistency, progress, start, beginner

**Lifestyle**: stress, gym, home, equipment, morning, evening, age, woman

**Technique**: form, track, how, when

...and many more! Ask anything fitness-related.

## 🐛 Troubleshooting

**GPS not working?**
- Ensure location permissions are granted
- Use HTTPS or localhost (required for GPS)
- Check browser console for errors

**Map not loading?**
- Check internet connection
- OpenStreetMap might be temporarily down
- Map still updates coordinates internally

**Voice input not working?**
- Chrome/Edge only feature
- Microphone permission required
- Click allow when prompted

**Chrome AI not responding?**
- Feature is experimental
- App falls back to keyword matching
- See Chrome AI setup above

**Data not saving?**
- Check localStorage is enabled
- Some browsers block in private mode
- Try clearing cache and refreshing

## 📄 File Structure

```
healthmind-ai/
├── index.html          # Main app (complete PWA)
├── manifest.json       # PWA configuration
├── sw.js              # Service worker
├── README.md          # This file
├── LICENSE            # MIT License
├── .gitignore         # Git ignore file
└── screenshots/       # App screenshots (optional)
```

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

MIT License - feel free to use this project however you'd like!

## 🙏 Acknowledgments

- **Poppins font** by Google Fonts
- **OpenStreetMap** for map tiles
- **Chrome AI** (Gemini Nano) for advanced conversations
- Built with ❤️ for the fitness community

## 📧 Support

Found a bug? Have a feature request?
- Open an issue on GitHub
- Or reach out via discussions

---

**Made with 💪 HealthMind AI - Your Personal Fitness Companion**

Stay healthy, stay strong! 🚀
