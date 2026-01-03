# ✅ Pre-Push Checklist

Run through this checklist before pushing to GitHub:

## 1. Environment Variables
- [ ] `.env` file contains NO actual API keys (should be empty or have placeholders)
- [ ] `.env.example` exists with placeholder values
- [ ] Your actual API keys are stored safely (password manager or secure note)

## 2. Git Status Check
```bash
git status
```
- [ ] `.env` is NOT in the list of files to be committed
- [ ] Only intended files are staged for commit

## 3. Search for Hardcoded Secrets
```bash
# Check for potential API keys
grep -r "AIza" --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist .
grep -r "sk_" --exclude-dir=node_modules --exclude-dir=.git --exclude-dir=dist .
```
- [ ] No API keys found in source code

## 4. Verify .gitignore
- [ ] `.gitignore` includes `.env` and `.env.local`
- [ ] `.gitignore` includes `.vercel`
- [ ] `.gitignore` includes `node_modules` and `dist`

## 5. Documentation
- [ ] README.md is updated with setup instructions
- [ ] DEPLOYMENT.md exists with deployment guide
- [ ] SECURITY.md exists with security guidelines

## 6. Build Test
```bash
npm run build
```
- [ ] Project builds successfully without errors

## 7. Code Quality
- [ ] No `console.log` statements with sensitive data
- [ ] No TODO comments referencing API keys or secrets
- [ ] No debugging code left in production files

## All checks passed? You're ready to push! 🚀

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

---

## Need Help?

If any check fails, review:
- [SECURITY.md](SECURITY.md) for security guidelines
- [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions
- [README.md](README.md) for general setup
