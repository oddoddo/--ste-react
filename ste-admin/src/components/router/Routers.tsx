import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Landing from "@/pages/landing";

const Routers: React.FC = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="landing" element={<Landing />} />
      </Route>
    </Routes>
  );
};

export default Routers;
