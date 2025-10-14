# Deploying MindPilot Android App

## Prerequisites
- Android Studio installed
- JDK installed and JAVA_HOME set
- A keystore for signing releases

## Quick Start (Release Build)

1. Generate a keystore (if you don't have one):
```powershell
# From android/ directory
keytool -genkey -v -keystore release-key.keystore -alias mindpilot -keyalg RSA -keysize 2048 -validity 10000
```

2. Update keystore.properties with your signing info:
```properties
storeFile=../release-key.keystore
storePassword=your_keystore_password
keyAlias=mindpilot
keyPassword=your_key_password
```

3. Open in Android Studio:
```powershell
npx cap open android
```

4. Build APK or Bundle
- Menu: Build > Generate Signed Bundle/APK
- Choose Android App Bundle (recommended) or APK
- Select your keystore and alias
- Choose release build type
- Select destination folder

## Common Android Studio Tasks

### Running on Device/Emulator
1. Select device from toolbar dropdown
2. Click green "Run" button (or Shift+F10)

### Debugging WebView
1. Open Chrome
2. Navigate to chrome://inspect
3. Find your app and click "inspect"

### Updating App Icons
1. Right-click android/app/src/main/res
2. New > Image Asset
3. Select "Launcher Icons"
4. Customize and generate

### Build Types
- Debug: `./gradlew assembleDebug`
- Release: `./gradlew assembleRelease`
- Bundle: `./gradlew bundleRelease`

### Version Updates
Edit android/app/build.gradle:
```groovy
defaultConfig {
    versionCode 1      // Increment for each Play Store upload
    versionName "1.0.0" // User-visible version string
}
```

## Play Store Publishing Checklist

1. Assets Required:
- [ ] App icon (512x512)
- [ ] Feature graphic (1024x500)
- [ ] Screenshots for different devices
- [ ] Short description (80 chars)
- [ ] Full description
- [ ] Privacy policy URL

2. Build Requirements:
- [ ] Increment versionCode
- [ ] Update versionName
- [ ] Sign with release key
- [ ] Test signed build
- [ ] Generate Android App Bundle

3. Testing:
- [ ] Internal test track first
- [ ] Then closed testing
- [ ] Finally production

## Troubleshooting

### Gradle Build Issues
1. Try "File > Invalidate Caches / Restart"
2. Verify Android SDK versions match build.gradle
3. Check JAVA_HOME points to valid JDK

### Signing Issues
1. Verify keystore.properties exists
2. Check keystore passwords
3. Ensure keystore file path is correct

### WebView Loading Issues
1. Check android:usesCleartextTraffic in AndroidManifest.xml
2. Verify all URLs use HTTPS
3. Test with chrome://inspect

Need help? Check:
- [Capacitor Android docs](https://capacitorjs.com/docs/android)
- [Android Studio guides](https://developer.android.com/studio/publish)