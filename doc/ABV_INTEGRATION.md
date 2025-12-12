# 🚀 ABV Integration Guide - IP Whisperer

## What is ABV?

ABV is a **GenAI platform** that provides:
- **Unified API gateway** for multiple AI providers
- **Automatic tracing** with OpenTelemetry
- **Observability** for your AI calls
- **Cost tracking** and analytics

**For this hackathon:** Using ABV qualifies you for the **GenAI IP Registration Challenge** prize!

---

## 🎯 Why ABV for IP Whisperer?

1. **Traceability** - Every AI-generated enforcement message is traced
2. **Reliability** - Automatic fallback between providers
3. **Analytics** - See which message tones work best
4. **Compliance** - Audit trail for IP enforcement actions

---

## ✅ Integration Status

**Your project now includes:**

- ✅ ABV Client SDK installed
- ✅ OpenTelemetry instrumentation configured
- ✅ Enforcement module updated (ABV primary, OpenAI fallback)
- ✅ Environment variables configured
- ✅ Automatic tracing enabled

---

## 🔑 Your ABV Credentials

```bash
ABV_API_KEY=sk-abv-8dd68244-2684-4ef0-a313-2e7f7395130d
ABV_BASE_URL=https://app.abv.dev
ABV_REGION=us
```

**These are already in your `.env.example` file!**

---

## 📊 How It Works

### Before (Direct OpenAI):
```
User → Bot → OpenAI → Response → User
```

### After (With ABV):
```
User → Bot → ABV Gateway → OpenAI → Response → User
                    ↓
            Telemetry/Logs → ABV Dashboard
```

**Benefits:**
- Same API, same responses
- **Plus:** Automatic tracing, monitoring, analytics
- **Plus:** Easier debugging during hackathon

---

## 🎬 ABV in Action

When you run the bot, you'll see:

```bash
npm start

# Output:
✅ ABV client initialized (GenAI Challenge mode)
✅ ABV tracing initialized
🤖 Starting bot...
✅ Bot running!
```

When generating messages:

```bash
# In logs:
✍️  Generating enforcement message... {tone: 'friendly', provider: 'ABV'}
🚀 Using ABV gateway (GenAI Challenge mode)
✅ Enforcement message generated via ABV
```

---

## 📈 View Your Traces

1. Go to: https://app.abv.dev
2. Login with your account
3. See **every AI call**:
   - Prompt sent
   - Response received
   - Latency
   - Cost
   - Token usage

**Perfect for your demo!** Show judges real-time AI tracing.

---

## 🧪 Testing ABV Integration

### Quick Test:

```bash
# Start the bot
npm start

# In Telegram:
/protect Test IP
# ... (follow prompts)

# Trigger enforcement
/enforce
# Click "Friendly" tone

# Check logs - you should see:
# ✅ Enforcement message generated via ABV
```

### Demo Script:

```bash
node scripts/demo.js

# Watch for:
# ✅ ABV client initialized
# 🚀 Using ABV gateway
# ✅ Message generated via ABV
```

---

## 🔄 Fallback Behavior

**ABV is PRIMARY, OpenAI is FALLBACK:**

1. Try ABV gateway first
2. If ABV fails → automatically use direct OpenAI
3. If OpenAI fails → use template message

**This means:** Your bot always works, even if ABV has issues!

---

## 🏆 Hackathon Advantage

### Judging Points:

**Innovation:**
- "We use ABV for unified AI gateway with automatic tracing"
- "Every enforcement action is traceable on-chain AND in telemetry"

**Technical Quality:**
- "OpenTelemetry integration for observability"
- "Multi-provider fallback strategy"

**Demo:**
- Open ABV dashboard during presentation
- Show real-time traces as you trigger enforcement
- "See? Every AI decision is logged and traceable!"

---

## 📝 Code Changes Summary

### What Was Changed:

**1. `src/config.js`:**
- Added ABV configuration (apiKey, baseUrl, region)

**2. `src/instrumentation.js`:** (NEW FILE)
- OpenTelemetry setup with ABV span processor
- Automatic trace export on every AI call

**3. `src/modules/enforcement.js`:**
- Added ABVClient initialization
- Updated `generateEnforcementMessage()` to use ABV first
- Graceful fallback to OpenAI if ABV unavailable

**4. `.env.example`:**
- Added ABV credentials

**5. `package.json`:**
- Added dependencies:
  - `@abvdev/client`
  - `@abvdev/tracing`
  - `@abvdev/otel`
  - `@opentelemetry/sdk-node`

---

## 🔧 Configuration Options

### In `.env`:

```bash
# Required for ABV
ABV_API_KEY=sk-abv-...
ABV_BASE_URL=https://app.abv.dev
ABV_REGION=us

# Optional: Disable ABV (use OpenAI only)
# Just comment out ABV_API_KEY:
# ABV_API_KEY=

# Required for fallback
OPENAI_API_KEY=sk-...
```

---

## 🐛 Troubleshooting

### "ABV client not initialized"

**Cause:** ABV_API_KEY not set  
**Fix:** Copy your key to `.env`

```bash
echo "ABV_API_KEY=sk-abv-8dd68244-2684-4ef0-a313-2e7f7395130d" >> .env
```

### "ABV generation failed, falling back"

**Cause:** Network issue or API limit  
**Effect:** Automatically uses OpenAI (no user impact!)  
**Action:** Check logs, but bot still works

### Traces not appearing in dashboard

**Cause:** Instrumentation not loaded  
**Fix:** Ensure you have:

```javascript
// At TOP of bot.js (optional, already handled in enforcement.js)
import './instrumentation.js';
```

---

## 📊 ABV Dashboard Features

**What you can see:**

1. **Traces** - Every AI call timestamped
2. **Prompts** - Exact system + user messages sent
3. **Responses** - Full AI responses
4. **Metrics**:
   - Latency (ms)
   - Tokens used
   - Cost per call
   - Success/failure rates

**For demo:**
- Show before/after enforcement messages
- Display tone variations side-by-side
- Prove AI quality with metrics

---

## 🎯 Best Practices

### During Development:
- Keep both ABV and OpenAI keys configured
- Test with ABV, ensure OpenAI fallback works
- Check dashboard to verify traces

### During Demo:
- Open ABV dashboard in browser tab
- Trigger enforcement during presentation
- **Refresh dashboard** to show new traces
- "Here's the AI call in real-time!"

### For Submission:
- Mention ABV in README
- Screenshot dashboard traces
- Highlight in pitch: "Full AI observability"

---

## 📈 Prize Alignment

**GenAI IP Registration Challenge Requirements:**

✅ **Use GenAI platform** → ABV.dev  
✅ **Register IP** → Story Protocol  
✅ **AI-generated content** → Enforcement messages  
✅ **Traceability** → OpenTelemetry traces  
✅ **Innovation** → Semantic + AI enforcement  

**You now check ALL boxes!**

---

## 🚀 Next Steps

1. **Ensure your `.env` has the ABV key** (check it!)
2. **Run the bot:** `npm start`
3. **Verify logs** show "ABV client initialized"
4. **Test enforcement** with `/protect` → `/enforce`
5. **Check ABV dashboard** at https://app.abv.dev
6. **Practice demo** showing both Telegram + Dashboard

---

## 📞 Support

**ABV Issues:**
- Docs: https://docs.abv.dev
- Dashboard: https://app.abv.dev

**Integration Questions:**
- Check error logs in `logs/combined.log`
- Fallback will handle API failures automatically

---

## ✨ Summary

**You just integrated:**
- ✅ GenAI IP Registration Challenge sponsor (ABV)
- ✅ Automatic AI tracing with OpenTelemetry
- ✅ Multi-provider fallback strategy
- ✅ Real-time observability dashboard
- ✅ Prize qualification boost! 🏆

**Your IP Whisperer is now even more impressive!**

---

**Ready?** → `npm start` and watch the ABV magic! 🚀

#StoryBuildathon #ABVIntegration #GenAIChallenge
