import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: "AIzaSyBXxtG2Zdw8pP25-HtVZlTmW2XEzQBozoo",
	authDomain: "animeviewer-e4a28.firebaseapp.com",
	projectId: "animeviewer-e4a28",
	storageBucket: "animeviewer-e4a28.appspot.com",
	messagingSenderId: "341390549229",
	appId: "1:341390549229:web:ebbf3fe179aab25f862ce4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db };