import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  Select,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { profileIconsRef } from "../firebase";
import { listAll, getDownloadURL } from "@firebase/storage";

const SetupProfile = () => {
  const [iconURL, seticonURL] = useState([]);
  console.log(iconURL);
  const [selectedImg, setselectedImg] = useState([iconURL[0]]);


  useEffect(() => {
    listAll(profileIconsRef)
      .then((res) => {
        res.items.forEach((itemRef) => {
          getDownloadURL(itemRef).then((url) => {
            seticonURL((oldArr) => [...oldArr, url]);
          });
        });
      })
      .catch((error) => {
        console.log(error + "error");
      });
  }, []);

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

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Center>
              <Avatar src={selectedImg} size={"2xl"} />
            </Center>

            <HStack>
              {iconURL.length > 0 ? (
                <>
                  {iconURL.map((url, index) => {
                    return (
                      <Center key={index}>
                        <Avatar src={url} size={"md"} />
                      </Center>
                    );
                  })}
                </>
              ) : null}
            </HStack>

            <HStack>
              <Box>
                <FormControl id="Name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="Gender">
                  <FormLabel>Gender</FormLabel>
                  <Select placeholder="--">
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
                <Input type="text" />
              </FormControl>
            </Box>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
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
