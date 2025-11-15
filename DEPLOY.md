# Vercel Deployment Guide

## Method 1: Vercel Dashboard (Easiest) ✅

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your repository: `MUHAMMADHASSNAT/whatsmask`
5. Click "Import"
6. Settings (auto-detected):
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
7. Click "Deploy"
8. Wait 1-2 minutes
9. Your site will be live! 🎉

## Method 2: Vercel CLI

### Install Vercel CLI:
```bash
npm install -g vercel
```

### Login to Vercel:
```bash
vercel login
```

### Deploy:
```bash
vercel
```

### For production:
```bash
vercel --prod
```

## Important Notes:

- ✅ `vercel.json` is already configured
- ✅ Build settings are optimized for Vite
- ✅ All routes will work correctly (SPA routing)
- ✅ Automatic deployments on every git push (if connected via Dashboard)

## After Deployment:

Your site will be available at:
- `https://whatsmask.vercel.app` (or your custom domain)

## Environment Variables (if needed):

If you need to add environment variables:
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add your variables

## Custom Domain:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your custom domain

