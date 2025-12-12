# 🤫 IP Whisperer - Getting Started in 5 Minutes

## Welcome! 👋

You're about to run your AI-powered IP protection agent. This guide gets you from zero to running bot in 5 minutes.

---

## ⚡ Super Quick Start

**If you just want to see it work:**

```bash
# 1. Go to project
cd /home/arpit/Desktop/hackathon_projects/Arena_agent/ip-whisperer

# 2. Install (already done!)
# npm install ✅

# 3. Get a Telegram bot token
# Open Telegram → Search for @BotFather
# Send: /newbot
# Follow prompts
# Copy the token (looks like: 123456:ABC-DEF...)

# 4. Quick config
cp .env.example .env
nano .env
# Paste your TELEGRAM_BOT_TOKEN
# Save and exit (Ctrl+X, Y, Enter)

# 5. Run!
npm start
```

**Expected output:**
```
🤖 Starting bot...
✅ Story Protocol client initialized
✅ Bot running!
```

**Now open Telegram and message your bot!**

---

## 🔑 Getting Your API Keys (10 minutes)

### 1. Telegram Bot Token (Required) ⚡

**Steps:**
1. Open Telegram
2. Search for `@BotFather`
3. Send: `/newbot`
4. Choose a name: `My IP Whisperer`
5. Choose a username: `myipwhisperer_bot` (must end in `_bot`)
6. Copy the token that looks like: `7047362814:AAHhz3lk2n_abc123...`

**Add to .env:**
```bash
TELEGRAM_BOT_TOKEN=7047362814:AAHhz3lk2n_abc123...
```

---

### 2. Story Protocol Wallet (Required) 🔗

**Steps:**
1. Install MetaMask: metamask.io (if you don't have it)
2. Create a new wallet or use existing testnet wallet
3. Go to Settings → Advanced → Show Secret Recovery Phrase
4. Or export private key: Settings → Security → Export Private Key

**Add to .env (REMOVE the 0x prefix):**
```bash
# Wrong ❌
WALLET_PRIVATE_KEY=0xabc123def456...

# Correct ✅  
WALLET_PRIVATE_KEY=abc123def456...
```

**Get testnet ETH:**
- Visit: https://faucet.story.foundation
- Paste your wallet address
- Request testnet ETH

---

### 3. OpenAI API Key (Required) 🤖

**Steps:**
1. Go to: https://platform.openai.com
2. Sign up / Log in
3. Go to: API Keys section
4. Click "Create new secret key"
5. Name it: `IP Whisperer Hackathon`
6. Copy the key (starts with `sk-`)

**Add to .env:**
```bash
OPENAI_API_KEY=sk-proj-abc123...
```

**Note:** You get $5 free credit when you sign up!

---

### 4. Twitter API (Optional) 🐦

**For MVP: Skip this!** The bot uses mock data by default.

**If you want real Twitter scanning:**
1. Go to: https://developer.twitter.com
2. Apply for API access
3. Get Bearer Token
4. Add to .env:
```bash
TWITTER_BEARER_TOKEN=AAAAAAAAAAAAAAAAAAAAABc123...
```

---

## 📝 Your Complete .env File

After getting the keys above, your `.env` should look like:

```bash
# Blockchain
STORY_RPC_URL=https://testnet.storyrpc.io
WALLET_PRIVATE_KEY=your_private_key_here_no_0x
STORY_CHAIN_ID=1513

# API Keys
OPENAI_API_KEY=sk-proj-your_key_here
TELEGRAM_BOT_TOKEN=123456:ABC-DEF_your_token_here
# TWITTER_BEARER_TOKEN=  # Optional - leave commented for MVP

# App Settings (defaults are fine)
SCAN_INTERVAL_MINUTES=5
SIMILARITY_THRESHOLD=0.80
MAX_SCAN_RESULTS=10
DEBUG_MODE=true
```

---

## 🚀 First Run Checklist

Before running `npm start`, verify:

- [x] Node.js 18+ installed (`node -v`)
- [x] Dependencies installed (`npm install`) ✅ Already done!
- [x] `.env` file exists (`ls .env`)
- [x] `TELEGRAM_BOT_TOKEN` set in `.env`
- [x] `WALLET_PRIVATE_KEY` set in `.env` (no 0x!)
- [x] `OPENAI_API_KEY` set in `.env`
- [x] Wallet has testnet ETH (check on explorer)

**All good? Run it:**

```bash
npm start
```

---

## 📱 Testing Your Bot

### Step 1: Find Your Bot

1. Open Telegram
2. Search for your bot username (e.g., `@myipwhisperer_bot`)
3. Click "Start" or send `/start`

### Step 2: Try Commands

```
You: /start
Bot: 🤫 IP Whisperer at your service!

You: /protect My First IP
Bot: What's the name of your work?

You: Sigma Music Remix
Bot: Brief description?

You: Epic electronic remix with bass drops
Bot: 🔄 Registering...
     ✅ IP registered! IP ID: 0x123...
     Now monitoring... 🔭
```

### Step 3: Check Alerts

```
You: /alerts
Bot: [Shows any detected matches]

You: /status
Bot: [Shows your protected assets]
```

### Step 4: Try Enforcement

```
You: /enforce
Bot: [Shows enforcement options with tone choices]

[Click a tone button]

Bot: ✅ Enforcement complete!
     [Shows generated message]
```

**If all this works: YOU'RE DONE! 🎉**

---

## 🐛 Common First-Run Issues

### Issue 1: "Missing environment variables"

**Fix:**
```bash
# Check what's in your .env
cat .env

# Make sure these 3 exist:
grep TELEGRAM_BOT_TOKEN .env
grep WALLET_PRIVATE_KEY .env  
grep OPENAI_API_KEY .env
```

### Issue 2: Bot doesn't respond on Telegram

**Fix:**
```bash
# Test the token
curl https://api.telegram.org/bot<YOUR_TOKEN>/getMe

# Should return JSON with bot info
# If error → token is wrong, get new one from @BotFather
```

### Issue 3: "Invalid signer" when registering IP

**Fix:**
```bash
# Check private key has NO 0x prefix
grep WALLET_PRIVATE_KEY .env
# Should output: WALLET_PRIVATE_KEY=abc123... (no 0x)

# Check wallet has testnet ETH
# Visit: https://faucet.story.foundation
```

### Issue 4: OpenAI rate limit errors

**Fix:**
```bash
# Check API key is valid
grep OPENAI_API_KEY .env

# If rate limited → bot automatically uses template messages
# This is OK for demos! No action needed.
```

---

## 📊 Verify It's Working

**Good signs:**

✅ Bot responds to `/start`  
✅ No errors in terminal  
✅ Logs appear in `logs/combined.log`  
✅ Can complete a `/protect` flow  
✅ Transaction hash appears after registration  

**Check logs:**
```bash
# View live logs
tail -f logs/combined.log

# Should see:
# ✅ Story Protocol client initialized
# 📝 Registering IP...
# ✅ IP registered successfully!
```

---

## 🎬 Try the Demo Script

Want to see the full flow without manual testing?

```bash
# Run automated demo
node scripts/demo.js

# This will:
# 1. Initialize Story Protocol
# 2. Register a test IP
# 3. Run a scan
# 4. Generate enforcement messages
# 5. Create a dispute

# Takes ~30 seconds
```

**Expected output:**
```
🎬 IP Whisperer Demo

1️⃣ Initializing Story Protocol...
✅ Connected

2️⃣ Registering test IP...
✅ IP registered: 0x7b3f...

3️⃣ Scanning for infringements...
✅ Found 2 potential matches

4️⃣ Generating messages...
📝 Friendly Tone: [message]
📝 Vibe Tone: [message]

5️⃣ Creating dispute...
✅ Dispute created: 0x9a2b...

🎉 Demo complete!
```

---

## 🏃 What's Next?

**Now that it's running:**

1. **Read the docs:**
   - `README.md` - Overview
   - `IMPLEMENTATION_GUIDE.md` - Deep dive
   - `QUICK_REFERENCE.md` - Commands cheat sheet

2. **Customize it:**
   - Change similarity threshold in `.env`
   - Adjust scan interval
   - Enable Twitter API

3. **Prepare your demo:**
   - Read `PITCH_DECK.md`
   - Practice the flow 5x
   - Record a video

4. **Deploy it:**
   - Railway, PM2, or Docker
   - See deployment guides in docs

---

## 📚 File Guide

**Start here:**
- `README.md` - Main documentation
- `QUICK_REFERENCE.md` - Commands cheat sheet

**For building:**
- `IMPLEMENTATION_GUIDE.md` - Full technical guide
- `src/bot.js` - Bot code (start reading here)

**For the hackathon:**
- `PITCH_DECK.md` - Presentation materials
- `TIMELINE.md` - 4-week schedule

**Reference:**
- `PROJECT_SUMMARY.md` - Everything in one place

---

## 🆘 Still Stuck?

**Debug steps:**

1. **Check Node version:**
   ```bash
   node -v  # Should be 18.x or higher
   ```

2. **Reinstall dependencies:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Verify .env format:**
   ```bash
   cat .env | head -5
   # Should see key=value pairs, no quotes
   ```

4. **Check logs for errors:**
   ```bash
   cat logs/error.log
   ```

5. **Test modules individually:**
   ```bash
   # Test config
   node -e "import('./src/config.js').then(m => console.log('✅ Config OK'))"
   
   # Test Story Protocol
   node -e "import('./src/modules/storyProtocol.js').then(m => m.default.initialize())"
   ```

**Still not working?**
- Check `logs/combined.log` for detailed errors
- Read `IMPLEMENTATION_GUIDE.md` → Troubleshooting section
- Verify all API keys are valid

---

## ✅ Success Checklist

You're ready when:

- [ ] Bot starts without errors
- [ ] Bot responds to `/start` on Telegram
- [ ] Can complete `/protect` flow
- [ ] IP registration returns transaction hash
- [ ] `/alerts` command works (even if no matches)
- [ ] `/enforce` generates messages
- [ ] Logs are written to `logs/` directory

**All checked? YOU'RE READY TO BUILD! 🚀**

---

## 🎯 Quick Commands Reference

```bash
# Start the bot
npm start

# Run with auto-reload (development)
npm run dev

# Run demo
node scripts/demo.js

# Run tests
npm test

# Interactive setup
npm run setup

# Check logs
tail -f logs/combined.log
```

---

**You're all set! Start building and good luck at the hackathon! 🏆**

**Next:** Open Telegram and send `/start` to your bot!

#StoryBuildathon #IPWhisperer 🤫

---

**Questions?** Check the other documentation files or logs.  
**Ready?** → `npm start` 🚀
