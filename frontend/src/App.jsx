import React from "react";
import { Route, Routes } from "react-router-dom";
import Start from "./pages/Start";
import UserLogin from "./pages/UserLogin";
import UserSignup from "./pages/UserSignup";
import Captainlogin from "./pages/Captainlogin";
import Captainsignup from "./pages/Captainsignup";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/userLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start />} />

        <Route path="/login" element={<UserLogin />} />

        <Route path="/signup" element={<UserSignup />} />

        <Route path="/captain-login" element={<Captainlogin />} />

        <Route path="/captain-signup" element={<Captainsignup />} />

        <Route
          path="/home"
          element={
            // sirf jo user login hai unhi ko home page pe bhejo nhi toh unko login page par redirect kar do
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />

        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />

        <Route path="/captain-home" element={
         <CaptainProtectWrapper>
         <CaptainHome />
         </CaptainProtectWrapper>
         
          } />
      </Routes>
    </div>
  );
};

export default App;
