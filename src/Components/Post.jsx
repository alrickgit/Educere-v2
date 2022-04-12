import React from "react";
import {
  Box,
  Heading,
  Text,
  Textarea,
  Stack,
  HStack,
  Button,
  Flex,
  VStack,
  Input,
  Editable,
  EditableInput,
  EditablePreview,
  Avatar,
  Spacer,
  Image,
} from "@chakra-ui/react";
import { getAuth } from "firebase/auth";
import { useLocalContext } from "../contexts/LocalContext";

const Post = ({ displayName, avatar, text, file, sender, timestamp }) => {
  const auth = getAuth();
  const user = auth.currentUser;
  const { uName } = useLocalContext();
  return (
    <>
      <Box
        p={8}
        h="100%"
        shadow="md"
        borderWidth="1px"
        borderRadius={13}
        bgColor={"white"}
      >
        <HStack spacing={3}>
          <Avatar
            size={"sm"}
            name={uName && uName}
            src={user.photoURL && user.photoURL}
          />
          <Box>
            <Text fontWeight={"bold"} fontSize={"lg"}>
              {displayName}
            </Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              {`${timestamp[1]} ${timestamp[2]} ${timestamp[3]} ${timestamp[4]}`}
            </Text>
          </Box>
        </HStack>
        <Box p={2} my={2}>
          <Stack>
            <Text fontSize={"sm"}>
              {text}
            </Text>
            <Image src={file} w="30%" h="30%"></Image>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default Post;
