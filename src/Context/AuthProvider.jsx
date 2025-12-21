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

// Google Provider
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // ✅ keep this
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Main auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        try {
          const idToken = await currentUser.getIdToken();
          setToken(idToken);
        } catch (error) {
          console.error("Error getting ID token:", error);
          setToken(null);
        }
      } else {
        setUser(null);
        setToken(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Expose setUser so other components can update user instantly
  const authData = {
    user,
    setUser,   // ✅ added here
    token,
    loading,
    setLoading,
    createUser,
    signIn,
    googleSignIn,
    updateUser,
    logOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;











// import React, { useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import { auth } from "../firebase/firebase.init";
// import { AuthContext } from "./AuthContext";

// // Google Provider
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(null); // এটা যোগ করলাম — ID Token এর জন্য
//   const [loading, setLoading] = useState(true);

//   // Create user
//   const createUser = (email, password) => {
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   // Sign in
//   const signIn = (email, password) => {
//     setLoading(true);
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   // Google Sign In
//   const googleSignIn = () => {
//     setLoading(true);
//     return signInWithPopup(auth, googleProvider);
//   };

//   // Update profile
//   const updateUser = (updatedData) => {
//     return updateProfile(auth.currentUser, updatedData);
//   };

//   // Logout
//   const logOut = () => {
//     setLoading(true);
//     return signOut(auth);
//   };

//   // Reset Password
//   const resetPassword = (email) => {
//     return sendPasswordResetEmail(auth, email);
//   };

//   // Main auth state listener — এখানে token নেওয়া হচ্ছে
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
//       if (currentUser) {
//         setUser(currentUser);

//         // Fresh ID Token নে (সবচেয়ে গুরুত্বপূর্ণ!)
//         try {
//           const idToken = await currentUser.getIdToken();
//           setToken(idToken);
//           // optional: localStorage-এ সেভ করতে পারিস (reload-এর জন্য)
//           // localStorage.setItem("authToken", idToken);
//         } catch (error) {
//           console.error("Error getting ID token:", error);
//           setToken(null);
//         }
//       } else {
//         setUser(null);
//         setToken(null);
//         // localStorage.removeItem("authToken");
//       }
//       setLoading(false);
//     });

//     return () => unsubscribe();
//   }, []);

//   const authData = {
//     user,
//     token,              // এটা যোগ করলাম — backend-এ পাঠানোর জন্য
//     loading,
//     setLoading,
//     createUser,
//     signIn,
//     googleSignIn,
//     updateUser,
//     logOut,
//     resetPassword,
//   };

//   return (
//     <AuthContext.Provider value={authData}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;


























// import React, { useEffect, useState } from "react";
// import {
//   createUserWithEmailAndPassword,
//   GoogleAuthProvider,
//   onAuthStateChanged,
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
//   signInWithPopup,
//   signOut,
//   updateProfile,
// } from "firebase/auth";
// import { auth } from "../firebase/firebase.init";
// import { AuthContext } from "./AuthContext";

// // Initialize Google Auth Provider
// const googleProvider = new GoogleAuthProvider();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//    const [loading, setLoading] = useState(true); 

//   // create or register user
//   const createUser = (email, password) => {
//     return createUserWithEmailAndPassword(auth, email, password);
//   };

//   // signin user or login user
//   const signIn = (email, password) => {
//     return signInWithEmailAndPassword(auth, email, password);
//   };

//   // Google Sign In
//   const googleSignIn = () => {
//     return signInWithPopup(auth, googleProvider);
//   };

//   // update profile
//   const updateUser = (updatedData) => {
//     return updateProfile(auth.currentUser, updatedData);
//   };

//   // logout / signout
//   const logOut = () => {
//     return signOut(auth);
//   };


//   // Reset Password function 
//   const resetPassword = (email) => {
//     return sendPasswordResetEmail(auth, email);
//   };

//   console.log(user);
//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => {
//       unsubscribe();
//     };
//   },[]);

//   const authData = {
//     user,
//     setUser,
//     createUser,
//     signIn,
//     updateUser,
//     logOut,
//     googleSignIn,
//     resetPassword,
//     loading,
//     setLoading
//   };
//   return <AuthContext value={authData}>{children}</AuthContext>;
// };

// export default AuthProvider;
