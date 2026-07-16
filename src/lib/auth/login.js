import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '$lib/firebase';

export async function login(email, password) {
	return signInWithEmailAndPassword(auth, email, password);
}
