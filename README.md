<img width="445" height="366" alt="image" src="https://github.com/user-attachments/assets/55152bb7-91fe-47af-948d-25e6042b3145" />

# 🤫 IP Whisperer: Chatty Alert Agent for Viral Infringement Sniffing

**Track:** IP Detection & Enforcement | **Buildathon:** Surreal World Assets (Story Protocol)

An AI-powered Telegram bot that protects your creative IP by registering it on Story Protocol blockchain and monitoring social media for infringements.

## 🎯 What It Does

1. **Register IP** - One-click registration on Story Protocol with **IPFS metadata** and **Commercial License Terms**.
2. **Semantic Scanning** - Monitors **Google** and **Twitter/X** for viral clones using AI similarity detection.
3. **Auto-Enforcement** - Generates friendly DMs and registers disputes onchain.
4. **Real-Time Alerts** - Get notified when your IP is used without permission.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Telegram account
- Story Protocol testnet wallet (Aeneid)
- **Pinata Account** (for IPFS uploads)
- **Google Custom Search API Key** (for scanning)
- OpenAI API key

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

4. Bot registers it on Story Protocol, attaches **License Terms**, and starts monitoring.

5. Get alerts when potential infringements are detected on **Google** or **Twitter**.


6. Use `/enforce` to take action.


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
