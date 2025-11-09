# Process Discovery Report - React Application

## Overview
This application has been converted from vanilla JavaScript to React. It displays process discovery reports with aggregated metrics, process insights, agent performance, and topic analysis.

## Architecture

### Components
The application is now structured with the following React components:

1. **App** - Main component that fetches data and manages state
2. **ReportMetadata** - Displays report ID, generation date, and total calls analyzed
3. **AggregatedMetrics** - Shows overall average handling time and per-call metrics
4. **ProcessInsights** - Displays discovered process flows and deviations
5. **ProcessFlow** - Individual process flow visualization
6. **ProcessDeviations** - Lists process deviations with details
7. **AgentPerformance** - Shows agent-specific performance metrics
8. **TopicAnalysis** - Displays topic frequency and related calls

### File Structure
```
.
├── index.html          # Main HTML file with React CDN links
├── app.jsx             # React components and application logic
├── style.css           # Existing styles (unchanged)
├── input.json          # Data source (unchanged)
└── README.md           # This file
```

## Running the Application

### Option 1: Using Python HTTP Server
```bash
python3 -m http.server 8000
```
Then open your browser to: http://localhost:8000
- ✅ Modular and reusable components
### Option 2: Using Node.js HTTP Server
```bash
npx http-server -p 8000
```
Then open your browser to: http://localhost:8000

### Option 3: Using VS Code Live Server
- Install the Live Server extension
- Right-click on `index.html` and select "Open with Live Server"

## Technology Stack
- **React 18** - Modern UI library with hooks (loaded via CDN)
- **ReactDOM 18** - Efficient DOM rendering
- **Chart.js 4.4** - Beautiful, responsive chart visualizations
- **Babel Standalone** - JSX transformation in the browser
- **CSS3** - Advanced animations, transforms, glassmorphism

## 🎨 Design Features

### 3D Effects
- **Card Transforms** - `rotateX(5deg) rotateY(5deg)` on hover
- **Depth Layering** - Multiple shadow layers for realistic depth
- **Animation**: Expand from center

## Development Notes

### Why CDN Instead of npm?
This implementation uses React via CDN and Babel Standalone for simplicity and to avoid build tooling. This is suitable for:
- Quick prototypes
- **Particle Float** - Background particles drift and scale
- **Shine Effect** - Light sweep across stats cards
- **Pulse** - Loading state animation

### Glassmorphism
- **Frosted Glass** - `backdrop-filter: blur(20px)`
- **Semi-Transparent** - `rgba(255, 255, 255, 0.95)`
- **Inner Glow** - Inset highlights for depth
- **Border Styling** - Subtle white borders for definition

### Color System
```css
Background: Dark gradient (#0f0c29 → #302b63 → #24243e)
Primary: Purple gradient (#667eea → #764ba2)
Accent: Pink gradient (#f093fb → #f5576c)
Success: Green (#48bb78)
Warning: Orange (#ed8936)
Danger: Red (#f56565)
Info: Blue (#4299e1)
```

4. Adding TypeScript for type safety
5. Implementing code splitting
6. Using production builds of React

### Converting to Modern Build Setup
```bash
# Option 1: Create React App
npx create-react-app process-discovery-app
# Then copy components to src/ directory

## Key Features
- ✅ Component-based architecture
- ✅ React Hooks (useState, useEffect)
- ✅ Loading and error states
- ✅ Proper key props for lists
- ✅ Modular and reusable components
- ✅ Same visual appearance as original
- ✅ No build process required (uses CDN)
