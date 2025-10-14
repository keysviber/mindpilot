Converting this Next.js web app into a mobile APK

This README gives two practical approaches. Pick one depending on whether you want the app to load a hosted site (TWA) or bundle the site locally inside an Android WebView (Capacitor).

Assumptions and notes
- You're on Windows (PowerShell). Commands below use PowerShell syntax.
- This project uses Next.js App Router — static export (`next export`) may not fully work. The recommended approach is:
  - Host the site (Vercel, Firebase Hosting) and use a Trusted Web Activity (TWA) or Bubblewrap to wrap the hosted URL, OR
  - Use Capacitor and run the production Next server inside the device (advanced) or pre-render the parts of the site to `out/` and bundle the static files.

Quick choices
- Fastest: Deploy site to Vercel and use Bubblewrap (TWA). Produces smaller, maintenance-friendly APKs.
- Capacitor: Good if you want native plugins and bundling. Works best when site is statically exported to `out/` or you run a local Node server inside the app (not recommended).

Capacitor (bundle static `out/` directory)
1. Install Capacitor dependencies (project root):

```powershell
npm install @capacitor/core @capacitor/cli --save-dev
```

2. Build the website (try static export, otherwise host remote URL):

```powershell
npm run build
# If your site can export statically, run
npm run build:web
```

3. Initialize Capacitor (first-time only) and add Android:

```powershell
npx cap init
# When prompted: appId: com.yourcompany.mindpilot, appName: MindPilot
npx cap add android
```

4. Copy the built files into the Android project and open Android Studio:

```powershell
npx cap sync
npx cap open android
```

5. Build an APK from Android Studio (Build > Build Bundle(s) / APK(s) > Build APK(s)).

Trusted Web Activity (recommended for hosted site)
1. Deploy the site to Vercel or Firebase Hosting.
2. Install Bubblewrap (Java + Android SDK required):

```powershell
npm install -g @bubblewrap/cli
```

3. Initialize Bubblewrap and build:

```powershell
bubblewrap init --manifest=https://your-deployed-site.com/manifest.json
bubblewrap build
```

This produces an Android project you can open in Android Studio and build.

Signing and publishing
- Use Android Studio or command-line tools to sign your APK/AAB.
- For Play Store, upload an AAB.

Troubleshooting and tips
- If you require Firebase Auth or other OAuth flows, ensure your redirect/origin URLs and Android assetlinks.json are configured.
- For native capabilities (camera, audio, storage), prefer Capacitor + plugins.

If you want, I can:
- Add Capacitor dev dependencies to `package.json` and run the install commands for you.
- Generate a Bubblewrap template if you have a deployed URL.
- Walk through building and signing an APK step-by-step.
