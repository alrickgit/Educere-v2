import React, { useRef,useState } from "react";
import ErrorAlert from "./ErrorAlert";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate,Link } from "react-router-dom";

const UpdateAccount = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const {updateuserPassword,currentUser,updateuserEmail}=useAuth();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

   function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateuserEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updateuserPassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate("/")
      })
      .catch(() => {
        setError("Failed to update account")
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <div className="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-xl">
      <h1 className="text-3xl font-semibold text-center text-textDark300 ">
        Update Account
      </h1>
      <hr className="mt-3 border-b border-gray-200" />
      {error && <ErrorAlert text={error}/>}

      <form className="mt-6" onSubmit={handleSubmit}>
        {/* <div>
          <label htmlFor="username" className="block text-sm text-textDark300">
            Email
          </label>
          <input
            type="email"
            className="block w-full px-4 py-2 mt-2 text-textDark300  bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            ref={emailRef}
            required
          />
        </div> */}

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm text-textDark300 "
            >
              Password
            </label>
          </div>

          <input
            type="password"
            className="block w-full px-4 py-2 mt-2 text-textDark300 bg-white border rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            ref={passwordRef}
          />
        </div>
        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm text-textDark300 "
              htmlFor="loggingPasswordConfirm"
            >
              Confirm Password
            </label>
          </div>

          <input
            id="loggingPasswordConfirm"
            className="block w-full px-4 py-2 mt-2 text-textDark300 bg-white border rounded-md  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            type="password"
            ref={passwordConfirmRef}
          />
        </div>

        <div className="mt-6">
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-dark200 rounded-md hover:bg-dark100 focus:outline-none focus:bg-dark100 focus:cursor-wait" disabled={loading}>
            Update
          </button>
        </div>
      </form>
      <p className="mt-6 text-xs font-medium text-center text-textDark200">
        <Link
          to="/account"
          className="font-medium text-textDark300 hover:underline"
        >
          Cancel
        </Link>
      </p>
    </div>
  );
};

export default UpdateAccount;

