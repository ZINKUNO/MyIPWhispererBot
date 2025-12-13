<img width="445" height="366" alt="image" src="https://github.com/user-attachments/assets/55152bb7-91fe-47af-948d-25e6042b3145" />


# 🤫 IP Whisperer  
### Autonomous AI Agent for IP Protection on Story Protocol

**Track:** IP Detection & Enforcement  
**Buildathon:** Surreal World Assets (Story Protocol)

IP Whisperer is an **AI-powered Telegram bot** that helps creators instantly register, monitor, and enforce their intellectual property using **Story Protocol**, **AI semantic detection**, and **onchain disputes** — all inside a simple chat interface.

---

## 🚨 The Problem

Creativity spreads faster than ever — but so does theft.

- AI-generated content is copied, remixed, and resold without permission  
- Writers and designers have no visibility into where their work appears  
- Traditional copyright registration takes weeks  
- Enforcement is expensive, slow, and inaccessible  

There is **no autonomous system** that:
- Registers IP instantly  
- Monitors the internet continuously  
- Detects plagiarism semantically  
- Helps creators enforce rights without legal complexity  

---

## 💡 The Solution: IP Whisperer

IP Whisperer is a **self-operating AI agent** that protects creators’ IP in real time.

It allows creators to:
- Register IP on Story Protocol in under a minute  
- Store metadata immutably on IPFS  
- Attach programmable license terms  
- Monitor the web every 5 minutes  
- Receive real-time alerts  
- Enforce rights with one click  

No dashboards. No wallet UI. No blockchain knowledge required.

---

## 🛡️ Live On-Chain Proof (Registered IPs)

These IPs were **actually minted, licensed, and verified on Story Protocol (Aeneid testnet)** during the hackathon.

| IP | IP Asset ID | Transaction | Explorer |
|----|------------|------------|----------|
| IP-1 | `0x62ee7550dd83e3551A51b139783703B173B5D790` | `0xf69681cd8524e146d94a5b1060ab543db19ee47725da657d24d6867015853b0c` | [View](https://aeneid.explorer.story.foundation/ipa/0x62ee7550dd83e3551A51b139783703B173B5D790) |
| IP-2 | `0x400BD0297dFF0bE67350eb29842545EcB727deE2` | `0xfee42295c2e9766eb1e4b17cd302ff69615d13b2ceb89195d6924c4f813d7a3f` | [View](https://aeneid.explorer.story.foundation/ipa/0x400BD0297dFF0bE67350eb29842545EcB727deE2) |
| IP-3 | `0x36A09D10Bf0afed6373c4f4ba8d38046E4a02114` | `0x1f4200e9762e3ef5823d322edab9945268e41218cb27b20fb6534122babc51b6` | [View](https://aeneid.explorer.story.foundation/ipa/0x36A09D10Bf0afed6373c4f4ba8d38046E4a02114) |

---

## 🎤 Pitch Deck

📊 **Pitch Presentation:**  
https://docs.google.com/presentation/d/1_UexdIDCs9nhhBG__TOjrxj0CTa0UbV18oAin_K2ifk/edit

---

## 🎯 What It Does

- **Instant IP Registration**  
  Registers content as a programmable IP Asset on Story Protocol.

- **IPFS Metadata Storage**  
  Uploads metadata and NFT data to IPFS via Pinata.

- **Semantic AI Monitoring**  
  Scans Google and Twitter/X using AI similarity detection (TF-IDF + cosine similarity).

- **Real-Time Alerts**  
  Sends Telegram alerts when potential infringement is detected.

- **Automated Enforcement**  
  Generates enforcement messages and registers onchain disputes.

---

## ⚙️ How It Works

1. Creator types `/protect` in Telegram  
2. Bot collects IP details via chat  
3. Metadata is generated and uploaded to IPFS  
4. IP Asset is minted on Story Protocol with license terms  
5. Background scanners run every 5 minutes  
6. AI detects semantic matches  
7. Creator receives alerts  
8. One-click enforcement triggers AI + onchain dispute  

---

## 🧠 AI, Blockchain & Infra Stack

### Story Protocol
- IP registration  
- License attachment  
- Dispute creation  
- Ownership verification  

### AI Enforcement (ABV.dev + OpenAI)
- Enforcement messages generated via ABV-wrapped OpenAI calls  
- Full AI traceability (prompt, response, latency)  
- Fallback to OpenAI if ABV gateway fails  
- Qualifies for **GenAI IP Registration Challenge**

### IPFS (Pinata)
- Immutable metadata storage  
- NFT metadata hosting  

### Semantic Scanner
- Google Custom Search (primary)  
- Twitter/X API (secondary)  
- TF-IDF + cosine similarity detection  

### Crossmint (Architected)
- Wallet abstraction for email-based onboarding  
- Removes seed phrase complexity for Web2 creators  

### Goldsky (Planned)
- Index Story Protocol events  
- Fast querying of IPs, licenses, and disputes  
### Installation

```bash
cd ip-whisperer
npm install
```

### Configuration

1. Copy environment template:
```bash
cp .env.example .env
```

2. Fill in your `.env` file:
```env
# Telegram
TELEGRAM_BOT_TOKEN=your_bot_token

# Blockchain
WALLET_PRIVATE_KEY=your_wallet_private_key
STORY_RPC_URL=https://aeneid.storyrpc.io

# IPFS (Pinata)
PINATA_JWT=your_pinata_jwt

# AI & Search
OPENAI_API_KEY=sk-your_openai_key
GOOGLE_API_KEY=your_google_api_key
GOOGLE_SEARCH_ENGINE_ID=your_search_engine_id
TWITTER_BEARER_TOKEN=optional_twitter_token


# abv.dev specific (GenAI IP Registration Challenge)
ABV_API_KEY=sk
ABV_BASE_URL=https://app.abv.dev
ABV_REGION=us


# Crossmint (for wallet abstraction)
CROSSMINT_CLIENT_ID=your_crossmint_client_id_here
CROSSMINT_API_KEY=your_crossmint_api_key_here


```

3. Create logs directory:
```bash
mkdir -p logs
```

### Run the Bot

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

## 📱 Using the Bot

1. **Start a chat** with your bot on Telegram.
<img width="360" height="327" alt="swappy-20251212-153920" src="https://github.com/user-attachments/assets/7c77c0af-fe0e-4a67-b0c6-8605040d36d1" />

2. Type `/protect` to register new IP.
<img width="360" height="757" alt="swappy-20251212-154309" src="https://github.com/user-attachments/assets/02ca2b44-2a81-42a2-91c9-6bcfc1d84db3" />

3. Follow the prompts to describe your work.
   - **Note:** The bot now uploads your metadata to **IPFS** automatically!
<img width="361" height="755" alt="swappy-20251212-154342" src="https://github.com/user-attachments/assets/7bc5ec34-4c81-4538-93e2-5d6ce792a436" />
   
<img width="361" height="751" alt="swappy-20251212-154511" src="https://github.com/user-attachments/assets/8b8e1ca6-5835-44a7-99be-9cc0f8da4d5b" />

4. Bot registers it on Story Protocol, attaches **License Terms**, and starts monitoring.

<img width="361" height="759" alt="swappy-20251212-154402" src="https://github.com/user-attachments/assets/967805a1-b262-411f-8b4e-622130258c12" />

5. Get alerts when potential infringements are detected on **Google** or **Twitter**.

<img width="353" height="616" alt="swappy-20251212-154630" src="https://github.com/user-attachments/assets/7d361f44-7074-437d-b0da-3adc01a8b169" />


6. Use `/enforce` to take action.

<img width="359" height="757" alt="swappy-20251212-154655" src="https://github.com/user-attachments/assets/9942e17f-f7fc-486a-a457-46e631fa467d" />


### Commands

- `/protect` - Register and protect new IP asset
- `/status` - View all protected assets
- `/alerts` - Check pending infringement alerts
- `/enforce` - Generate enforcement message and create dispute
- `/help` - Show all commands

## 🏗️ Architecture
<img width="1169" height="638" alt="swappy-20251212-132052" src="https://github.com/user-attachments/assets/9e787203-ea8c-4e58-a22d-16139c4027e5" />



```
User (Telegram)
    ↓
Bot Interface (Telegraf.js)
    ↓
Agent Orchestrator
    ↓
    ├── Story Protocol SDK (IP Registration & Disputes)
    │     └── IPFS (Pinata) for Metadata
    ├── Scanner Module (Semantic Search)
    │     ├── Google Custom Search API (Primary)
    │     └── Twitter API (Secondary)
    └── Enforcement Engine (OpenAI + Disputes)
```

## 🧪 Testing

### Quick Test Commands

```bash
# Show all available tests
./show-tests.sh

# Quick blockchain connection test (~10 seconds)
npm run test:blockchain

# Run unit tests
npm test

# Full workflow demo (~30 seconds)
npm run test:demo

# Interactive test menu (recommended)
npm run test:interactive

# Run all tests
npm run test:all
```

### Test Documentation

- **📖 Full Testing Guide:** See `TESTING_GUIDE.md` for comprehensive documentation
- **🎯 Quick Reference:** See `TEST_QUICK_REF.md` for command cheat sheet
- **🎬 Demo Guide:** See `TESTING_DEMO.md` for demonstration instructions

### What Gets Tested

1. **Blockchain Connection** - Story Protocol RPC, wallet, SDK initialization
2. **Unit Tests** - Similarity algorithm, message generation, configuration
3. **Full Demo** - Complete IP registration and enforcement workflow
4. **Live Bot** - Telegram integration and user interactions

### Expected Results

All tests should pass with:
- ✅ Blockchain connection to Aeneid testnet
- ✅ Wallet loaded with 10 ETH (testnet)
- ✅ Story Protocol SDK initialized
- ✅ All modules available (ipAsset, license, dispute, royalty)

## 📦 Project Structure

```
ip-whisperer/
├── src/
│   ├── bot.js                 # Telegram bot interface
│   ├── config.js              # Configuration loader
│   ├── orchestrator.js        # Main agent logic
│   ├── modules/
│   │   ├── storyProtocol.js   # Blockchain integration (Story SDK)
│   │   ├── scanner.js         # Semantic scanning (Google/Twitter)
│   │   └── enforcement.js     # Message generation
│   └── utils/
│       ├── logger.js          # Winston logger
│       └── ipfs.js            # Pinata IPFS uploader
├── logs/                      # Log files
├── package.json
├── .env                       # Your secrets (not committed)
└── README.md
```

## 🎓 Hackathon Specific

### Story Protocol Integration
- Uses `@story-protocol/core-sdk` for IP registration.
- **IPFS Integration:** Automatically uploads IP and NFT metadata to IPFS via Pinata.
- **License Terms:** Attaches Commercial Remix terms to registered IPs.
- **Disputes:** Registers disputes as onchain assets.
- Testnet deployment ready (Aeneid).

### GenAI IP Registration Challenge
- OpenAI integration for enforcement message generation.
- Semantic similarity detection using TF-IDF.
- Multiple tone options (friendly, formal, vibe mode).

### Innovation Points
1. **Proactive Monitoring** - Background cron jobs scan every 5 minutes using Google & Twitter.
2. **Blockchain-AI Synergy** - Combines onchain IP with AI detection.
3. **UX Excellence** - Chat-based interface, no complicated dashboards.
4. **Practical Enforcement** - Generates ready-to-send DMs.

## 🔒 Security Notes

- Never commit `.env` file.
- Keep private keys secure.
- Use testnet for hackathon demos.
- API keys are validated on startup.

## 🚢 Deployment

### Vercel/Railway (Recommended)

```bash
# Build command
npm install

# Start command
npm start
```

Set environment variables in your hosting platform dashboard.

### Local with PM2

```bash
npm install -g pm2
pm2 start src/bot.js --name ip-whisperer
pm2 save
```

## 🐛 Troubleshooting

**Bot not responding?**
- Check `TELEGRAM_BOT_TOKEN` is correct.
- Verify bot is running: `ps aux | grep node`.

**Story Protocol errors?**
- Ensure wallet has testnet ETH.
- Check RPC URL is correct.
- Verify `PINATA_JWT` is valid for IPFS uploads.

**No scan results?**
- Check `GOOGLE_API_KEY` and `GOOGLE_SEARCH_ENGINE_ID`.
- Twitter scanning may be rate-limited (this is normal, Google is primary).
- Check similarity threshold in `.env`.

## 📈 Phase 2 Extensions (Optional)

- [x] Add TikTok scanning (Mock implementation)
- [x] Niche-specific content detection (Music, Art, Tech, etc.)
- [ ] Implement screenshot capture for evidence
- [ ] Dune Analytics dashboard
- [ ] Multi-chain support via Owlto
- [ ] World ID verification
- [ ] Ava Studio meme generation for "vibe mode"

## 🏆 Judging Criteria Alignment

- ✅ **Innovation**: Semantic AI + blockchain enforcement
- ✅ **Practicality**: Solves real creator problem
- ✅ **UX**: Conversational, mobile-first
- ✅ **Technical Quality**: Modular, well-documented
- ✅ **Story Protocol Integration**: Full SDK usage with IPFS & Licensing
- ✅ **Demo Quality**: Live bot, <10s response time

## 📄 License

MIT

## 🤝 Contributing

This is a hackathon project! Feel free to fork and extend.

---

**Built for Story Protocol Buildathon 2025**
#StoryBuildathon #IPWhisperer #ProtectTheVibes
