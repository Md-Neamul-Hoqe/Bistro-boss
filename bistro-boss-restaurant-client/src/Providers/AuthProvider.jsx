import { createContext, useEffect, useState } from "react";
import auth from "../config/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import PropTypes from "prop-types";
// import useAxiosHook from "../Hooks/useAxiosHook";
import useAxiosPublic from "../Hooks/useAxiosPublic";
export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const axios = useAxiosPublic();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  /* Credentials */
  const createUser = (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userSingIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userSignOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const googleSignInUser = () => {
    return signInWithPopup(auth, googleProvider);
  };

  /* Auth state change */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // add token
        const userInfo = { email: currentUser?.email };
        try {
          axios
            .post("/auth/jwt", userInfo, { withCredentials: true })
            .then(() => {
              setLoading(false);
            });
        } catch (error) {
          console.log(error);
        }
      } else {
        // remove token
        axios.post("/user/logout", currentUser).then((res) => {
                //console.log("is Log Out ? ", res?.data?.success);
          setLoading(false);
        });
      }

      // console.log("Current User", currentUser);
    });

    return () => {
      return unsubscribe();
    };
  }, [axios]);

  const updateUserProfileImage = (name, photoUrl) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    userSingIn,
    updateUserProfileImage,
    userSignOut,
    googleSignInUser,
    error,
    setError,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export default AuthProvider;
