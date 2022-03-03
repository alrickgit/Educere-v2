import React, { useRef,useState } from "react";
import ErrorAlert from "./ErrorAlert";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import bgImg from "../css/bg.jpg";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  // const roleRef = useRef();
  const {signup}=useAuth();
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }
  return (
    <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-xl lg:max-w-4xl my-auto">
      <div className="hidden bg-cover lg:block lg:w-1/2">
        <img src={bgImg} alt="" className="mt-10 mx-4" />
      </div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <h2 className="text-2xl font-semibold text-center text-textDark300">
          Register
        </h2>
        <hr className="mt-3 border-b border-gray-200" />
        {error && <ErrorAlert text={error}/>}
        <form onSubmit={handleSubmit}>
        <div className="mt-4">
          <label
            className="block mb-2 text-sm font-medium text-textDark300 "
            htmlFor="LoggingEmailAddress"
          >
            Email Address
          </label>
          <input
            id="LoggingEmailAddress"
            className="block w-full px-4 py-2 text-textDark300 bg-white border rounded-md border-gray-600 focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300"
            type="email"
            ref={emailRef} required
          />
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium text-textDark300 "
              htmlFor="loggingPassword"
            >
              Password
            </label>
          </div>

          <input
            id="loggingPassword"
            className="block w-full px-4 py-2 text-textDark300 bg-white border rounded-md border-gray-600 focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            type="password"
            ref={passwordRef} required
          />
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium text-textDark300 "
              htmlFor="loggingPasswordConfirm"
            >
              Confirm Password
            </label>
          </div>

          <input
            id="loggingPasswordConfirm"
            className="block w-full px-4 py-2 text-textDark300 bg-white border rounded-md border-gray-600 focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            type="password"
            ref={passwordConfirmRef} required
          />
        </div>

        {/* <div className="mt-4">
          <div className="flex justify-between">
            <label
              className="block mb-2 text-sm font-medium text-textDark300 "
              htmlFor="role"
            >
              Role
            </label>
          </div>
          <select
            name="role"
            id="role"
            required
            ref={roleRef}
            className="block w-full px-4 py-2 text-textDark300 bg-white border rounded-md border-gray-600 focus:border-blue-400 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
        </div> */}

        <div className="mt-8">
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-dark200 rounded hover:bg-dark100 focus:outline-none focus:bg-dark100 focus:cursor-wait" disabled={loading}>
            Sign Up
          </button>
        </div>
        </form>

        <p className="mt-6 text-xs font-medium text-center text-textDark200">
          {" "}
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-textDark300 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Register;
