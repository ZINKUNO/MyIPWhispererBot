# 🧪 IP Whisperer Testing Guide

This guide explains how to test the IP Whisperer bot and demonstrates all its features.

## 📋 Table of Contents

1. [Quick Test Overview](#quick-test-overview)
2. [Available Tests](#available-tests)
3. [How to Run Tests](#how-to-run-tests)
4. [Testing with Telegram](#testing-with-telegram)
5. [Demo Scenarios](#demo-scenarios)

---

## 🚀 Quick Test Overview

IP Whisperer has multiple testing options:

| Test Type | Command | Purpose |
|-----------|---------|---------|
| **Blockchain Connection** | `node scripts/test-blockchain.js` | Verify Story Protocol connection |
| **Unit Tests** | `npm test` | Run Jest test suite |
| **Full Demo** | `node scripts/demo.js` | Simulate complete workflow |
| **Live Bot** | `npm start` | Run the Telegram bot |

---

## 🧪 Available Tests

### 1. **Blockchain Connection Test** ✅
**File:** `scripts/test-blockchain.js`

Tests the connection to Story Protocol blockchain:
- ✅ RPC connection to Aeneid testnet
- ✅ Wallet account setup
- ✅ Story Protocol SDK initialization
- ✅ SDK modules availability

**Run:**
```bash
node scripts/test-blockchain.js
```

**Expected Output:**
```
🔗 Testing Story Protocol Blockchain Connection
============================================================

1️⃣ Testing RPC Connection...
   RPC URL: https://aeneid.storyrpc.io
   ✅ Connected! Current block: 12069591

2️⃣ Testing Account Setup...
   ✅ Account loaded: 0xAd0799D4D6564c945C448D8BcFA890c41e111A98
   Balance: 10000000000000000000 wei (10 ETH)

3️⃣ Testing Story Protocol SDK...
   ✅ Story Protocol SDK initialized successfully!

4️⃣ Testing SDK Methods...
   Available modules:
   - ipAsset: object
   - license: object
   - dispute: object
   - royalty: object

============================================================
✅ ALL TESTS PASSED!
🎉 Real blockchain connection is working!
```

---

### 2. **Unit Tests** 🧩
**File:** `tests/core.test.js`

Tests core functionality:
- ✅ Similarity calculation
- ✅ Enforcement message generation
- ✅ Configuration loading

**Run:**
```bash
npm test
```

**What it tests:**
- Text similarity algorithm (identical vs different text)
- Template message generation
- Environment configuration

---

### 3. **Full Demo** 🎬
**File:** `scripts/demo.js`

Simulates the complete IP protection workflow:
1. Initialize Story Protocol
2. Register a test IP asset
3. Scan for infringements
4. Generate enforcement messages (friendly & vibe tones)
5. Create onchain dispute

**Run:**
```bash
node scripts/demo.js
```

**Expected Flow:**
```
🎬 IP Whisperer Demo

1️⃣ Initializing Story Protocol...
   ✅ Story Protocol client initialized

2️⃣ Registering test IP asset...
   ✅ IP registered: 0xMOCK_IP_1733835617000

3️⃣ Scanning for infringements...
   ✅ Found 2 potential matches (Twitter & TikTok)

4️⃣ Generating enforcement messages...

📝 Friendly Tone:
Hey! We noticed your post about "Sigma Music Remix"...

📝 Vibe Tone:
Yo! Caught your post about "Sigma Music Remix"...

5️⃣ Creating onchain dispute...
   ✅ Dispute created: 0xMOCK_DISPUTE_1733835617001

🎉 Demo complete!
```

---

## 🤖 Testing with Telegram

### Setup
1. Make sure your bot is running:
   ```bash
   npm start
   ```

2. Open Telegram and find your bot (search for the bot username)

3. Start a conversation with `/start`

### Available Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/start` | Initialize the bot | `/start` |
| `/help` | Show all commands | `/help` |
| `/register` | Register new IP asset | `/register` |
| `/scan` | Scan for infringements | `/scan` |
| `/status` | Check bot status | `/status` |
| `/list` | List your IP assets | `/list` |

### Test Scenario 1: Register IP Asset

1. Send `/register` to the bot
2. Follow the prompts:
   - **Name:** "My Awesome Song"
   - **Description:** "Epic electronic music with heavy bass"
   - **Media URL:** "https://example.com/song.mp3"
   - **Keywords:** "music, electronic, bass"

3. Bot will respond with:
   ```
   ✅ IP Asset Registered!
   
   📝 Details:
   Name: My Awesome Song
   IP ID: 0x...
   Transaction: 0x...
   
   🔍 Monitoring started! I'll scan for infringements every 5 minutes.
   ```

### Test Scenario 2: Manual Scan

1. Send `/scan` to the bot
2. Bot will:
   - Search Twitter/X for similar content
   - Calculate similarity scores
   - Report any matches above threshold

3. If infringement found:
   ```
   🚨 Potential Infringement Detected!
   
   Platform: Twitter
   URL: https://x.com/user/status/123
   Similarity: 87%
   Engagement: 1,234 views
   
   Choose enforcement tone:
   [Friendly] [Vibe] [Legal]
   ```

### Test Scenario 3: Enforcement

1. After infringement detected, choose a tone
2. Bot generates personalized message
3. You can:
   - ✅ Approve and send
   - ✏️ Edit message
   - 🚫 Skip this violation

---

## 🎯 Demo Scenarios

### Scenario A: Quick Blockchain Test
**Time:** ~10 seconds

```bash
# Test blockchain connection only
node scripts/test-blockchain.js
```

**Purpose:** Verify Story Protocol is accessible

---

### Scenario B: Full Feature Demo
**Time:** ~30 seconds

```bash
# Run complete workflow simulation
node scripts/demo.js
```

**Purpose:** See all features in action (mock mode)

---

### Scenario C: Live Bot Testing
**Time:** Ongoing

```bash
# Start the bot
npm start

# In another terminal, check logs
tail -f logs/combined.log
```

**Purpose:** Test real Telegram interactions

---

## 📊 What Each Test Actually Does

### `test-blockchain.js`
```javascript
✅ Connects to Story Protocol RPC
✅ Loads your wallet
✅ Checks balance
✅ Initializes StoryClient
✅ Verifies SDK modules
```

### `npm test` (Jest)
```javascript
✅ Tests similarity algorithm
   - Identical text → >90% similarity
   - Different text → <30% similarity
✅ Tests message generation
   - Template contains IP name
   - Template contains IP ID
✅ Tests configuration
   - Loads environment variables
   - Validates settings
```

### `demo.js`
```javascript
✅ Initializes Story Protocol client
✅ Registers mock IP asset
✅ Scans for infringements (mock data)
✅ Generates enforcement messages
✅ Creates onchain dispute
```

### `npm start` (Live Bot)
```javascript
✅ Starts Telegram bot
✅ Connects to Story Protocol
✅ Initializes ABV GenAI client
✅ Starts background scanning
✅ Listens for user commands
```

---

## 🔍 Monitoring Tests

### View Logs
```bash
# Real-time logs
tail -f logs/combined.log

# Error logs only
tail -f logs/error.log
```

### Check Bot Status
```bash
# See if bot is running
ps aux | grep "node src/bot.js"

# Check network connections
netstat -an | grep 443  # HTTPS connections
```

---

## 🐛 Troubleshooting

### Test Fails: "ChainId undefined"
**Solution:** Already fixed! Make sure you have the latest code.

### Test Fails: "RPC timeout"
**Possible causes:**
- Network connectivity issue
- Story Protocol RPC is down
- Firewall blocking connection

**Check:**
```bash
curl -X POST https://aeneid.storyrpc.io \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}'
```

### Bot Not Responding
**Check:**
1. Is bot running? `ps aux | grep bot.js`
2. Check logs: `tail logs/error.log`
3. Verify Telegram token in `.env`

---

## 📈 Success Criteria

### ✅ All Tests Pass When:

1. **Blockchain Test:**
   - Connects to RPC
   - Shows current block number
   - Displays wallet address
   - Initializes SDK successfully

2. **Unit Tests:**
   - All Jest tests pass
   - No errors in console

3. **Demo:**
   - Completes all 5 steps
   - Shows mock IP ID
   - Generates messages
   - Creates dispute

4. **Live Bot:**
   - Responds to `/start`
   - Accepts `/register` command
   - Scans for infringements
   - Generates enforcement messages

---

## 🎓 Next Steps

After testing:

1. **Register Real IP:** Use `/register` with actual content
2. **Monitor:** Let bot scan automatically
3. **Respond:** Handle real infringements
4. **Analyze:** Check dispute history on [Story Explorer](https://aeneid.explorer.story.foundation)

---

## 📞 Support

- **Discord:** [Story Protocol Discord](https://discord.gg/storybuilders)
- **Docs:** [Story Documentation](https://docs.story.foundation)
- **Explorer:** [Aeneid Explorer](https://aeneid.explorer.story.foundation)

---

**Happy Testing! 🚀**
