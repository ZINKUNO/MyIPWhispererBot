# IP Whisperer: Complete Implementation Guide

**Buildathon:** Surreal World Assets (Story Protocol L1)  
**Track:** IP Detection & Enforcement  
**Build Time:** 5-7 Hours (MVP)

---

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Development Timeline](#development-timeline)
3. [Module Deep Dive](#module-deep-dive)
4. [Testing Strategy](#testing-strategy)
5. [Demo Preparation](#demo-preparation)
6. [Deployment Guide](#deployment-guide)
7. [Troubleshooting](#troubleshooting)

---

## 🚀 Quick Start

### Prerequisites Setup (15 minutes)

**1. Install Node.js and Dependencies**
```bash
# Verify Node.js version (18+ required)
node --version

# Navigate to project
cd ip-whisperer

# Install all dependencies
npm install
```

**2. Get API Keys**

| Service | Where to Get | Required? |
|---------|-------------|-----------|
| Telegram Bot | [@BotFather](https://t.me/BotFather) on Telegram | ✅ Yes |
| Story Testnet Wallet | [Create MetaMask wallet](https://metamask.io) | ✅ Yes |
| OpenAI API | [platform.openai.com](https://platform.openai.com) | ✅ Yes |
| Twitter API | [developer.twitter.com](https://developer.twitter.com) | ⚠️ Optional |

**3. Configure Environment**
```bash
# Interactive setup
npm run setup

# OR manually
cp .env.example .env
nano .env  # Fill in your keys
```

**4. Test Connection**
```bash
# Start the bot
npm start

# Should see:
# ✅ Story Protocol client initialized
# ✅ Bot running!
```

---

## 📅 Development Timeline

### Week 1: Core MVP (5-7 hours)

| Time | Task | Output |
|------|------|--------|
| 30min | Environment setup | Working dev environment |
| 2hrs | Story Protocol integration | IP registration working |
| 1.5hrs | Scanner module | Semantic similarity detection |
| 1.5hrs | Enforcement engine | AI message generation |
| 1hr | Telegram bot interface | Working chat UI |
| 30min | Testing & debug | Runnable demo |

### Week 2-3: Polish & Extensions (Optional)

- Add screenshot capture for evidence
- Implement real Twitter API integration
- Create Dune Analytics dashboard
- Add "vibe mode" with meme generation
- Multi-tone message variations

### Week 4: Demo & Submission

- Record 1-minute demo video
- Prepare pitch deck
- Submit to buildathon portal

---

## 🏗️ Module Deep Dive

### 1. Story Protocol Integration (`src/modules/storyProtocol.js`)

**Purpose:** Registers IP assets and disputes on Story Protocol blockchain.

**Key Functions:**

```javascript
// Initialize connection to Story Protocol
await storyProtocol.initialize();

// Register IP asset
const result = await storyProtocol.registerIP({
  name: "My Creative Work",
  description: "Description for similarity matching",
  mediaUrl: "https://ipfs.io/ipfs/...",
  contentHash: "QmXXX...",
  attributes: [{ key: "Type", value: "Music" }]
});
// Returns: { success: true, ipId: "0x...", txHash: "0x..." }

// Create dispute for infringement
const dispute = await storyProtocol.createDispute(ipId, {
  platform: "Twitter",
  url: "https://x.com/...",
  similarity: 0.92,
  content: "Stolen content text"
});
```

**Configuration:**
- Uses Story Odyssey testnet
- Requires testnet ETH for gas
- Private key stored securely in `.env`

**Troubleshooting:**
- **Error: "Insufficient funds"** → Get testnet ETH from [Story faucet](https://faucet.story.foundation)
- **Error: "Network error"** → Check `STORY_RPC_URL` in `.env`

---

### 2. Scanner Module (`src/modules/scanner.js`)

**Purpose:** Detects potential IP infringements using semantic similarity.

**Algorithm:**
1. Fetch posts from Twitter/X matching keywords
2. Calculate TF-IDF vectors for original IP + posts
3. Compute cosine similarity
4. Filter by threshold (default: 0.80)

**Code Example:**

```javascript
const ipAsset = {
  name: "Sigma Music Remix",
  description: "Epic electronic music remix",
  keywords: ["music", "remix"]
};

const matches = await scanner.scanAll(ipAsset);
// Returns array of matches with similarity scores
```

**Performance:**
- Scans complete in ~2-3 seconds (mock mode)
- With Twitter API: ~5-10 seconds depending on rate limits
- Background scans run every 5 minutes (configurable)

**Customization:**
```javascript
// Adjust similarity threshold in .env
SIMILARITY_THRESHOLD=0.85  // More strict
SIMILARITY_THRESHOLD=0.75  // More lenient

// Change scan interval
SCAN_INTERVAL_MINUTES=10  // Every 10 minutes
```

---

### 3. Enforcement Engine (`src/modules/enforcement.js`)

**Purpose:** Generates contextual enforcement messages using AI.

**Tone Variations:**

| Tone | Use Case | Example |
|------|----------|---------|
| `friendly` | First contact | "Hey! Love your post but..." |
| `formal` | Legal compliance | "We've identified unauthorized use..." |
| `vibe` | Gen-Z audience | "yo! this is fire but it's registered IP 🔥" |

**AI Prompt Engineering:**

The module uses OpenAI GPT-4 with carefully crafted prompts:
```javascript
Generate a DM for someone who used IP without permission.

Tone: {friendly/formal/vibe}
Original IP: {name, description, ipId}
Violation: {platform, url, similarity %}

Instructions:
1. Acknowledge their content
2. Inform about registered IP
3. Offer collaboration/licensing
4. Include claim link
5. Stay positive
```

**Fallback Mechanism:**
- If OpenAI API fails → uses template message
- Templates pre-written for all tones
- No user-facing errors

---

### 4. Telegram Bot (`src/bot.js`)

**User Flow:**

```
User: /protect
Bot: What's the name of your work?

User: Sigma Music Remix
Bot: Brief description?

User: Epic electronic remix with bass drops
Bot: 🔄 Registering...
     ✅ IP registered! IP ID: 0x123...
     Now monitoring... 🔭

[5 minutes later]
Bot: 🚨 Alert! Found 92% match on Twitter
     Use /enforce to take action

User: /enforce
Bot: Choose enforcement style:
     [😊 Friendly] [📜 Formal] [🔥 Vibe]

User: *clicks Friendly*
Bot: ✅ Enforcement complete!
     Dispute ID: 0x456...
     
     **Message to send:**
     Hey! Love your post at twitter.com/...
     [Generated message]
```

**Commands:**

```bash
/start   # Welcome message
/protect # Register new IP
/status  # View all protected assets
/alerts  # Check pending violations
/enforce # Generate enforcement action
/help    # Show commands
```

---

## 🧪 Testing Strategy

### Manual Testing Checklist

- [ ] Bot responds to `/start`
- [ ] Can complete `/protect` flow
- [ ] IP registration returns valid transaction hash
- [ ] Scanner finds mock matches
- [ ] `/alerts` shows pending violations
- [ ] `/enforce` generates messages in all 3 tones
- [ ] Dispute creation succeeds
- [ ] Background scanning runs (check logs after 5min)

### Automated Tests

```bash
npm test
```

Runs:
- Similarity calculation tests
- Message generation tests
- Configuration validation

### Demo Script

```bash
# Run full workflow demo
node scripts/demo.js

# Should output:
# 1️⃣ Initializing...
# 2️⃣ Registering IP...
# 3️⃣ Scanning...
# 4️⃣ Generating messages...
# 5️⃣ Creating dispute...
# 🎉 Demo complete!
```

---

## 🎬 Demo Preparation

### 1-Minute Video Script

**[0:00-0:10] Hook**
Show Telegram bot chat. Text: "What if your IP could protect itself?"

**[0:10-0:25] Problem**
Show tweet with stolen content. Overlay: "50K views. $0 for creator."

**[0:25-0:45] Solution**
Screen record: 
1. Type `/protect Color Cats NFT`
2. Fill in description
3. Show "✅ Registered!" message
4. Show alert appear

**[0:45-0:55] Action**
Click `/enforce` → Show generated DM → Show "Dispute created"

**[0:55-1:00] CTA**
Text: "IP Whisperer. Protection that whispers back. 🤫"

### Live Demo Tips

1. **Pre-create** a "stolen" tweet on a test account
2. **Configure** scanner to find it immediately (use exact keywords)
3. **Have** .env ready on demo machine (no fumbling with keys)
4. **Practice** the flow 3x before judges
5. **Backup plan:** Show pre-recorded video if WiFi fails

---

## 🚢 Deployment Guide

### Option 1: Railway (Easiest)

```bash
# Install Railway CLI
npm install -g railway

# Login
railway login

# Deploy
railway up

# Set environment variables in Railway dashboard
```

### Option 2: PM2 (Local/VPS)

```bash
# Install PM2
npm install -g pm2

# Start bot
pm2 start src/bot.js --name ip-whisperer

# View logs
pm2 logs ip-whisperer

# Auto-restart on reboot
pm2 startup
pm2 save
```

### Option 3: Docker

```dockerfile
# Dockerfile (create this file)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
```

```bash
docker build -t ip-whisperer .
docker run -d --env-file .env ip-whisperer
```

---

## 🐛 Troubleshooting

### Common Issues

**1. "Missing environment variables" error**
```bash
# Ensure all required vars are set
grep -E 'TELEGRAM|WALLET|OPENAI' .env

# Should show all 3 keys filled in
```

**2. Story Protocol "Invalid signer" error**
```bash
# Check private key format (no 0x prefix in .env)
WALLET_PRIVATE_KEY=abcdef123...  ✅ Correct
WALLET_PRIVATE_KEY=0xabcdef123... ❌ Wrong
```

**3. Bot not responding on Telegram**
```bash
# Verify bot token
curl https://api.telegram.org/bot<YOUR_TOKEN>/getMe

# Should return bot info
```

**4. "Rate limit exceeded" (OpenAI)**
```bash
# Add retry logic or use template fallback
# Templates work without API calls
```

**5. No scan results**
```bash
# Check if Twitter API is configured
echo $TWITTER_BEARER_TOKEN

# If empty, bot uses mock data (this is OK for demo!)
```

### Debug Mode

Enable verbose logging:
```bash
# In .env
DEBUG_MODE=true

# View logs
tail -f logs/combined.log
```

---

## 🏆 Judging Criteria Alignment

### Innovation (Weight: 30%)
- ✅ **Novel approach:** Proactive monitoring vs reactive DMCA
- ✅ **AI-Blockchain synergy:** Semantic detection + onchain disputes
- ✅ **Automation:** Background scans without user intervention

### Technical Quality (Weight: 25%)
- ✅ **Clean architecture:** Modular design, separation of concerns
- ✅ **Error handling:** Graceful fallbacks, comprehensive logging
- ✅ **Testing:** Unit tests + demo script
- ✅ **Documentation:** README + this guide

### UX (Weight: 20%)
- ✅ **Conversational:** Chat-based, no dashboards
- ✅ **Mobile-first:** Telegram works on any device
- ✅ **Fast:** <10s alerts, instant responses

### Story Protocol Usage (Weight: 15%)
- ✅ **Deep integration:** IP registration + disputes
- ✅ **Testnet deployment:** Live blockchain interactions
- ✅ **SDK best practices:** Proper error handling, gas optimization

### Demo Quality (Weight: 10%)
- ✅ **Live functionality:** Real bot, real blockchain calls
- ✅ **Clear value prop:** Solves visible problem
- ✅ **Polish:** Emojis, friendly messages, vibe-y tone

---

## 📊 Success Metrics

Track these for your pitch:

- **Registration time:** IP asset created in <30s
- **Scan speed:** Matches found in <10s
- **Alert latency:** Notifications within 5min of infringement
- **Enforcement ease:** 3 clicks from alert to dispute
- **Blockchain proof:** All actions have transaction hashes

---

## 🎯 Next Steps

1. **Now:** Run `npm install && npm start`
2. **Today:** Complete one full protect→scan→enforce flow
3. **This week:** Record demo video
4. **Before deadline:** Test on 3+ friends' devices

**Questions?** Check logs in `logs/` directory or open GitHub issue.

**Good luck! 🚀 #StoryBuildathon #IPWhisperer**
