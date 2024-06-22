import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";
import Home from "./Home.jsx";
import Match from "./Match.jsx";
import About from "./About.jsx";
import AllUser from "./AllUser.jsx";
import StartMatch from "./StartMatch.jsx";
import Todo from "./components/todo.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/auth-context.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";
import ForgotReq from "./components/password/ForgotReq.jsx";
import SetPW from "./components/password/SetPW.jsx";
import ChangePW from "./components/password/ChangePW.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path='forgot-password/:token' element={<SetPW />}></Route>
          <Route path="/forgot-password" element={<ForgotReq />}></Route>
          <Route path="/start-match" element={
              <ProtectedRoute><StartMatch /></ProtectedRoute>
            } />
          <Route path="/all-user" element={
              <ProtectedRoute><AllUser /></ProtectedRoute>
            } />
          <Route path="/home" element={
              <ProtectedRoute><Home /></ProtectedRoute>
            } />
          <Route path="/match" element={
              <ProtectedRoute><Match /></ProtectedRoute>
            } />
          <Route path="/change-password" element={
              <ProtectedRoute><ChangePW /></ProtectedRoute>
          } />
          <Route path="/todo" element={
              <ProtectedRoute>\<Todo /></ProtectedRoute>
            } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
