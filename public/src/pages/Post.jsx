import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SubmissionRoute, updateSubmissionRoute} from '../utils/APIRoutes';
import NavbarComponent from '../components/Navbar';
import styled from "styled-components";
import { Collapse } from 'react-bootstrap';
import { FaChevronDown } from 'react-icons/fa';

const PostPage = () => {
  const [posts, setPosts] = useState([]);
  const [openCollapse, setOpenCollapse] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(SubmissionRoute);
      setPosts(response.data.submissions);
    };
    fetchPosts();
  }, []);

  return (
    <>
      <NavbarComponent />
      <Container>
      <div className='scroll-container'>
      <h1>Posts</h1>
      <div className="container mt-4">
        <div className="row">
          {posts.map((post, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={post._id}>
              <div className="card" >
                <img
                  src={`/api/upload/${post.data}`}
                  className="card-img-top"
                  alt="#"
                  style={{ objectFit: 'cover', height: '80%' ,width:'100%'}}
                />
                <div className="card-body" >
                  <button
                    className="description-button "
                    onClick={() => setOpenCollapse(openCollapse === index ? null : index)}
                    onDoubleClick={() => setOpenCollapse(null)}
                  >
                    Read More<FaChevronDown className={`arrow ${openCollapse === index ? 'up' : ''}`} />
                  </button>
                  <Collapse in={openCollapse === index}>
                    <div className="desc">
                      <p className="card-text font-weight-bold bg-success text-white">
                        {post.description}
                      </p>
                    </div>
                  </Collapse>
                  <button
                    className={`btn btn-${
                      post.liked ? 'danger' : 'outline-secondary'
                    } m-3 float-right`}
                    onClick={async () => {
                      const updatedPost = { ...post };
                      updatedPost.liked = !updatedPost.liked;
                      updatedPost.likes += updatedPost.liked ? 1 : -1;
                      await axios.put(
                        updateSubmissionRoute(updatedPost._id),
                        { _id: updatedPost._id, likes: updatedPost.likes }
                      );
                      setPosts((prevPosts) =>
                        prevPosts.map((p) =>
                          p._id === updatedPost._id ? updatedPost : p
                        )
                      );
                    }}
                  >
                    {post.likes} Likes
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      </Container>
    </>
  );
};

export default PostPage;

const Container = styled.div`
.scroll-container {
  scroll-behavior: smooth;
  overflow-y: scroll;
  height:90vh;
}
.card {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  margin-bottom: 30px;
  border: 1px solid #ddd;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  height: 80%;
  width: 100%;
  object-fit: cover;
}
.card {
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  margin-bottom: 30px;
  border: 1px solid #ddd;
}

.card-body {
  position: relative;
  left: 0;
  right: 0;
  padding: 10px;
  border-radius: 1px;
  background-color: white;
  color: black;
  transition: height 0.3s ease;
  margin-top: auto;
}

.card-text {
  font-weight: bold;
  background-color: #28a745;
  color: #fff;
  text-align: center;
  padding: 5px;
  cursor: pointer;
}

.card-text:hover {
  background-color: #218838;
}

.collapse-card-body {
  height: 0;
  overflow: visible;
  transition: height 0.3s ease;
}

.collapse-card-body.show {
  height: 50%;
  overflow: visible;
  z-index: 1;
}

.description-button {
  background-color: transparent;
  border: none;
  outline: none;
  color: #28a745;
  font-size: 20px;
  cursor: pointer;
}
.like-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  outline: none;
  color: #28a745;
  font-size: 20px;
  cursor: pointer;
}
.like-btn:hover {
  color: #198754;
}

.like-btn.liked {
  color: #dc3545;
};`