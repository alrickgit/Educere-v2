import React, { useState, useEffect } from "react";
// import Navbar from './/Navbar';
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import Course from "./Course";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  setDoc,
  query,
  where,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  Box,
  Spacer,
  Heading,
  HStack,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import SidebarWithHeader from "./SidebarWithHeader";

const Courses = () => {
  const [coursesData, setcoursesData] = useState([]);
  const [coursesCode, setcoursesCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [email, setemail] = useState("");
  const [courseExists, setcourseExists] = useState(false);
  const [error, setError] = useState(false);
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isJoinOpen,
    onOpen: onJoinOpen,
    onClose: onJoinClose,
  } = useDisclosure();

  const { currentUser } = useAuth();
  const [createdCourses, setCreatedCourses] = useState([]);
  const [joinedCourses, setjoinedCourses] = useState([]);

  // useEffect(() => {
  //   if (currentUser.email) {
  //     const q = collection(db, "joinedcourses", `${currentUser.email}`, "courses");
  //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
  //       querySnapshot.forEach((doc) => {
  //         setjoinedCourses(doc.data())
  //         console.log(joinedCourses)
  //       });
  //     });
  //     return unsubscribe
  //   }
  // }, [currentUser.email]);
  function jClose() {
    setError(false);
    onJoinClose();
  }
  async function createCourse(e) {
    e.preventDefault();
    const id = uuidv4();

    await setDoc(
      doc(db, "createdCourses", `${currentUser.email}`, "courses", `${id}`),
      { title: courseTitle, creator: currentUser.email, id: id }
    );
    onCreateClose();
  }
  async function joinCourse(e) {
    e.preventDefault();
    const docSnap = await getDoc(
      doc(db, "createdCourses", `${email}`, "courses", `${coursesCode}`)
    );
    if (docSnap.exists() && docSnap.data().creator !== currentUser.email) {
      setcourseExists(true);
      setcoursesData(docSnap.data());
      setError(false);
    } else {
      setError(true);
      setcourseExists(false);
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
    if (courseExists === true) {
      await setDoc(
        doc(
          db,
          "joinedCourses",
          `${currentUser.email}`,
          "courses",
          `${coursesCode}`
        ),
        coursesData
      );
      onJoinClose();
      console.log("Document data:", docSnap.data());
    }
  }

  useEffect(() => {
    if (currentUser.email) {
      const q = collection(
        db,
        "createdCourses",
        `${currentUser.email}`,
        "courses"
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setCreatedCourses(querySnapshot.docs.map((doc) => doc.data()));
      });
      return unsubscribe;
    }
  }, [currentUser.email]);
  useEffect(() => {
    if (currentUser.email) {
      const q = collection(
        db,
        "joinedCourses",
        `${currentUser.email}`,
        "courses"
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        setjoinedCourses(querySnapshot.docs.map((doc) => doc.data()));
      });
      return unsubscribe;
    }
  }, [currentUser.email]);

  return (
    <div>
      <SidebarWithHeader>
        <Flex>
          <Box p="2">
            <Heading size="md">Courses</Heading>
          </Box>
          {/* <Spacer /> */}
          <Box mr="8">
            <Menu>
              <MenuButton as={IconButton} icon={<AddIcon />}></MenuButton>
              <MenuList>
                <MenuItem onClick={onCreateOpen} value="create">
                  Create Course
                </MenuItem>
                <MenuItem onClick={onJoinOpen} value="join">
                  Join Course
                </MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Flex>
        <HStack m={8} spacing={6}>
          {createdCourses.map((item) => (
            <Course key={item.id} data={item} />
          ))}
          {joinedCourses.map((item) => (
            <Course key={item.id} data={item} />
          ))}
        </HStack>

        <Modal isOpen={isCreateOpen} onClose={onCreateClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Course</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={createCourse}>
              <ModalBody pb={6}>
                <FormControl isRequired>
                  <FormLabel htmlFor="course-title">Course Title</FormLabel>
                  <Input
                    id="course-title"
                    placeholder="Enter Course Title"
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Create
                </Button>
                <Button onClick={onCreateClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        {/* //!join modal */}
        <Modal isOpen={isJoinOpen} onClose={jClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Join Course</ModalHeader>
            <ModalCloseButton />
            <form onSubmit={joinCourse}>
              <ModalBody pb={6}>
                <FormControl isRequired isInvalid={error}>
                  <FormLabel htmlFor="course-id">Course ID</FormLabel>
                  <Input
                    id="course-id"
                    placeholder="Enter Course ID"
                    onChange={(e) => setcoursesCode(e.target.value)}
                  />
                </FormControl>
                <FormControl mt={4} isRequired isInvalid={error}>
                  <FormLabel>Creator's Email</FormLabel>
                  <Input
                    placeholder="Enter Creators Email"
                    onChange={(e) => setemail(e.target.value)}
                  />
                  {error && (
                    <FormErrorMessage>Invalid Credentials.</FormErrorMessage>
                  )}
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" type="submit" mr={3}>
                  Join
                </Button>
                <Button onClick={jClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </SidebarWithHeader>
    </div>
  );
};

export default Courses;
