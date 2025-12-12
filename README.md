# 🤫 IP Whisperer: Chatty Alert Agent for Viral Infringement Sniffing

**Track:** IP Detection & Enforcement | **Buildathon:** Surreal World Assets (Story Protocol)

An AI-powered Telegram bot that protects your creative IP by registering it on Story Protocol blockchain and monitoring social media for infringements.

## 🎯 What It Does

1. **Register IP** - One-click registration on Story Protocol
2. **Semantic Scanning** - Monitors Twitter/X for viral clones using AI similarity detection
3. **Auto-Enforcement** - Generates friendly DMs and registers disputes onchain
4. **Real-Time Alerts** - Get notified when your IP is used without permission

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Telegram account
- Story Protocol testnet wallet
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
TELEGRAM_BOT_TOKEN=your_bot_token_from_@BotFather
WALLET_PRIVATE_KEY=your_wallet_private_key
OPENAI_API_KEY=sk-your_openai_key
STORY_RPC_URL=https://testnet.storyrpc.io
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

1. **Start a chat** with your bot on Telegram
2. Type `/protect` to register new IP
3. Follow the prompts to describe your work
4. Bot registers it on Story Protocol and starts monitoring
5. Get alerts when potential infringements are detected
6. Use `/enforce` to take action

### Commands

- `/protect` - Register and protect new IP asset
- `/status` - View all protected assets
- `/alerts` - Check pending infringement alerts
- `/enforce` - Generate enforcement message and create dispute
- `/help` - Show all commands

## 🏗️ Architecture

```
User (Telegram)
    ↓
Bot Interface (Telegraf.js)
    ↓
Agent Orchestrator
    ↓
    ├── Story Protocol SDK (IP Registration)
    ├── Scanner Module (Semantic Search)
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
│   │   ├── storyProtocol.js   # Blockchain integration
│   │   ├── scanner.js         # Semantic scanning
│   │   └── enforcement.js     # Message generation
│   └── utils/
│       └── logger.js          # Winston logger
├── logs/                      # Log files
├── package.json
├── .env                       # Your secrets (not committed)
└── README.md
```

## 🎓 Hackathon Specific

### Story Protocol Integration
- Uses `@story-protocol/core-sdk` for IP registration
- Registers disputes as onchain assets
- Testnet deployment ready

### GenAI IP Registration Challenge
- OpenAI integration for enforcement message generation
- Semantic similarity detection using TF-IDF
- Multiple tone options (friendly, formal, vibe mode)

### Innovation Points
1. **Proactive Monitoring** - Background cron jobs scan every 5 minutes
2. **Blockchain-AI Synergy** - Combines onchain IP with AI detection
3. **UX Excellence** - Chat-based interface, no complicated dashboards
4. **Practical Enforcement** - Generates ready-to-send DMs

## 🔒 Security Notes

- Never commit `.env` file
- Keep private keys secure
- Use testnet for hackathon demos
- API keys are validated on startup

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
- Check `TELEGRAM_BOT_TOKEN` is correct
- Verify bot is running: `ps aux | grep node`

**Story Protocol errors?**
- Ensure wallet has testnet ETH
- Check RPC URL is correct
- Verify network connectivity

**No scan results?**
- Twitter API not configured? Uses mock data by default
- Check similarity threshold in `.env`

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
- ✅ **Story Protocol Integration**: Full SDK usage
- ✅ **Demo Quality**: Live bot, <10s response time

## 📄 License

MIT

## 🤝 Contributing

This is a hackathon project! Feel free to fork and extend.

---

**Built for Story Protocol Buildathon 2025**
#StoryBuildathon #IPWhisperer #ProtectTheVibes
