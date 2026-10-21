import type { CapacitorConfig } from '@capacitor/cli';

// App id + display name live here. They are copied into android/ and ios/ by `npx cap add`;
// to rename later see README ("Đổi tên / app id").
const config: CapacitorConfig = {
  appId: 'com.mochihome.game',
  appName: 'Mochi Home',
  webDir: 'dist',
  backgroundColor: '#5a3fb8',
  android: { allowMixedContent: false },
  ios: { contentInset: 'never' },
  plugins: {
    SplashScreen: {
      launchShowDuration: 800,
      launchAutoHide: true,
      backgroundColor: '#5a3fb8',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    },
    StatusBar: { overlaysWebView: true, style: 'DARK', backgroundColor: '#00000000' },
  },
};

export default config;
