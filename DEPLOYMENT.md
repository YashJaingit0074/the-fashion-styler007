# 🚀 Deployment Guide for AI Fashion Styler

## Before You Push to GitHub

### 1. **Remove Sensitive Data from .env File**

⚠️ **IMPORTANT:** Make sure your `.env` file does NOT contain actual API keys before pushing to GitHub.

Your `.env` file should look like this:
```env
VITE_GEMINI_API_KEY=
VITE_ELEVENLABS_API_KEY=
```

**Never commit actual API keys to Git!** The `.gitignore` file is configured to prevent this, but double-check.

### 2. **Verify .gitignore**

Ensure your [.gitignore](.gitignore) includes:
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
.vercel
```

### 3. **Check Git Status**

Before pushing, verify that no sensitive files are staged:
```bash
git status
```

Make sure `.env` files are NOT listed in changes to be committed.

---

## Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   ```

2. **Add remote repository**:
   ```bash
   git remote add origin https://github.com/YashJaingit0074/the-fashion-styler.git
   ```

3. **Stage all files**:
   ```bash
   git add .
   ```

4. **Commit changes**:
   ```bash
   git commit -m "Initial commit: AI Fashion Styler"
   ```

5. **Push to GitHub**:
   ```bash
   git push -u origin main
   ```

   If your default branch is `master`, use:
   ```bash
   git push -u origin master
   ```

---

## Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to** [Vercel Dashboard](https://vercel.com/dashboard)

2. **Click "New Project"**

3. **Import your GitHub repository**:
   - Connect your GitHub account if not already connected
   - Select `the-fashion-styler` repository
   - Click "Import"

4. **Configure Project**:
   - Framework Preset: **Vite** (should auto-detect)
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Add Environment Variables**:
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `VITE_GEMINI_API_KEY` | Your actual Gemini API key |
   | `VITE_ELEVENLABS_API_KEY` | Your actual ElevenLabs API key |

6. **Deploy**: Click "Deploy"

7. **Wait** for deployment to complete (usually 1-2 minutes)

8. **Visit** your live site at the provided URL!

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```

4. **Follow prompts**:
   - Set up and deploy? `Y`
   - Which scope? Choose your account
   - Link to existing project? `N` (for first deployment)
   - What's your project's name? `the-fashion-styler`
   - In which directory is your code located? `./`

5. **Add environment variables** via dashboard (as in Option 1, step 5)

6. **Deploy to production**:
   ```bash
   vercel --prod
   ```

---

## Post-Deployment Checklist

- [ ] Verify the site loads correctly
- [ ] Test chat functionality
- [ ] Check 3D avatar renders properly
- [ ] Test voice output (if ElevenLabs API key is configured)
- [ ] Verify location-based recommendations work
- [ ] Check mobile responsiveness

---

## Troubleshooting

### Build Fails

**Error: "VITE_GEMINI_API_KEY is not defined"**
- **Solution**: Add environment variables in Vercel dashboard and redeploy

### API Key Not Working

**Error: "Invalid API key"**
- **Solution**: Verify your API key is correct and has proper permissions
- Check you copied the full key without extra spaces
- Regenerate the key if necessary

### 3D Avatar Not Loading

- Check browser console for errors
- Ensure all Three.js dependencies are installed
- Try clearing cache and hard refresh

### Chat Not Responding

- Verify Gemini API key is set correctly
- Check API quota limits in Google AI Studio
- Review browser console for error messages

---

## Updating Environment Variables

If you need to update your API keys after deployment:

1. Go to Vercel Dashboard
2. Select your project
3. Go to "Settings" → "Environment Variables"
4. Edit the variable
5. Redeploy your project

---

## Security Best Practices

✅ **DO:**
- Use environment variables for all API keys
- Keep `.env` files in `.gitignore`
- Use `.env.example` to document required variables
- Rotate API keys regularly
- Monitor API usage and set quotas

❌ **DON'T:**
- Commit `.env` files to Git
- Share API keys publicly
- Hardcode API keys in source code
- Push API keys to GitHub Issues or PR descriptions

---

## Getting Help

If you encounter issues:

1. Check [Vercel Documentation](https://vercel.com/docs)
2. Review [Vite Documentation](https://vitejs.dev/)
3. Visit [Google AI Studio](https://aistudio.google.com/) for Gemini API help
4. Open an issue on the [GitHub repository](https://github.com/YashJaingit0074/the-fashion-styler/issues)

---

**Happy Deploying! 🎉**
