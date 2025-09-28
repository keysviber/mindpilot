import { initializeApp, getApps, getApp } from 'firebase/app';

const firebaseConfig = {
  projectId: "studio-3238744839-3220a",
  appId: "1:643251024593:web:f20b75e2ee70f7171d8bf0",
  apiKey: "AIzaSyDsNpsPcXI0CN1xeBjWrmRLfBlUdaLGl1w",
  authDomain: "studio-3238744839-3220a.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "643251024593"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
