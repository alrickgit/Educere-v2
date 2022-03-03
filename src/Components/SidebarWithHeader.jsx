import React, { useState, useRef } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  Center,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  useEditableControls,
  AvatarBadge,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiMenu,
  FiBell,
  FiChevronDown,
  FiBook,
  FiPhoneCall,
  FiEdit2,
  FiCheck,
} from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuth } from "../contexts/AuthContext";

export default function SidebarWithHeader({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      transition="2s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      isOpen={isOpen}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Educere
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Link
        to="/"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <NavItem icon={<FiCompass />} text={"Dashboard"} />
      </Link>
      <Link
        to="/courses"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <NavItem icon={<FiBook />} text={"Courses"} />
      </Link>
      <Link
        to="/meeting"
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <NavItem icon={<FiPhoneCall />} text={"Meeting"} />
      </Link>
    </Box>
  );
};

const NavItem = ({ icon, text }) => {
  return (
    <Flex
      align="center"
      p="4"
      mx="4"
      borderRadius="lg"
      role="group"
      cursor="pointer"
      _hover={{
        bg: "purple.400",
        color: "white",
      }}
    >
      <Icon
        mr="4"
        mt="0.5"
        fontSize="20"
        _groupHover={{
          color: "white",
        }}
      >
        {icon}
      </Icon>
      <Text>{text}</Text>
    </Flex>
  );
};

const MobileNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const nameRef = useRef();
  const {
    isOpen: isProfileOpen,
    onOpen: onProfileOpen,
    onClose: onProfileClose,
  } = useDisclosure();
  const auth = getAuth();
  const user = auth.currentUser;
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  function EditableControls() {
    const {
      isEditing,
      getEditButtonProps,
    } = useEditableControls();

    return (
      !isEditing && (
        <IconButton size="sm" icon={<FiEdit2 />} {...getEditButtonProps()} />
      )
    );
  }

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Educere
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <Link to="notifications">
          <IconButton
            size="lg"
            variant="ghost"
            aria-label="open menu"
            icon={<FiBell />}
          />
        </Link>
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar
                  size={"sm"}
                  name={user.displayName && user.displayName}
                  src={user.photoURL && user.photoURL}
                />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">
                    {user.displayName ? user.displayName : "User"}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={onProfileOpen}>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuDivider />
              <MenuItem onClick={handleLogout}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
      <Modal isOpen={isProfileOpen} onClose={onProfileClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Center>
              <Editable>
                <Avatar
                  size={"2xl"}
                  name={user.displayName && user.displayName}
                  src={user.photoURL && user.photoURL}
                ></Avatar>
                {/* <EditableControls/> */}
              </Editable>
            </Center>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Editable
                ref={nameRef}
                defaultValue={user.displayName}
                isPreviewFocusable={false}
                ml={2}
                color="gray.600"
              >
                <Flex justifyContent="space-between">
                  <EditablePreview />
                  <EditableInput />
                  <EditableControls />
                </Flex>
              </Editable>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Biography</FormLabel>
              <Editable
                defaultValue="Biography"
                isPreviewFocusable={false}
                placeholder="Biography"
                ml={2}
                color="gray.600"
              >
                <Flex justifyContent="space-between">
                  <EditablePreview />
                  <EditableInput />
                  <EditableControls />
                </Flex>
              </Editable>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} colorScheme="green">
              Save
            </Button>
            <Button onClick={onProfileClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
