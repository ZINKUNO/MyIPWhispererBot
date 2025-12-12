# Google Custom Search API Setup Guide

## 🎯 Why Google Search?

**Problem with Twitter API:**
- Strict rate limits (450 requests per 15 minutes)
- Hits limits very quickly
- Requires waiting periods

**Google Custom Search API:**
- ✅ **100 searches per day FREE**
- ✅ No rate limiting issues  
- ✅ Searches the ENTIRE web (not just Twitter)
- ✅ Finds content on blogs, forums, YouTube, etc.
- ✅ More comprehensive IP violation detection

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Google API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project (or select existing)
3. Click "Create Credentials" → "API Key"
4. Copy the API key
5. **Enable** the "Custom Search API":
   - Go to [API Library](https://console.cloud.google.com/apis/library)
   - Search for "Custom Search API"
   - Click "Enable"

### Step 2: Create Custom Search Engine

1. Go to [Programmable Search Engine](https://programmablesearchengine.google.com/)
2. Click "Add"  or "Create Search Engine"
3. **Configure:**
   - **Sites to search**: Leave empty or add `*` to search entire web
   - **Name**: "IP Whisperer Scanner"
   - **Language**: English
4. Click "Create"
5. On the overview page, find **Search engine ID** (looks like: `a1b2c3d4e5f6g7h8i`)
6. Copy this ID

### Step 3: Update .env File

```bash
# Google Custom Search API (Primary scanner - no rate limits!)
GOOGLE_API_KEY=AIzaSyC-1A2B3C4D5E6F7G8H9I0J1K2L3M4N5O  # Your actual API key
GOOGLE_SEARCH_ENGINE_ID=a1b2c3d4e5f6g7h8i             # Your search engine ID
```

### Step 4: Test It!

```bash
node scripts/demo.js
```

You should see:
```
🔍 Scanning Google for infringements...
✅ Google scan complete: X potential matches found
```

## 📊 How It Works

### Current Scan Priorities:
1. **Primary**: Google Custom Search (100/day limit)
2. **Secondary**: Twitter (if Google finds nothing OR you have quota)
3. **Disabled**: TikTok (no public API)

### What Google Searches:
- Entire web including:
  - Social media platforms (Twitter, Facebook, LinkedIn)
  - Blogs and articles
  - Forums (Reddit, Quora, etc.)
  - Video platforms (YouTube, Vimeo)
  - E-commerce sites
  - News sites

### Search Query Format:
```
"Your IP Name" First 50 characters of description
```

Example:
```
"Sigma Music Remix" Epic electronic music remix with heavy bass
```

## 💡 Tips & Best Practices

### For Better Results:

1. **Use Specific IP Names**
   - Good: "Midnight Synthwave Track 2025"
   - Bad: "My Song"

2. **Detailed Descriptions**
   - Include unique phrases from your content
   - Add specific keywords

3. **Monitor Regularly**
   - Google quota: 100 searches/day
   - Schedule scans every 5-10 minutes
   - **Daily capacity**: ~288 scans (if 5min intervals)

### Quota Management:

**Free Tier:**
- 100 searches per day
- Resets at midnight Pacific Time
- $5 per 1,000 additional queries if you exceed

**With Background Scanning:**
- Every 5 minutes = 288 scans/day
- Set to 15 minutes = 96 scans/day ✅ (stays in free tier)

Update in `.env`:
```bash
SCAN_INTERVAL_MINUTES=15  # Ensures we stay under 100/day
```

## 🔧 Troubleshooting

### "Google Search API not configured"
**Solution**: Make sure both `GOOGLE_API_KEY` and `GOOGLE_SEARCH_ENGINE_ID` are set in `.env`

### "API key not valid"
**Solutions**:
1. Check API key is correct (no spaces)
2. Verify Custom Search API is enabled in Google Cloud Console
3. Try creating a new API key

### "Daily limit exceeded"
**Solutions**:
1. Wait until midnight PT for quota reset
2. Increase `SCAN_INTERVAL_MINUTES` in `.env`
3. Consider paid plan ($5 per 1,000 queries)

### "No results found"
This is normal! It means:
- ✅ API is working
- ✅ No violations detected (good for your IP!)
- Try searching for content you KNOW exists online

## 🆚 Comparison: Google vs Twitter

| Feature | Google Custom Search | Twitter API |
|---------|---------------------|-------------|
| **Rate Limit** | 100/day | 450/15min |
| **Coverage** | Entire web | Twitter only |
| **Cost** | Free (100/day) | Free |
| **Easy Setup** | Yes | Yes |
| **Reliability** | ⭐⭐⭐⭐⭐ | ⭐⭐ (rate limits) |
| **Best For** | Comprehensive scanning | Real-time Twitter monitoring |

## ✅ Recommended Configuration

```bash
# .env file
GOOGLE_API_KEY=<your_key>              # Primary scanner
GOOGLE_SEARCH_ENGINE_ID=<your_id>     # Required for Google
TWITTER_BEARER_TOKEN=<your_token>     # Optional secondary
SCAN_INTERVAL_MINUTES=15               # Stays under daily limit
```

## 🎓 Next Steps

1. **Set up Google API** (follow steps above)
2. **Run demo**: `node scripts/demo.js`
3. **Start bot**: `npm start`
4. **Monitor logs**: Check for "Google scan complete"

---

## 🔗 Resources

- [Get Google API Key](https://console.cloud.google.com/apis/credentials)
- [Create Search Engine](https://programmablesearchengine.google.com/)
- [Custom Search API Docs](https://developers.google.com/custom-search/v1/overview)
- [Pricing Info](https://developers.google.com/custom-search/v1/overview#pricing)

---

**Ready to use Google Search for IP protection! 🚀**

No more rate limit issues!
