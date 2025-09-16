import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDMl-dmmVxMt3MtMolx_UeKDgYCg65nnnQ",
  authDomain: "nodeapp-32d9a.firebaseapp.com",
  databaseURL: "https://nodeapp-32d9a-default-rtdb.firebaseio.com",
  projectId: "nodeapp-32d9a",
  storageBucket: "nodeapp-32d9a.firebasestorage.app",
  messagingSenderId: "483684469791",
  appId: "1:483684469791:web:9a1c61a3ac35610ba4992a",
  measurementId: "G-6CQ4MFEWBM"
};

// Evita reinicialização em hot-reload (nodemon)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
console.log("Firebase inicializado:", app.name);

export const db = getDatabase(app);

