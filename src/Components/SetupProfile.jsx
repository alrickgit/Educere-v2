import React, { useEffect, useRef, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
  Avatar,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { db, profileIconsRef } from "../firebase";
import { listAll, getDownloadURL } from "@firebase/storage";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import IsNewUser from "./IsNewUser";

const SetupProfile = () => {
  const [iconURL, seticonURL] = useState([]);
  const [counter, setCounter] = useState(0);
  const { currentUser, updateuserProfile, setisNewUser, IsNewUser } = useAuth();
  const [photoURL, setPhotoURL] = useState();
  const [userName, setUserName] = useState("");
  const [org, setOrg] = useState("");
  const [bio, setBio] = useState("");
  const gender = useRef();

  const navigate = useNavigate();

  //console.log(iconURL);
  // const sorticonURL = iconURL.slice(0, 4);
  //console.log(sorticonURL)
  // const [selectedImg, setSelectedImg] = useState("");

  const getAllProfileImages = async () => {
    listAll(profileIconsRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            // * STATE storing the pictures
            seticonURL((oldArr) => [...oldArr, url]);
            // setSelectedImg(iconURL[imageState]);
          });
        });
      })
      .catch((error) => {
        console.log(error + "error");
      });
  };

  async function handleSubmit() {
    if (currentUser) {
      console.log(iconURL.at(counter));
    }
    console.log("working");

    setisNewUser(false);
    console.log("before" + IsNewUser);

    const docRef = await setDoc(doc(db, "UserData", `${currentUser.email}`), {
      userName: userName,
      org: org,
      bio: bio,
      email: currentUser.email,
      gender: gender.current.value,
    });
    console.log("after" + IsNewUser);

    navigate("/");
  }

  useEffect(() => {
    getAllProfileImages();
  }, []);
  if (counter > 15) {
    setCounter(0);
  }
  if (counter < 0) {
    setCounter(15);
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Setup Your Profile
          </Heading>
        </Stack>

        <></>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Center>
              <HStack spacing={12}>
                <button>
                  <ArrowLeftIcon onClick={(e) => setCounter(counter + 1)} />
                </button>
                <Avatar src={iconURL.at(counter)} size={"2xl"} />
                <button>
                  <ArrowRightIcon onClick={(e) => setCounter(counter - 1)} />
                </button>
              </HStack>
            </Center>

            <HStack>
              <Box>
                <FormControl id="Name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="Gender">
                  <FormLabel>Gender</FormLabel>
                  <Select placeholder="--" ref={gender}>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="NB">Non Binary</option>
                    <option value="PNS">Prefer not to say</option>
                  </Select>
                </FormControl>
              </Box>
            </HStack>
            <Box>
              <FormControl id="Organization">
                <FormLabel>Organization</FormLabel>
                <Input type="text" onChange={(e) => setOrg(e.target.value)} />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="Bio">
                <FormLabel>Bio</FormLabel>
                <Input type="text" onChange={(e) => setBio(e.target.value)} />
              </FormControl>
            </Box>
            <Stack spacing={10} pt={2}>
              <Button
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SetupProfile;
