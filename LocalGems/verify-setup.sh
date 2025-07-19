#!/bin/bash

echo "🗺️  Local Gems - Setup Verification"
echo "=================================="
echo

# Check Node.js version
echo "📦 Node.js Version:"
node --version
echo

# Check npm version
echo "📦 npm Version:"
npm --version
echo

# Check if we're in the right directory
echo "📁 Current Directory:"
pwd
echo

# Check if package.json exists
if [ -f "package.json" ]; then
    echo "✅ package.json found"
else
    echo "❌ package.json not found"
fi

# Check if node_modules exists
if [ -d "node_modules" ]; then
    echo "✅ node_modules directory found"
else
    echo "❌ node_modules directory not found"
fi

# Check if src directory exists
if [ -d "src" ]; then
    echo "✅ src directory found"
else
    echo "❌ src directory not found"
fi

echo

# Check TypeScript compilation
echo "🔍 TypeScript Check:"
if npx tsc --noEmit --skipLibCheck 2>/dev/null; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation errors found"
fi

echo

# Check key files
echo "📋 Key Files Status:"
key_files=(
    "src/types/index.ts"
    "src/services/firebase.ts"
    "src/context/AuthContext.tsx"
    "App.tsx"
    "TestApp.tsx"
    "metro.config.js"
    "tsconfig.json"
)

for file in "${key_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file"
    fi
done

echo
echo "🚀 Setup Status:"
echo "==============="

# Count core files
core_files_count=0
for file in "${key_files[@]}"; do
    if [ -f "$file" ]; then
        ((core_files_count++))
    fi
done

if [ $core_files_count -eq ${#key_files[@]} ]; then
    echo "✅ All core files present ($core_files_count/${#key_files[@]})"
else
    echo "⚠️  Some core files missing ($core_files_count/${#key_files[@]})"
fi

if [ -d "node_modules" ] && [ -f "package.json" ]; then
    echo "✅ Dependencies installed"
else
    echo "❌ Dependencies not installed"
fi

echo
echo "🏁 Next Steps:"
echo "============="
echo "1. Start Metro bundler: npm start"
echo "2. Set up Android Studio or Xcode"
echo "3. Configure Firebase project"
echo "4. Add Google Maps API key"
echo "5. Run on device: npx react-native run-android"
echo
echo "📖 See DEVELOPMENT_STATUS.md for detailed instructions"
