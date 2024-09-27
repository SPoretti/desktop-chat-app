// firebase.tsx
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  get as firebaseGet,
  push,
  onValue,
  query,
  orderByChild,
} from "firebase/database";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const storage = getStorage(app);

// Authentication functions
export const signIn = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signUp = async (
  email: string,
  password: string,
  username: string,
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const userId = userCredential.user.uid;
  await set(ref(db, `users/${userId}`), {
    username,
    email,
  });
  await sendEmailVerification(userCredential.user);
  console.log("Verification email sent.");
};

export const logout = () => {
  return signOut(auth);
};

// Realtime Database functions
export const sendMessage = async (message: string, userId: string) => {
  const userRef = ref(db, `users/${userId}`);
  const userSnapshot = await firebaseGet(userRef); // Use the aliased get function
  if (userSnapshot.exists()) {
    const userData = userSnapshot.val(); // Ensure userSnapshot is awaited and has val method
    const username = userData.username;

    const messageListRef = ref(db, "messages");
    const newMessageRef = push(messageListRef);
    await set(newMessageRef, {
      text: message,
      userId,
      username,
      createdAt: new Date().toISOString(),
    });
  } else {
    throw new Error(`User data not found for userId: ${userId}`);
  }
};

interface Message {
  id: string;
  text: string;
  userId: string;
  username: string;
  createdAt: string;
}

export const listenForMessages = (callback: (messages: Message[]) => void) => {
  const messagesRef = query(ref(db, "messages"), orderByChild("createdAt"));
  const unsubscribe = onValue(messagesRef, (snapshot) => {
    const messages: Message[] = [];
    snapshot.forEach((childSnapshot) => {
      messages.push({ id: childSnapshot.key, ...childSnapshot.val() });
    });
    callback(messages);
  });
  return unsubscribe;
};

export const getUserData = async (userId: string) => {
  const userRef = ref(db, `users/${userId}`);
  const userSnapshot = await firebaseGet(userRef);
  if (userSnapshot.exists()) {
    return userSnapshot.val();
  } else {
    throw new Error(`User data not found for userId: ${userId}`);
  }
};

interface UserData {
  username?: string;
  email?: string;
  // Add other fields as necessary
}

export const updateUserData = async (userId: string, data: UserData) => {
  const userRef = ref(db, `users/${userId}`);
  await set(userRef, data);
};

export const getUserDataByUsername = async (username: string) => {
  const userRef = ref(db, `users`);
  const snapshot = await firebaseGet(userRef);
  const users = snapshot.val();
  for (const userId in users) {
    if (users[userId].username === username) {
      return { id: userId, ...users[userId] };
    }
  }
  throw new Error("User not found");
};

export const getAllUsernames = async () => {
  const userRef = ref(db, `users`);
  const snapshot = await firebaseGet(userRef);
  const users = snapshot.val();
  const usernames = [];
  for (const userId in users) {
    usernames.push(users[userId].username);
  }
  return usernames;
};

export const uploadProfilePicture = async (userId: string, file: File) => {
  const fileRef = storageRef(storage, `profilePictures/${userId}/${file.name}`);
  await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(fileRef);
  return downloadURL;
};

export { app, auth, db };
