import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "./AuthContext";

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true); 

  // create or register user
  const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // signin user or login user
  const signIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google Sign In
  const googleSignIn = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // update profile
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // logout / signout
  const logOut = () => {
    return signOut(auth);
  };


  // Reset Password function 
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  console.log(user);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  },[]);

  const authData = {
    user,
    setUser,
    createUser,
    signIn,
    updateUser,
    logOut,
    googleSignIn,
    resetPassword,
    loading,
    setLoading
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
