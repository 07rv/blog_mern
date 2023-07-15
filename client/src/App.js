import "./App.css";

import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./UserContext";

import Register from "./Register";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostPage />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
