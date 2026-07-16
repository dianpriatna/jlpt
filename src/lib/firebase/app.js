import { initializeApp } from 'firebase/app';
import { PUBLIC_FIREBASE_API_KEY } from '$env/static/public';
import { PUBLIC_FIREBASE_AUTH_DOMAIN } from '$env/static/public';
import { PUBLIC_FIREBASE_PROJECT_ID } from '$env/static/public';
import { PUBLIC_FIREBASE_STORAGE_BUCKET } from '$env/static/public';
import { PUBLIC_FIREBASE_MESSAGING_SENDER_ID } from '$env/static/public';
import { PUBLIC_FIREBASE_APP_ID } from '$env/static/public';

const firebaseConfig = {
	apiKey: PUBLIC_FIREBASE_API_KEY,
	authDomain: PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
	appId: PUBLIC_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
