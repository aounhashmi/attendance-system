import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import About from "./pages/About.jsx";
import Analytics from "./pages/Analytics.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar>
        <Routes>
          <Route path="/" element={<About />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </Sidebar>
    </QueryClientProvider>
  );
};

export default App;
