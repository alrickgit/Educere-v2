import React, { useEffect } from "react";
import {
  Heading,
  Textarea,
  Box,
  Stack,
  Image,
  HStack,
  Button,
  Checkbox,
  Spacer,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useAuth } from "../contexts/AuthContext";
import SidebarWithHeader from "./SidebarWithHeader";
import { useState } from "react";
import { collection, where, query, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useLocalContext } from "../contexts/LocalContext";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { uName } = useLocalContext();
  const [task, setTask] = useState([]);
  const [value, setValue] = useState("");
  const [resize, setResize] = useState("none");
  const handleInput = () => {
    setTask((oldArr) => [...oldArr, value]);
    setValue("");
    console.log("working");
  };
  //   async function getData() {
  //     const UserCollRef = query(
  //       collection(db, "UserData"),
  //       where("email", "==", `${currentUser.email}`)
  //     );
  //     const querySnapshot = await getDocs(UserCollRef);
  //     querySnapshot.forEach((doc) => {
  //       // doc.data() is never undefined for query doc snapshots
  //       console.log(doc.id, " => ", doc.data().userName);
  //       setUName(doc.data().userName);
  //     });
  //   }

  //   useEffect(() => {
  //   }, []);

  return (
    <div>
      <SidebarWithHeader>
        {/* {currentUser && currentUser.email} */}
        <Stack spacing={5}>
          <Heading size={"lg"}>Welcome {uName},</Heading>
          <Box>
            <Image src=""></Image>
          </Box>

          <Box>
            <HStack>
              <Textarea
                bgColor={"white"}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                placeholder="To-do list"
                size="xs"
                resize={resize}
              />
              <Button onClick={handleInput}>
                <CheckCircleIcon />
              </Button>
            </HStack>

            <Heading fontSize="md">
              {task.map((i) => {
                return (
                  <Stack>
                    <Box p={5} shadow="md" borderWidth="1px" bgColor={'white'}>
                      <HStack>
                        <Checkbox />
                        <Box>{i}</Box>
                      </HStack>
                    </Box>
                  </Stack>
                );
              })}{" "}
            </Heading>
          </Box>
        </Stack>
      </SidebarWithHeader>
    </div>
  );
};

export default Dashboard;
