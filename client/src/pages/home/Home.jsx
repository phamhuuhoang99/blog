import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { axiosInstance } from "../../config";
import { useLocation } from "react-router-dom";

import "./home.css";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    try {
      const getPosts = async () => {
        const res = await axiosInstance.get("/posts" + search);
        setPosts(res.data);
      };

      getPosts();
    } catch (error) {}
  }, [search]);
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
};

export default Home;
