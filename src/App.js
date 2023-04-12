// App.js

import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; // Update import statement
import 'firebase/compat/auth'; // Update import statement
import { useAuthState } from 'react-firebase-hooks/auth';

// Initialize Firebase app
firebase.initializeApp({
  apiKey: "AIzaSyC3FvtVZDjOaZQ3nJLlXglHzR5h7FN-cL4",
  authDomain: "hello-world-cf0b1.firebaseapp.com",
  projectId: "hello-world-cf0b1",
  storageBucket: "hello-world-cf0b1.appspot.com",
  messagingSenderId: "60755469642",
  appId: "1:60755469642:web:1c5627c8e6d6bf4e20cdb3",
  measurementId: "G-E41BLZLMVY"
});

const auth = firebase.auth();

const App = () => {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      setEmail('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignInWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await auth.signInWithPopup(provider);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user ? (
        <div>
          <h1>Hello World</h1>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      ) : (
        <div>
          <h1>Sign Up</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSignUp}>Sign Up with Email and Password</button>
          <button onClick={handleSignInWithGoogle}>Sign Up with Google</button>
        </div>
      )}
    </div>
  );
};

export default App;
