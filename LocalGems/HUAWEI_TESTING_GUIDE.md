# 📱 Hướng dẫn Test Local Gems trên Huawei Mate 10

## ✅ **Điện thoại đã kết nối thành công!**
- Device ID: `UYT5T18409013674`
- ADB Status: ✅ Connected

## 🚀 **Cách Test Nhanh Nhất**

### **Phương án 1: Sử dụng React Native Debugger**

1. **Cài React Native Debugger trên máy tính**:
```bash
# Download từ: https://github.com/jhen0409/react-native-debugger/releases
# Hoặc cài qua snap:
sudo snap install react-native-debugger
```

2. **Kết nối điện thoại qua WiFi**:
```bash
# Trên điện thoại, vào Settings → Developer Options → Wireless debugging
# Hoặc dùng USB với port forwarding:
adb reverse tcp:8081 tcp:8081
```

3. **Mở browser trên điện thoại**:
   - Vào địa chỉ: `http://localhost:8081`
   - Bạn sẽ thấy Metro bundler interface

### **Phương án 2: Build APK Debug (Recommended)**

1. **Fix Gradle issues và build**:
```bash
cd /home/hyvuonggia/local-gems/LocalGems

# Clean và rebuild
rm -rf android/build android/app/build
rm -rf node_modules && npm install --legacy-peer-deps

# Build APK
cd android && ./gradlew assembleDebug
```

2. **Install APK lên điện thoại**:
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

### **Phương án 3: Expo Development Build**

1. **Convert sang Expo managed workflow**:
```bash
npx expo install
npx expo prebuild
npx expo run:android
```

## 🔧 **Troubleshooting**

### **Nếu gặp lỗi Gradle**:
```bash
# Downgrade React Native version
npm install react-native@0.71.19 --save --legacy-peer-deps

# Hoặc sử dụng React Native CLI cũ hơn
npx react-native@0.71.19 run-android
```

### **Nếu gặp lỗi Metro bundler**:
```bash
# Clear cache và restart
npx react-native start --reset-cache
```

### **Nếu gặp lỗi permissions**:
```bash
# Trên điện thoại, enable tất cả permissions trong Developer Options:
# - USB Debugging
# - Install via USB  
# - USB Debugging (Security settings)
```

## 📲 **Test App Features trên điện thoại**

Khi app chạy được, bạn có thể test:

✅ **TestApp.tsx** (Current):
- Beautiful UI showcase
- Feature overview
- Basic React Native components

✅ **Full App.tsx** (sau khi setup Firebase):
- User authentication
- Map integration
- Location discovery
- Search functionality

## 🎯 **Recommended Next Steps**

1. **Immediate**: Thử build APK debug để install trực tiếp
2. **Short term**: Setup Firebase config để test full features
3. **Long term**: Configure Google Maps API cho map functionality

## 📞 **Support Commands**

```bash
# Kiểm tra điện thoại
adb devices

# Kiểm tra logs từ app
adb logcat -s ReactNativeJS

# Clear app data
adb shell pm clear com.localgems

# Uninstall app
adb uninstall com.localgems
```

---
**Status**: Điện thoại Huawei Mate 10 ready for testing! 🚀
