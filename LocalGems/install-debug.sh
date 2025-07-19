#!/bin/bash
echo "🔧 Tạo APK Debug cho Huawei Mate 10"
echo "====================================="

# Kiểm tra điện thoại kết nối
echo "📱 Kiểm tra điện thoại..."
adb devices

# Tạo APK debug
echo "🔨 Building APK debug..."
cd android
./gradlew assembleDebug

# Install APK lên điện thoại
echo "📲 Installing APK..."
adb install app/build/outputs/apk/debug/app-debug.apk

echo "✅ Xong! App đã được cài lên điện thoại Huawei Mate 10"
echo "🚀 Mở app 'LocalGems' trên điện thoại để test"
