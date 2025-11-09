# Process Discovery Report - React + TypeScript + Vite

A modern, professional React application built with TypeScript, Vite, and Lucide React icons.

## 🚀 Features

- **React 18** with TypeScript
- **Vite** for lightning-fast development
- **Lucide React** for beautiful icons
- **Modern CSS** with glassmorphism and 3D effects
- **Fully typed** with TypeScript interfaces
- **Responsive design** that works on all devices

## 📦 Installation

Since npm authentication is not working, you'll need to install dependencies manually:

```bash
cd react-app

# Try installing normally first
npm install

# If that fails, use --legacy-peer-deps
npm install --legacy-peer-deps

# If that also fails, use --force
npm install --force
```

## 🏃 Running the App

```bash
npm run dev
```

The app will open automatically at `http://localhost:3000`

## 📁 Project Structure

```
react-app/
├── public/
│   └── data.json          # Your input data
├── src/
│   ├── components/        # React components
│   │   ├── ReportMetadata.tsx
│   │   ├── AggregatedMetrics.tsx
│   │   ├── AgentPerformance.tsx
│   │   ├── ApplicationUsage.tsx
│   │   ├── BusinessProcessAnalysis.tsx
│   │   └── Synthesis.tsx
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   ├── types.ts          # TypeScript interfaces
│   └── index.css         # Global styles
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Components

### ReportMetadata
Displays report ID, generation date, and total calls analyzed with animated counter.

### AggregatedMetrics
Shows average handling time and after-call work time with beautiful tables.

### AgentPerformance
Features most productive agents and leaderboard with medal rankings (🥇🥈🥉).

### ApplicationUsage
Displays most used applications and detailed breakdown by agent.

### BusinessProcessAnalysis
Shows recurring routines with efficiency comparisons.

### Synthesis
Comprehensive analysis including:
- Common Anomalies (red alerts)
- Best Practices (green highlights)
- Idle Time Hotspots (orange warnings)
- Strategic Insights (blue information)

## 🎯 Technologies Used

- **React 18.3.1** - UI library
- **TypeScript 5.6.3** - Type safety
- **Vite 5.4.11** - Build tool
- **Lucide React 0.263.1** - Icon library
- **CSS3** - Modern styling with gradients and animations

## 🎨 Design Features

- Dark gradient background
- Glassmorphism cards
- 3D hover effects
- Smooth animations
- Color-coded insights
- Professional typography
- Responsive tables
- Icon integration

## 🔧 Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📝 Updating Data

Replace `/public/data.json` with your own data following the same structure.

## 🌟 Features Highlights

- ✅ Full TypeScript support
- ✅ Modern React hooks
- ✅ Component-based architecture
- ✅ Beautiful Lucide icons
- ✅ Responsive design
- ✅ Professional styling
- ✅ Fast Vite dev server
- ✅ Production-ready build

## 🎊 Enjoy!

Your Process Discovery Report is now a beautiful, modern React application!

