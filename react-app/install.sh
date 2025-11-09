#!/bin/bash

echo "🚀 Installing Process Discovery Report App..."
echo ""

cd "$(dirname "$0")"

echo "📦 Attempting to install dependencies..."
echo ""

# Try normal install first
if npm install 2>/dev/null; then
    echo "✅ Dependencies installed successfully!"
else
    echo "⚠️  Normal install failed, trying with --legacy-peer-deps..."
    if npm install --legacy-peer-deps 2>/dev/null; then
        echo "✅ Dependencies installed with --legacy-peer-deps!"
    else
        echo "⚠️  Still failed, trying with --force..."
        if npm install --force 2>/dev/null; then
            echo "✅ Dependencies installed with --force!"
        else
            echo "❌ Installation failed. Please check your npm configuration."
            echo ""
            echo "Try manually:"
            echo "  npm login"
            echo "  npm install"
            exit 1
        fi
    fi
fi

echo ""
echo "✨ Installation complete!"
echo ""
echo "🏃 To start the app, run:"
echo "  npm run dev"
echo ""
echo "The app will open at http://localhost:3000"
echo ""

