import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetAvatar from "./components/SetAvatar";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Event from "./pages/EventCalendar";
import Leaderboard from "./pages/Leaderboard";
import Submission from "./pages/Submission";
import Post from "./pages/Post";
import Reward from "./pages/Reward";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact="true" path="/register" element={<Register />} />
        <Route exact="true" path="/login" element={<Login />} />
        <Route exact="true" path="/home" element={<Home />} />
        <Route exact="true" path="/setAvatar" element={<SetAvatar />} />
        <Route exact="true" path="/" element={<Chat />} />
        <Route exact="true" path="/event" element={<Event />} />
        <Route exact="true" path="/leaderboard" element={<Leaderboard />} />
        <Route exact="true" path="/submission" element={<Submission />} />
        <Route exact="true" path="/post" element={<Post />} />
        <Route exact="true" path="/Reward" element={<Reward/>}/>
      </Routes>
    </BrowserRouter>
  );
}
