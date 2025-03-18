
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.ab9c9c997d744ec2a7973fc891f03dd8',
  appName: 'school-portal-accessor',
  webDir: 'dist',
  server: {
    url: 'https://ab9c9c99-7d74-4ec2-a797-3fc891f03dd8.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: "#F8F9FA",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      androidSpinnerStyle: "large",
      spinnerColor: "#3880FF"
    }
  }
};

export default config;
