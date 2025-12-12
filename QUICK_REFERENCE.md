# 🚀 Quick Reference Card - IP Whisperer

## One-Page Developer Cheat Sheet

### 🏃 Instant Start (30 seconds)

```bash
cd ip-whisperer
npm install
cp .env.example .env
# Edit .env with your keys
npm start
```

### 🔑 Required API Keys

| Service | Get From | Cost |
|---------|----------|------|
| Telegram | @BotFather on Telegram | Free |
| Story Wallet | MetaMask | Free testnet |
| OpenAI | platform.openai.com | $5 free credit |

### 📱 Bot Commands

```
/start   → Welcome
/protect → Register IP
/status  → View assets
/alerts  → Check violations
/enforce → Take action
```

### 🏗️ File Structure

```
src/
├── bot.js              # Telegram interface
├── orchestrator.js     # Main logic
├── config.js           # Settings
├── modules/
│   ├── storyProtocol.js   # Blockchain
│   ├── scanner.js         # Detection
│   └── enforcement.js     # AI messages
└── utils/
    └── logger.js          # Logging
```

### 🧪 Quick Test

```bash
# Terminal 1: Start bot
npm start

# Terminal 2: Run demo
node scripts/demo.js

# Telegram: Message your bot
/protect Test Asset
```

### 🔧 Common Fixes

**Bot not responding?**
```bash
# Check token
echo $TELEGRAM_BOT_TOKEN

# Restart
npm start
```

**Story Protocol error?**
```bash
# Get testnet ETH
# Visit: faucet.story.foundation
```

**OpenAI rate limit?**
```bash
# Uses template fallback automatically
# Check logs/combined.log
```

### 📊 Environment Variables (.env)

```bash
# REQUIRED
TELEGRAM_BOT_TOKEN=123:ABC...
WALLET_PRIVATE_KEY=abc123... # No 0x prefix!
OPENAI_API_KEY=sk-...
STORY_RPC_URL=https://testnet.storyrpc.io

# OPTIONAL
TWITTER_BEARER_TOKEN=...
SCAN_INTERVAL_MINUTES=5
SIMILARITY_THRESHOLD=0.80
DEBUG_MODE=true
```

### 🎯 Demo Flow (60 seconds)

1. Open Telegram → Your bot
2. `/protect Color Cats NFT`
3. "NFT art collection"
4. Wait for "✅ Registered!"
5. `/alerts` → See mock matches
6. `/enforce` → Choose tone
7. Show generated message ✨

### 📦 Key Dependencies

```json
{
  "@story-protocol/core-sdk": "Blockchain",
  "telegraf": "Bot interface",
  "openai": "AI messages",
  "natural": "Similarity detection",
  "viem": "Ethereum client"
}
```

### 🐛 Debug Commands

```bash
# View logs
tail -f logs/combined.log

# Test Story connection
node -e "import('./src/modules/storyProtocol.js').then(m => m.default.initialize())"

# Check config
node -e "import('./src/config.js').then(m => console.log(m.config))"
```

### 🚢 Deploy to Railway

```bash
# Install CLI
npm i -g railway

# Login & deploy
railway login
railway up

# Set vars in dashboard
TELEGRAM_BOT_TOKEN=...
WALLET_PRIVATE_KEY=...
OPENAI_API_KEY=...
```

### 📈 Success Metrics

- ✅ IP registered in <30s
- ✅ Matches found in <10s
- ✅ Alerts within 5min
- ✅ 3 clicks to enforce

### 🏆 Judging Hooks

**Innovation:** "First proactive IP monitoring using AI + blockchain"  
**UX:** "Chat interface - no dashboards needed"  
**Tech:** "Story SDK + OpenAI semantic detection"  
**Demo:** "Live bot judges can message"

### 📝 Submission Checklist

- [ ] Code on GitHub (public repo)
- [ ] README.md complete
- [ ] Demo video uploaded
- [ ] .env.example included
- [ ] No secrets committed
- [ ] License file (MIT)

### 🆘 Emergency Contacts

- **Story Protocol Discord:** discord.gg/storyprotocol
- **Docs:** docs.story.foundation
- **Testnet Faucet:** faucet.story.foundation

### ⚡ Performance Targets

| Action | Target | Actual |
|--------|--------|--------|
| Register IP | <30s | __ |
| Scan complete | <10s | __ |
| Alert delivery | <5min | __ |
| Enforce flow | <3 clicks | __ |

---

## 🎓 Key Concepts

**TF-IDF:** Term Frequency-Inverse Document Frequency  
→ Weights words by uniqueness

**Cosine Similarity:** Measures text similarity  
→ 0 = no match, 1 = identical

**Story Protocol:** L1 blockchain for IP  
→ Tokenizes creative assets

**Semantic Search:** Meaning-based matching  
→ Finds similar content, not exact copies

---

## 🔗 Useful Links

- **Project:** /ip-whisperer/README.md
- **Guide:** /IMPLEMENTATION_GUIDE.md
- **Timeline:** /TIMELINE.md
- **Pitch:** /PITCH_DECK.md

---

**Print this page for quick reference! 🖨️**

#StoryBuildathon #IPWhisperer
