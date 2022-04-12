import React, { useContext, useState, useEffect } from "react";
import {
  onSnapshot,
  doc,
  getDoc,
  collection,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const UsersContext = React.createContext();

export const useLocalContext = () => {
  return useContext(UsersContext);
};

export const LocalContext = ({ children }) => {
  const { currentUser } = useAuth();
  const [uName, setuName] = useState("");
  const [org, setOrg] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setgender] = useState("");

  async function getData() {
    const UsersRef = doc(db, "UserData", `${currentUser.email}`);
    // const UsersRef = doc(db, "UserData");
    // const UsersRef = query(collection(db, "UserData"),where(`${currentUser.email}`, "==","email"));

    // const UserSnap = await getDoc(UsersRef);
    // console.log(UserSnap.data());
    // setUName(UserSnap.data().userName);
    const unsubscribe = onSnapshot(UsersRef, (querySnapshot) => {
      // console.log(querySnapshot.data());
      setuName(querySnapshot.data().userName);
      setOrg(querySnapshot.data().org);
      setBio(querySnapshot.data().bio);
      setgender(querySnapshot.data().gender);
    });
    return unsubscribe;
  }
  // console.log(org, bio, gender);
  useEffect(() => {
    getData();
  });

  const value = { uName, org, bio, gender };
  return (
    <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
  );
};

export default LocalContext;
