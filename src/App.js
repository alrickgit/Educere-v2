import "./css/App.css";
import Courses from "./Components/Courses";
import Meeting from "./Components/Meeting";
import Account from "./Components/Account";
import Dashboard from "./Components/Dashboard";
import Notifications from "./Components/Notifications";
import Login from "./Components/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Components/Register";
import { AuthProvider } from "./contexts/AuthContext";
import LocalContext from "./contexts/LocalContext";
import { useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import LoggedRoute from "./Components/LoggedRoute";
import ForgotPassword from "./Components/ForgotPassword";
import Course from "./Components/Course";
import { ChakraProvider } from "@chakra-ui/react";
import SetupProfile from "./Components/SetupProfile";
import IsNewUser from "./Components/IsNewUser";
// import UpdateAccount from "./Components/UpdateAccount";

function App() {
  return (
    <>
      <ChakraProvider>
        <AuthProvider>
          <LocalContext>
            <ContentBox />
          </LocalContext>
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

const ContentBox = () => {
  const { currentUser, isNewUser } = useAuth();
  return (
    <main className="fixed h-screen w-screen overflow-hidden">
      <Router>
        {/* {currentUser && <Sidebar />} */}
        {/* {console.log(isNewUser)} */}
        <Routes>
          <Route element={<LoggedRoute currentUser={currentUser} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          {/* <Route path="/update-account" element={<UpdateAccount />} /> */}
          <Route element={<PrivateRoute currentUser={currentUser} />}>
            <Route path="/courses/*" element={<Courses />} />
            {/* <Route path="/courses/:id" element={<Course />} /> */}
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/account" element={<Account />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route element={<IsNewUser isNewUser={isNewUser} />}>
              <Route path="/setup" element={<SetupProfile />} />
            </Route>
            {/* <Route path="/setup" element={<SetupProfile />} /> */}
          </Route>
        </Routes>
      </Router>
    </main>
  );
};
export default App;
