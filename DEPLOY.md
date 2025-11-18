# Deploy to GitHub Pages

## Step 1: Push to GitHub

You need to authenticate with GitHub first. Choose one method:

### Option A: Using Personal Access Token (Recommended)

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `repo` permissions
3. When pushing, use the token as your password:
```bash
git push origin main
# Username: your-github-username
# Password: your-personal-access-token
```

### Option B: Using SSH (More Secure)

1. Generate SSH key if you don't have one:
```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

2. Add SSH key to GitHub:
   - Copy your public key: `cat ~/.ssh/id_ed25519.pub`
   - Go to GitHub Settings → SSH and GPG keys → New SSH key
   - Paste your key

3. Change remote URL to SSH:
```bash
git remote set-url origin git@github.com:aliz3290/Nails.git
git push origin main
```

### Option C: GitHub CLI

```bash
gh auth login
git push origin main
```

## Step 2: Enable GitHub Pages

1. Go to your repository: https://github.com/aliz3290/Nails
2. Click **Settings** → **Pages**
3. Under **Source**, select:
   - Branch: `main`
   - Folder: `/ (root)`
4. Click **Save**

Your site will be live at: `https://aliz3290.github.io/Nails/`

## Step 3: Update API Endpoints (Important!)

Since GitHub Pages only hosts static files, you'll need to:

1. **Deploy the backend server separately** (Heroku, Vercel, Railway, etc.)
2. **Update the API endpoints** in `js/booking.js`:
   - Change `http://localhost:3001` to your deployed backend URL

### Quick Deploy Backend Options:

**Vercel (Easiest):**
```bash
npm install -g vercel
vercel
```

**Heroku:**
```bash
heroku create your-app-name
git push heroku main
```

**Railway:**
- Connect your GitHub repo
- Railway auto-detects Node.js and deploys

## Step 4: Environment Variables

For production, set your Stripe keys as environment variables on your hosting platform:
- `STRIPE_SECRET_KEY=sk_live_...` (use live keys in production!)

## Notes

- GitHub Pages is free and perfect for static sites
- The backend server needs separate hosting
- Update CORS settings in `server.js` to allow your GitHub Pages domain
- Use HTTPS in production (required for Stripe)


