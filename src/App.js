import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddBlog from "./components/AddBlog";
import EditBlog from "./components/EditBlog";
import Header from "./components/Header";
import ListBlogs from "./components/ListBlogs";
import Login from "./components/Login";
import Register from "./components/Register";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ListBlogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/edit/:id" element={<EditBlog />} />
          <Route path="/addBlog" element={<AddBlog />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
