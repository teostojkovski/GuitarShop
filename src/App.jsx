import React from "react";
import { Routes, Route } from "react-router-dom";
import Brands from "./pages/Brands";
import Models from "./pages/Models";
import GuitarDetails from "./pages/GuitarDetails";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Brands />} />
      <Route path="/models/:brandId" element={<Models />} />
      <Route path="/details/:brandId/:modelId" element={<GuitarDetails />} />
    </Routes>
  );
};

export default App;
