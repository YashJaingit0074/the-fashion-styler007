# 🔐 Security & Privacy Guide

## Overview

This document outlines security best practices for the AI Fashion Styler project, particularly regarding API key management and deployment.

---

## API Key Management

### ✅ What We've Done to Protect Your Keys

1. **Environment Variables**: All API keys are stored in `.env` files, not in source code
2. **Git Ignore**: `.env` files are listed in `.gitignore` to prevent accidental commits
3. **Example Templates**: `.env.example` and `.env.local` provide templates without actual keys
4. **Vercel Configuration**: `vercel.json` configured for secure deployment

### 🚨 Critical: Before Pushing to GitHub

**STOP! Check this first:**

Run this command to see what files will be committed:
```bash
git status
```

**NEVER commit these files:**
- `.env`
- `.env.local`
- `.env.development.local`
- `.env.production.local`
- Any file containing actual API keys

### 🔍 Check for Exposed Keys

Before pushing, search for hardcoded keys:
```bash
# Search for potential API keys in your code
grep -r "sk_" --exclude-dir=node_modules --exclude-dir=.git .
grep -r "AIza" --exclude-dir=node_modules --exclude-dir=.git .
```

If you find any hardcoded keys in `.ts` or `.tsx` files, remove them immediately!

---

## API Keys Required

### 1. Gemini API Key (Required)

**Where to get it:**
- Visit: [Google AI Studio](https://aistudio.google.com/apikey)
- Sign in with Google account
- Click "Get API Key" or "Create API Key"
- Copy the key (starts with `AIza...`)

**Security Tips:**
- Keep free tier quota limits in mind
- Enable API restrictions in Google Cloud Console
- Rotate keys periodically
- Monitor usage in AI Studio

### 2. ElevenLabs API Key (Optional)

**Where to get it:**
- Visit: [ElevenLabs](https://elevenlabs.io/)
- Sign up for account
- Go to Profile → API Keys
- Copy your API key (starts with `sk_...`)

**Security Tips:**
- Free tier has character limits
- Monitor usage to avoid overage charges
- Can be left blank if voice features aren't needed

---

## Environment Setup

### For Local Development

1. **Copy the template:**
   ```bash
   cp .env.example .env
   ```

2. **Edit `.env` with your actual keys:**
   ```env
   VITE_GEMINI_API_KEY=AIzaSyBzuV... (your actual key)
   VITE_ELEVENLABS_API_KEY=sk_f1d9c7f... (your actual key)
   ```

3. **Never commit this file!**

### For Vercel Deployment

**DO NOT** add your actual keys to any `.env` files in the repository!

Instead:
1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. Add each key there

---

## Git Safety Checklist

Before every commit, verify:

- [ ] `.env` is in `.gitignore`
- [ ] No actual API keys in committed files
- [ ] `.env.example` only has placeholder text
- [ ] No `console.log()` statements printing API keys
- [ ] `git status` shows `.env` as untracked

---

## What to Do If You Accidentally Commit API Keys

### If You Haven't Pushed Yet:

1. **Remove the commit:**
   ```bash
   git reset HEAD~1
   ```

2. **Remove the file from staging:**
   ```bash
   git rm --cached .env
   ```

3. **Add to .gitignore:**
   ```bash
   echo ".env" >> .gitignore
   ```

4. **Commit again:**
   ```bash
   git add .
   git commit -m "Add .gitignore for environment files"
   ```

### If You've Already Pushed:

🚨 **Your API keys are now public! Act immediately:**

1. **Revoke the exposed API keys:**
   - **Gemini**: Go to [AI Studio](https://aistudio.google.com/apikey) and delete the key
   - **ElevenLabs**: Go to your profile and revoke the key

2. **Generate new API keys**

3. **Remove the keys from Git history:**
   ```bash
   # Install BFG Repo Cleaner or use git filter-branch
   # This is complex - see GitHub's guide on removing sensitive data
   ```

4. **Force push the cleaned repository:**
   ```bash
   git push --force
   ```

5. **Update your local and Vercel environment variables** with new keys

---

## Privacy & Data Handling

### User Data

**What we collect:**
- Chat messages (stored locally in browser session only)
- Approximate location coordinates (if permission granted)

**What we DON'T collect:**
- No persistent storage of user data
- No server-side logging of conversations
- No personal information beyond what's shared in chat

### Location Data

- Only used for styling recommendations
- Approximate coordinates only (rounded to 2 decimal places)
- Not stored or transmitted to any server
- Requires explicit user permission

### Third-Party APIs

**Google Gemini:**
- Processes your fashion queries
- See [Google's Privacy Policy](https://policies.google.com/privacy)

**ElevenLabs:**
- Processes text-to-speech requests
- See [ElevenLabs Privacy Policy](https://elevenlabs.io/privacy)

---

## Security Best Practices

### For Developers

1. **Keep dependencies updated:**
   ```bash
   npm audit
   npm update
   ```

2. **Use environment variables:**
   ```typescript
   // ✅ Good
   const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
   
   // ❌ Bad
   const apiKey = "AIzaSyBzuV...";
   ```

3. **Never log sensitive data:**
   ```typescript
   // ❌ Bad
   console.log('API Key:', apiKey);
   
   // ✅ Good
   console.log('API Key loaded:', !!apiKey);
   ```

4. **Validate environment variables:**
   ```typescript
   if (!import.meta.env.VITE_GEMINI_API_KEY) {
     console.error('Missing VITE_GEMINI_API_KEY');
   }
   ```

### For Users

1. **Protect your API keys** - treat them like passwords
2. **Monitor API usage** in respective dashboards
3. **Set usage quotas** to prevent unexpected charges
4. **Use separate keys** for development and production
5. **Rotate keys regularly** (every 90 days recommended)

---

## Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** open a public GitHub issue
2. Email the maintainer directly (check GitHub profile for contact)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

---

## Compliance

This project:
- Does not require user authentication
- Does not store user data server-side
- Uses client-side storage only (session-based)
- Complies with API provider terms of service

---

## Additional Resources

- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Vercel: Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Vite: Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

---

**Stay secure! 🔒**
