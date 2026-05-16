// =========================================
// PARICHAY LODGE – FIREBASE CONFIGURATION
// ⚠️  REPLACE THE VALUES BELOW WITH YOUR
//     ACTUAL FIREBASE PROJECT CONFIG
// =========================================
// HOW TO GET YOUR CONFIG:
// 1. Go to https://console.firebase.google.com
// 2. Click your project → gear icon → Project Settings
// 3. Scroll to "Your apps" → click your web app
// 4. Copy the firebaseConfig object values below

export const FIREBASE_CONFIG = {
  apiKey:            "AIzaSyBx3xkBMa4NJUeUcBdiNY57tEiZySMMo2A",
  authDomain:        "parichay-lodge.firebaseapp.com",
  projectId:         "parichay-lodge",
  storageBucket:     "parichay-lodge.firebasestorage.app",
  messagingSenderId: "598199708405",
  appId:             "1:598199708405:web:cc9d07b6fa6f8df1b2b3bc"
};

// ImgBB API Key — get free at https://api.imgbb.com
export const IMGBB_API_KEY = "55587c4979eae2034a57d32790ec3e6b";

// Firestore collection names
export const COLLECTIONS = {
  GUESTS:   'guests',
  ROOMS:    'rooms',
  GALLERY:  'gallery',
  SETTINGS: 'settings',
  USERS:    'users',
  BOOKINGS: 'bookings'
};
