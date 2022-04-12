import React from "react";
import SidebarWithHeader from "./SidebarWithHeader";
import {
  Box,
  Heading,
  Text,
  Textarea,
  Stack,
  HStack,
  Button,
  Flex,
  Spacer,
} from "@chakra-ui/react";

const Meeting = () => {
  return (
    <div>
      <SidebarWithHeader>
        <Box p={4} shadow="md" borderWidth="1px" borderRadius={10} bgColor={'white'}>
          <Box>
            <Stack spacing={3}>
              <Heading fontSize="lg">Create Meeting</Heading>
                <Textarea
                  size="xs"
                  placeholder="Paste the meeting LINK here .."
                  bgColor="gray.100"
                  borderRadius={10}
                />
                
                <Flex>
                <Spacer/>
                <Button colorScheme="orange.400" textColor="white">
                  Post
                </Button>
                </Flex>
            </Stack>
          </Box>
        </Box>
      </SidebarWithHeader>
    </div>
  );
};

export default Meeting;