import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import app from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useColorModeValue,
  Text,
  FormErrorMessage,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  color,
} from "@chakra-ui/react";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError(false);
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError(true);
    }

    setLoading(false);
  }
  async function handleGoogleSubmit(e) {
    const provider = new GoogleAuthProvider();
    e.preventDefault();

    try {
      setError(false);
      setLoading(true);
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch {
      setError(true);
    }

    setLoading(false);
  }
  function onError(){
    setError(false)
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
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Failed to Sign in!</AlertTitle>
              <AlertDescription>
                Check your Credentials.
              </AlertDescription>
            </Alert>
          )}
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input type="email" ref={emailRef} onFocus={onError} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input type="password" ref={passwordRef} onFocus={onError} />
              </FormControl>
              {/* <Flex color={'gray.700'} justify='end' align='start'>
                <Link to="/forgot-password">Forgot password?</Link>
                </Flex> */}
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"end"}
              >
                <Text color={"gray.700"} fontSize="md">
                  <Link to="/forgot-password" style={{ fontWeight: "600" }}>
                    Forgot password?
                  </Link>
                </Text>
              </Stack>
              <Stack spacing={6}>
                <Input
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  as={Button}
                  type="submit"
                  disabled={loading}
                >
                  Sign in
                </Input>
                <Input
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  as={Button}
                  disabled={loading}
                  onClick={handleGoogleSubmit}
                >
                  Sign in with Google
                </Input>
              </Stack>
              <Stack pt={4}>
                <Text align={"center"} color={"gray.700"} fontSize="md">
                  Don't have an account?
                  <Link to="/register" style={{ fontWeight: "600"}}>
                    {" "}
                    Create One
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
};

export default Login;
