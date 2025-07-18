import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Publications } from "../pages/Publications";

export const AppsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publications" element={<Publications />} />
    </Routes>
  );
};
