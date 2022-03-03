import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const Login = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setSuccess(false);
      setError(false);
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setSuccess(true);
    } catch {
      setError(true);
    }

    setLoading(false);
  }
  function onError() {
    setError(false);
    setSuccess(false);
  }
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Forgot your password?
        </Heading>
        {error && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>Failed to Reset!</AlertTitle>
            <AlertDescription>Check your Credentials.</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle mr={2}>Email Sent!</AlertTitle>
            <AlertDescription>Check your Inbox.</AlertDescription>
          </Alert>
        )}
        <Text
          fontSize={{ base: "sm", sm: "md" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          You&apos;ll get an email with a reset link
        </Text>
        <form onSubmit={handleSubmit}>
          <FormControl id="email">
            <Input
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              type="email"
              ref={emailRef}
              onFocus={onError}
              isRequired
            />
            <Input
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              disabled={loading}
              as={Button}
              mt="4"
            >
              Request Reset
            </Input>
          </FormControl>
        </form>
        <Stack pt={4}>
          <Text align={"center"} color={"gray.700"} >
            Back to
            <Link to="/login" style={{ fontWeight: "600" }}>
              {" "}
              Sign in
            </Link>
          </Text>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Login;
