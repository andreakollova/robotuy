import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'sk.robotuy.app',
  appName: 'Robotuy',
  webDir: 'public',
  server: {
    url: 'https://www.robotuy.com',
    cleartext: false,
    allowNavigation: [
      '*.supabase.co',
      '*.google.com',
      'accounts.google.com',
      'robotuy.sk',
      '*.robotuy.sk',
      'robotuy.com',
      '*.robotuy.com',
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
      backgroundColor: '#0F0F0F',
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
  },
};

export default config;
