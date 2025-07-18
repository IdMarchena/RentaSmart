import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";
import { Publications } from "../pages/Publications";
import { Publication } from "../pages/Publication";

export const AppsRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publications" element={<Publications />} />
      <Route path="/publication" element={<Publication />} />
    </Routes>
  );
};
