import "./index.css";
import "./App.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner.tsx";

const HomePage = lazy(() => import("./components/HomePage/HomePage.tsx"));
const LandingPage = lazy(
  () => import("./components/LandingPage/LandingPage.tsx")
);
const RegionPage = lazy(() => import("./components/RegionPage/RegionPage.tsx"));
const SongPage = lazy(() => import("./components/SongPage/SongPage.tsx"));
const LoginPage = lazy(() => import("./components/LoginPage/LoginPage.tsx"));
const RegistrationPage = lazy(
  () => import("./components/RegistrationPage/RegistrationPage.tsx")
);
const AddMusicPage = lazy(
  () => import("./components/AddMusicePage/AddMusicPage.tsx")
);
const PorfilePage = lazy(
  () => import("./components/ProfilePage/PorfilePage.tsx")
);
const TokenAuth = lazy(() => import("./components/TokenAuth/TokenAuth.tsx"));
const ApprovalPage = lazy(
  () => import("./components/ApprovalPage/ApprovalPage.tsx")
);
const PageNotFound = lazy(
  () => import("./components/PageNotFound/PageNotFound.tsx")
);

function App() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Toaster />
        <Routes>
          <Route path="/">
            <Route path="" element={<LandingPage />}></Route>
            <Route path="/music">
              <Route index element={<HomePage />} />
              <Route path=":region" element={<RegionPage />} />
            </Route>
            <Route path="songs">
              <Route index element={<HomePage />} />
              <Route path=":id" element={<SongPage />} />
              <Route path="approval" element={<ApprovalPage />} />
            </Route>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/addmusic" element={<AddMusicPage />} />
            <Route path="/profile" element={<PorfilePage />} />
            <Route path="/verify/:token" element={<TokenAuth />} />
            <Route path="/*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
