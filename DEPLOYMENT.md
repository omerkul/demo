# GitHub Pages Deployment Guide

## Setup Instructions

### 1. Update package.json
Replace `<USERNAME>` in the `homepage` field with your GitHub username:
```json
"homepage": "https://YOUR-GITHUB-USERNAME.github.io/processdiscoveryfromvideos"
```

### 2. Initialize Git Repository (if not already done)
```bash
git init
git add .
git commit -m "Initial commit"
```

### 3. Create GitHub Repository
1. Go to GitHub and create a new repository named `processdiscoveryfromvideos`
2. Don't initialize it with README, .gitignore, or license

### 4. Link Local Repository to GitHub
```bash
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/processdiscoveryfromvideos.git
git branch -M main
git push -u origin main
```

### 5. Deploy to GitHub Pages
```bash
npm run deploy
```

This will create a `gh-pages` branch and deploy your site.

### 6. Configure GitHub Pages
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select the `gh-pages` branch
4. Click **Save**

### 7. Access Your Site
Your site will be available at:
```
https://YOUR-GITHUB-USERNAME.github.io/processdiscoveryfromvideos
```

Note: It may take a few minutes for the site to become available after the first deployment.

## Updating Your Site

Whenever you make changes:
```bash
git add .
git commit -m "Your commit message"
git push
npm run deploy
```

## Files Included
- `.nojekyll` - Ensures GitHub Pages serves all files correctly
- `index.html` - Main HTML file
- `app.jsx` - React application
- `style.css` - Styles
- `input.json` - Data file

