# Deployment Guide - Hot Grill Restaurant Website

Complete guide to deploy Hot Grill website to Vercel.

## Step-by-Step Deployment

### Step 1: Prepare Your Code

1. **Initialize Git Repository** (if not already done)
   ```bash
   cd hot-grill
   git init
   git add .
   git commit -m "Initial commit - Hot Grill website"
   ```

2. **Create GitHub Account** (if you don't have one)
   - Visit [github.com](https://github.com)
   - Sign up and create account

### Step 2: Push to GitHub

1. **Create New Repository on GitHub**
   - Log in to GitHub
   - Click "+" icon → New repository
   - Name: `hot-grill`
   - Description: "Hot Grill Restaurant Website"
   - Click "Create repository"

2. **Push Local Code to GitHub**
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/hot-grill.git
   git push -u origin main
   ```

### Step 3: Deploy to Vercel

#### Method 1: Using Vercel Dashboard (Recommended)

1. **Sign Up on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "Sign Up"
   - Choose "Continue with GitHub"
   - Authorize Vercel

2. **Create New Project**
   - Click "New Project"
   - Select your `hot-grill` repository
   - Click "Import"

3. **Configure Project**
   - Project Name: `hot-grill-restaurant`
   - Framework Preset: Other (static)
   - Build Command: Leave empty
   - Output Directory: Leave empty
   - Click "Deploy"

4. **Wait for Deployment**
   - Vercel will build and deploy automatically
   - You'll see deployment status
   - Once complete, you'll get a live URL

#### Method 2: Using Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy from Terminal**
   ```bash
   cd hot-grill
   vercel
   ```

3. **Follow Prompts**
   - Connect to GitHub account
   - Select project settings
   - Deploy

### Step 4: Custom Domain (Optional)

1. **Add Custom Domain**
   - Go to Vercel project settings
   - Click "Domains"
   - Add your domain
   - Update DNS settings with your domain provider

2. **DNS Configuration**
   - Follow Vercel's DNS instructions
   - Verify domain ownership
   - Wait for propagation (24-48 hours)

## Post-Deployment

### Verify Deployment
- [ ] Homepage loads correctly
- [ ] All pages accessible (Menu, Reservations, Contact)
- [ ] Forms work properly
- [ ] Responsive design on mobile
- [ ] Images load correctly
- [ ] Navigation links work

### Monitor Performance
- Use Vercel Analytics
- Check Core Web Vitals
- Monitor error rates

### Set Up Auto-Deploy
- Vercel automatically deploys on push to main branch
- Create separate branches for development
- Set up branch deployments if needed

## Making Updates

### After Deployment

1. **Make Changes Locally**
   ```bash
   # Edit files
   # Test locally
   ```

2. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update: description of changes"
   git push origin main
   ```

3. **Automatic Deployment**
   - Vercel automatically deploys when you push
   - Check Vercel dashboard for status
   - Site updates within minutes

## Troubleshooting

### Deployment Fails
- Check that all HTML files are included
- Verify vercel.json syntax
- Check file paths in HTML

### Site Shows 404
- Verify vercel.json rewrite rules
- Check that index.html exists
- Clear browser cache

### Slow Loading
- Minimize CSS and JavaScript
- Compress images
- Enable caching headers

### Forms Not Working
- Check browser console for errors
- Verify JavaScript file paths
- Test locally first

## Environment Variables

For production, add to Vercel project settings:

```
NODE_ENV=production
```

## Security Checklist

- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Headers configured in vercel.json
- [ ] No sensitive data in code
- [ ] Input validation working
- [ ] Form submissions secure

## Performance Tips

1. **Optimize Images**
   - Use modern formats (WebP)
   - Compress before uploading
   - Use appropriate sizes

2. **Minimize CSS/JS**
   - Remove unused styles
   - Combine files if possible
   - Minify before production

3. **Enable Caching**
   - Vercel caches automatically
   - Set appropriate cache headers
   - Use Service Workers (optional)

## Monitoring & Analytics

### Vercel Analytics
- Go to project → Analytics
- Monitor page views
- Track performance metrics
- Check error rates

### Google Analytics (Optional)
1. Create Google Analytics account
2. Add tracking code to base.html
3. Monitor traffic and user behavior

## Rollback

If something goes wrong:

1. **Rollback to Previous Deployment**
   - Go to Vercel project → Deployments
   - Find previous working version
   - Click "Promote to Production"

2. **Revert Git Changes**
   ```bash
   git revert HEAD
   git push origin main
   ```

## Support

For deployment issues:
- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- Check browser console for errors
- Email: info@hotgrill.com

## Maintenance Schedule

- **Daily**: Monitor error logs
- **Weekly**: Check analytics
- **Monthly**: Review performance
- **Quarterly**: Security audit

---

**Last Updated**: September 2026  
**Version**: 1.0.0
