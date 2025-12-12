# 🎯 Quick Test Reference Card

## 🚀 Quick Commands

```bash
# Interactive Test Menu (RECOMMENDED)
npm run test:interactive

# Individual Tests
npm run test:blockchain    # Test Story Protocol connection
npm test                   # Run Jest unit tests  
npm run test:demo          # Full workflow demo
npm run test:all           # Run all tests

# Start Bot
npm start                  # Start Telegram bot
```

---

## 📊 What Each Test Shows

### 1. Blockchain Test (`npm run test:blockchain`)
```
✅ RPC Connection
✅ Wallet Address: 0xAd0799D4D6564c945C448D8BcFA890c41e111A98
✅ Balance: 10 ETH
✅ SDK Initialized
✅ Modules: ipAsset, license, dispute, royalty
```

### 2. Unit Tests (`npm test`)
```
✅ Similarity Calculation
   - Identical text: >90% match
   - Different text: <30% match
✅ Message Generation
✅ Configuration Loading
```

### 3. Demo (`npm run test:demo`)
```
1️⃣ Initialize Story Protocol
2️⃣ Register IP: "Sigma Music Remix"
3️⃣ Scan for infringements
4️⃣ Generate enforcement messages
5️⃣ Create onchain dispute
```

---

## 🤖 Testing with Telegram

1. **Start bot:** `npm start`
2. **Open Telegram** and search for your bot
3. **Send:** `/start`
4. **Try commands:**
   - `/register` - Register new IP
   - `/scan` - Scan for infringements
   - `/status` - Check bot status
   - `/list` - List your IPs

---

## 📁 Test Files

| File | Purpose |
|------|---------|
| `scripts/test-blockchain.js` | Blockchain connection test |
| `scripts/demo.js` | Full workflow demo |
| `scripts/test-interactive.js` | Interactive menu |
| `tests/core.test.js` | Jest unit tests |

---

## 🎬 Live Demo Flow

```
User: /register
Bot: "Let's register your IP! What's the name?"

User: "My Awesome Song"
Bot: "Great! Now describe it..."

User: "Epic electronic music"
Bot: ✅ IP registered! IP ID: 0x...

[5 minutes later]
Bot: 🚨 Potential infringement detected!
     Platform: Twitter
     Similarity: 87%
     Choose tone: [Friendly] [Vibe] [Legal]

User: [Clicks Friendly]
Bot: 📝 Here's your message:
     "Hey! We noticed your post..."
     [Approve] [Edit] [Skip]

User: [Clicks Approve]
Bot: ✅ Message sent!
     🔗 Dispute created on-chain
```

---

## 🔍 Monitoring

```bash
# Watch logs in real-time
tail -f logs/combined.log

# Check errors only
tail -f logs/error.log

# Check if bot is running
ps aux | grep "node src/bot.js"
```

---

## ✅ Success Indicators

- **Blockchain Test:** Shows block number and wallet address
- **Unit Tests:** All tests pass (green checkmarks)
- **Demo:** Completes all 5 steps without errors
- **Live Bot:** Responds to `/start` command

---

## 🎓 For Judges/Reviewers

**Quick Demo (2 minutes):**
```bash
# 1. Test blockchain connection
npm run test:blockchain

# 2. Run full demo
npm run test:demo
```

**Full Demo (5 minutes):**
```bash
# Interactive menu with all options
npm run test:interactive
```

**Live Bot Demo:**
```bash
# Start the bot
npm start

# Then use Telegram to interact
```

---

## 📸 Expected Output Screenshots

### Blockchain Test
```
🔗 Testing Story Protocol Blockchain Connection
============================================================
1️⃣ Testing RPC Connection...
   ✅ Connected! Current block: 12069591
2️⃣ Testing Account Setup...
   ✅ Account loaded: 0xAd0799D4D6564c945C448D8BcFA890c41e111A98
3️⃣ Testing Story Protocol SDK...
   ✅ Story Protocol SDK initialized successfully!
============================================================
✅ ALL TESTS PASSED!
```

### Demo Output
```
🎬 IP Whisperer Demo
1️⃣ Initializing Story Protocol...
   ✅ Story Protocol client initialized
2️⃣ Registering test IP asset...
   ✅ IP registered: 0xMOCK_IP_1733835617000
3️⃣ Scanning for infringements...
   ✅ Found 2 potential matches
4️⃣ Generating enforcement messages...
   📝 Friendly Tone: [message]
   📝 Vibe Tone: [message]
5️⃣ Creating onchain dispute...
   ✅ Dispute created: 0xMOCK_DISPUTE_1733835617001
🎉 Demo complete!
```

---

**Need help?** Check `TESTING_GUIDE.md` for detailed documentation.
