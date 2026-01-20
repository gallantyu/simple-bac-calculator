# Deployment Guide

## GitHub Pages Deployment

### Option 1: Using gh-pages package

1. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json` scripts:
```json
"homepage": "https://yourusername.github.io/simple-bac-calculator",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. Deploy:
```bash
npm run deploy
```

### Option 2: Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Copy the `build` folder contents to your GitHub Pages repository

## Netlify Deployment

1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `build`
4. Deploy!

## Vercel Deployment

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

## Important Notes

- Make sure to update the repository URL in `README.md` before publishing
- Consider adding a `LICENSE` file (MIT recommended)
- Add GitHub Topics: `bac-calculator`, `alcohol-calculator`, `blood-alcohol`, `react`, `typescript`, `open-source`

