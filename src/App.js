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
import { useAuth } from "./contexts/AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import LoggedRoute from "./Components/LoggedRoute";
import ForgotPassword from "./Components/ForgotPassword";


import { ChakraProvider } from "@chakra-ui/react";
import SetupProfile from "./Components/SetupProfile";
// import UpdateAccount from "./Components/UpdateAccount";

function App() {
  return (
    <>
      <ChakraProvider>
        <AuthProvider>
          <ContentBox />
        </AuthProvider>
      </ChakraProvider>
    </>
  );
}

const ContentBox = () => {
  const { currentUser } = useAuth();
  return (
    <main className="fixed h-screen w-screen overflow-hidden">
      <Router>
        {/* {currentUser && <Sidebar />} */}
        <Routes>
          <Route element={<LoggedRoute currentUser={currentUser} />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>
          {/* <Route path="/update-account" element={<UpdateAccount />} /> */}
          <Route element={<PrivateRoute currentUser={currentUser} />}>
            <Route path="/courses" element={<Courses />} />
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/account" element={<Account />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/setup" element={<SetupProfile />} />
          </Route>
        </Routes>
      </Router>
    </main>
  );
};
export default App;
