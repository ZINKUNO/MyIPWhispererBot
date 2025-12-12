#!/bin/bash

# IP Whisperer - Quick Start Script
# This script helps you get up and running in minutes

set -e  # Exit on error

echo "🤫 IP Whisperer Quick Start"
echo "============================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "⚠️  Node.js version 18+ required (you have: $(node -v))"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Setting up environment..."
    echo ""
    
    if [ -f .env.example ]; then
        cp .env.example .env
        echo "✅ Created .env file from template"
        echo ""
        echo "⚠️  IMPORTANT: Edit .env and add your API keys:"
        echo "   - TELEGRAM_BOT_TOKEN (from @BotFather)"
        echo "   - WALLET_PRIVATE_KEY (your testnet wallet)"
        echo "   - OPENAI_API_KEY (from OpenAI)"
        echo ""
        read -p "Press Enter when you've filled in .env..." DUMMY
    else
        echo "❌ .env.example not found!"
        exit 1
    fi
else
    echo "✅ .env file exists"
fi

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install --silent

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed"
else
    echo "❌ Installation failed"
    exit 1
fi

# Create logs directory
mkdir -p logs
echo "✅ Created logs directory"

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Make sure your .env file is configured"
echo "2. Run: npm start"
echo "3. Open Telegram and chat with your bot"
echo ""
echo "Commands:"
echo "  npm start     - Start the bot"
echo "  npm run dev   - Start with auto-reload"
echo "  npm test      - Run tests"
echo ""
echo "Need help? Check README.md or IMPLEMENTATION_GUIDE.md"
echo ""
