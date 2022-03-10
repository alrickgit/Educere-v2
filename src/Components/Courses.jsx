import React, { useState, useEffect } from "react";
// import Navbar from './/Navbar';
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import CourseCard from "./CourseCard";
import {
  doc,
  collection,
  setDoc,
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
  SimpleGrid,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AddIcon } from "@chakra-ui/icons";
import SidebarWithHeader from "./SidebarWithHeader";
import Course from "./Course";

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
  const [loading, setLoading] = useState(false);

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
  function onfocus() {
    setError(false);
    setLoading(false);
  }
  async function createCourse(e) {
    e.preventDefault();
    const id = uuidv4();
    setLoading(true);
    await setDoc(
      doc(db, "createdCourses", `${currentUser.email}`, "courses", `${id}`),
      { title: courseTitle, creator: currentUser.email, id: id }
    );
    setLoading(false);
    onCreateClose();
  }
  async function joinCourse(e) {
    e.preventDefault();
    setLoading(true);
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
      setLoading(false);
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
        <HStack spacing={6}>
          {createdCourses.map((item, index) => (
            <>
              <Link to={item.id}>
                <CourseCard key={index} data={item} />
              </Link>
              <Routes>
                <Route path={`${item.id}`} element={<Course data={item} />} />
              </Routes>
            </>
          ))}
          {/* {joinedCourses.map((item, index) => (
            <>
              <Link to={"" + index + item.id}>
                <CourseCard key={index} data={item}></CourseCard>
              </Link>
            </>
          ))} */}
        </HStack>

        {/* Modal for Create Course */}

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
                    onFocus={onfocus}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  mr={3}
                  type="submit"
                  disabled={loading}
                >
                  Create
                </Button>
                <Button onClick={onCreateClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>

        {/*Modal for join course*/}
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
                    onFocus={onfocus}
                  />
                  {error && (
                    <FormErrorMessage>Invalid Credentials.</FormErrorMessage>
                  )}
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme="blue"
                  type="submit"
                  mr={3}
                  disabled={loading}
                >
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
