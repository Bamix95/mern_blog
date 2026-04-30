import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import CreatePostPage from "./pages/CreatePostPage";
import ProfilePage from "./pages/ProfilePage";
import EditPostPage from "./pages/EditPostPage";
import { GuestRoute } from "./components/auth/GuestRoute";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  return (
    <>
      <Toaster
        position="top-right"
        richColors
        closeButton
        style={{ fontSize: "14px", borderRadius: "12px" }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />

        <Route path="/home" element={<HomePage />} />
        <Route path="/post/:slug" element={<PostPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/write" element={<CreatePostPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/post/:slug/edit" element={<EditPostPage />} />
        </Route>

        <Route element={<GuestRoute />}>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default App;
