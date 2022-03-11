import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

import React from "react";

const CourseCard = ({ data }) => {
  return (
    <Box
      // maxW={"370px"}
      w={"2xs"}
      h={"12rem"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"2xl"}
      rounded={"md"}
      overflow={"hidden"}
      margin={"0"}
    >
      <Link to={`${data.id}`}>
        <Image
          h={"80px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit={"cover"}
        />
        {/* <Flex justify={"end"} mt={-12} mr={4}>
          <Avatar
            size={"lg"}
            mt={4}
            src={
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
            }
            alt={"Author"}
            css={{
              border: "2px solid white",
            }}
          />
        </Flex> */}

        <Box>
          <Stack spacing={0} align={"center"} my={6}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {data.title}
            </Heading>
            <Text color={"gray.500"}>{data.creator}</Text>
          </Stack>
        </Box>
      </Link>
    </Box>
  );
};

export default CourseCard;
