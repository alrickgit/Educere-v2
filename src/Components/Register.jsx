import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import bgImg from "../css/bg.jpg";
import {
  Button,
  Text,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup, isNewUser,setisNewUser } = useAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError(false);
      setisNewUser(true)
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      if (isNewUser) {
        navigate("/setup");
      } else {
        navigate("/");
      }
    } catch {
      setError(true);
    }

    setLoading(false);
  }
  function onError() {
    setError(false);
  }
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"md"}>
          <Heading fontSize={"2xl"}>Create Account</Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Failed to Sign up!</AlertTitle>
              <AlertDescription>Check your Credentials.</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            {" "}
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" ref={emailRef} onFocus={onError} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" ref={passwordRef} onFocus={onError} />
            </FormControl>
            <FormControl id="confirmpassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <Input type="password" ref={passwordConfirmRef} onFocus={onError} />
            </FormControl>
            <Input
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              as={Button}
              disabled={loading}
              mt={6}
              type='submit'
            >
              Sign up
            </Input>
          </form>
          <Stack pt={4}>
            <Text align={"center"} color={"gray.700"} fontSize="md">
              Already have an account?
              <Link to="/login" style={{ fontWeight: "600" }}>
                {" "}
                Login
              </Link>
            </Text>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image alt={"Register Image"} objectFit={"cover"} src={bgImg} />
      </Flex>
    </Stack>
  );
};
export default Register;
