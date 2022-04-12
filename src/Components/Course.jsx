import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SidebarWithHeader from "./SidebarWithHeader";
import {
  Box,
  Heading,
  Text,
  Textarea,
  Stack,
  HStack,
  Button,
  Flex,
  Spacer,
  Input,
  Editable,
  EditableInput,
  EditablePreview,
  Avatar,
} from "@chakra-ui/react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { serverTimestamp } from "firebase/firestore";
import { db, storage } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { getAuth } from "firebase/auth";
import { useLocalContext } from "../contexts/LocalContext";
import { v4 as uuidv4 } from "uuid";
import Post from "./Post";

const Course = (props) => {
  let { id } = useParams();
  const { currentUser } = useAuth();
  const auth = getAuth();
  const user = auth.currentUser;
  const { uName } = useLocalContext();
  const [courseData, setCourseData] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [inputText, setinputText] = useState("");
  const [fileUpload, setFileUpload] = useState(null);
  const [posts, setPosts] = useState([]);

  function uploadFile(e) {
    e.preventDefault();
    if (fileUpload == null && inputText == "") return;
    if (fileUpload == null && inputText != "") {
      addDoc(collection(db, "announcements", "courses", `${id}`), {
        text: inputText,
        sender: currentUser.email,
        timestamp: serverTimestamp(),
        name: uName,
        avatar: user.photoURL,
      });
      setinputText("");
      setShowInput(false);
      return;
    }
    if (fileUpload.type && fileUpload.type.startsWith("image/")) {
      const fileRef = ref(
        storage,
        `announcements/images/${fileUpload.name + uuidv4()}`
      );
      uploadBytes(fileRef, fileUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          addDoc(collection(db, "announcements", "courses", `${id}`), {
            text: inputText,
            url: url,
            sender: currentUser.email,
            timestamp: serverTimestamp(),
            name: uName,
            avatar: user.photoURL,
          });
        });
      });
    } else {
      const fileRef = ref(
        storage,
        `announcements/documents/${fileUpload.name + uuidv4()}`
      );
      uploadBytes(fileRef, fileUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          addDoc(collection(db, "announcements", "courses", `${id}`), {
            text: inputText,
            url: url,
            sender: currentUser.email,
            timestamp: serverTimestamp(),
            name: uName,
            avatar: user.photoURL,
          });
        });
      });
    }
    setinputText("");
    setFileUpload(null);
    setShowInput(false);
  }

  async function getCourseData() {
    if (currentUser.email) {
      const docSnap = await getDoc(
        doc(db, "createdCourses", `${currentUser.email}`, "courses", `${id}`)
      );
      if (docSnap.exists()) {
        setCourseData(docSnap.data());
      } else {
        const docSnap = await getDoc(
          doc(db, "joinedCourses", `${currentUser.email}`, "courses", `${id}`)
        );
        setCourseData(docSnap.data());
      }
    }
  }

  useEffect(() => {
    getCourseData();
  }, [currentUser.email]);

  useEffect(() => {
    onSnapshot(
      collection(db, "announcements", "courses", `${id}`),
      (snapshot) => {
        setPosts(snapshot.docs.map((doc) => doc.data()));
      }
    );
  }, []);

  return (
    <>
      <SidebarWithHeader>
        <Stack spacing={4}>
          <Box
            p={8}
            h="100%"
            shadow="md"
            borderWidth="1px"
            borderRadius={13}
            bgColor={"white"}
          >
            <Stack spacing={2}>
              <Heading>{courseData.title} </Heading>
              <Text color={"gray.500"}>By: {courseData.creator}</Text>
            </Stack>
          </Box>
          <Box
            p={8}
            h="100%"
            shadow="md"
            borderWidth="1px"
            borderRadius={13}
            bgColor={"white"}
          >
            {showInput ? (
              <Box>
                <Editable
                  defaultValue="Announce something to your class"
                  color={"gray.500"}
                  fontSize={"lg"}
                >
                  <EditablePreview />
                  <EditableInput
                    value={inputText}
                    onChange={(e) => setinputText(e.target.value)}
                  />
                </Editable>

                <HStack justifyContent={"space-between"} my={2}>
                  <Input
                    type="file"
                    size="md"
                    textDecoration={"none"}
                    width="50%"
                    p={1}
                    onChange={(e) => setFileUpload(e.target.files[0])}
                  />
                  <HStack spacing={1}>
                    <Button mr={3} onClick={() => setShowInput(false)}>
                      Cancel
                    </Button>
                    <Button
                      bg={"orange.400"}
                      color={"white"}
                      _hover={{
                        bg: "orange.500",
                      }}
                      onClick={uploadFile}
                    >
                      Post
                    </Button>
                  </HStack>
                </HStack>
              </Box>
            ) : (
              <Box onClick={() => setShowInput(true)}>
                <HStack spacing={3}>
                  <Avatar
                    size={"sm"}
                    name={uName && uName}
                    src={user.photoURL && user.photoURL}
                  />
                  <Text fontSize={"lg"} color={"gray.500"}>
                    Announce something to your class
                  </Text>
                </HStack>
              </Box>
            )}
          </Box>
          {posts.map((post, index) => (
            <>
              <Post key={index}
                displayName={post.name}
                text={post.text}
                file={post.url}
                sender={post.sender}
                timestamp={post.timestamp.toDate().toString().split(" ")}
                avatar={post.avatar}
              />
            </>
          ))}
        </Stack>
      </SidebarWithHeader>
    </>
  );
};

export default Course;
