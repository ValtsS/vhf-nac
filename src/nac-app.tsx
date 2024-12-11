import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "./routes/error-page";
import All from "./pages/all";
import DetailsPage from "./pages/details";

export const NACApp = () => {
  return (
    <Routes>
      <Route path="/" element={<All />} />
      <Route path="/details/:id" element={<DetailsPage />} />
      <Route path="*" element={<ErrorPage error={new Error("Error 404")} />} />
    </Routes>
  );
};
