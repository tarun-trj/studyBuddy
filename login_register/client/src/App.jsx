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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<About />}></Route>
          <Route path="/start-match" element={<StartMatch />}></Route>
          <Route path="/all-user" element={<AllUser />}></Route>
          <Route path="/register" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/match" element={<Match />}></Route>
          <Route
            path="/todo"
            element={
              <ProtectedRoute>
                <Todo />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
