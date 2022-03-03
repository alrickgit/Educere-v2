import React, { useState } from "react";
import ErrorAlert from "./ErrorAlert";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

const Account = () => {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div className="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-xl">
        <h1 className="text-3xl font-semibold text-center text-textDark300 ">
          Profile
        </h1>
        <hr className="mt-3 border-b border-gray-200" />
        {error && <ErrorAlert text={error} />}
        <div className="mt-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm text-textDark300"
            >
              Email: <strong>{currentUser && currentUser.email}</strong>
            </label>
          </div>
          <button
            onClick={handleLogout}
            className=" mt-6 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-dark200 rounded-md hover:bg-dark100 focus:outline-none focus:bg-dark100 focus:cursor-wait"
          >
            Logout
          </button>
          <Link to="/update-account">
            <button className=" mt-6 w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-dark200 rounded-md hover:bg-dark100 focus:outline-none focus:bg-dark100 focus:cursor-wait">
              Update Account
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Account;
