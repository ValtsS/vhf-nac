import { Route, Routes } from "react-router-dom";
import { ErrorPage } from "./routes/error-page";
import All from "./pages/all";
import DetailsPage from "./pages/details";
import { AboutPage } from "./pages/about";
import { Layout } from "./components/Layout";

export const NACApp = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <All />
          </Layout>
        }
      />
      <Route
        path="/details/:id"
        element={
          <Layout>
            <DetailsPage />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />
      <Route path="*" element={<ErrorPage error={new Error("Error 404")} />} />
    </Routes>
  );
};
