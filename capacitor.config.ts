import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.robotuy',
  appName: 'Robotuy',
  webDir: 'public',
  server: {
    url: 'https://www.robotuy.app',
    cleartext: false,
    allowNavigation: [
      '*.supabase.co',
      '*.google.com',
      'accounts.google.com',
      'robotuy.app',
      '*.robotuy.app',
    ],
  },
  ios: {
    scheme: 'Robotuy',
    contentInset: 'automatic',
    preferredContentMode: 'mobile',
    scrollEnabled: false,
    allowsLinkPreview: false,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      launchShowDuration: 0,
      backgroundColor: '#010d33',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
