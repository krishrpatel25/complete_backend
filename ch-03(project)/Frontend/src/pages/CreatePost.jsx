import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    await axios
      .post("http://localhost:3000/create-posts", formData)
      .then((res) => {
       navigate("/")
      })
      .catch((err) => {
        console.log(err);
        alert("Error creating post");
      });
  };

  return (
    <section className="create-post-wrapper">
      <div className="create-post-box">
        <h2>Create Post</h2>

        <form className="create-post-form" onSubmit={handleSubmit}>
          <input
            type="file"
            name="image"
            accept="image/*"
            
          />

          <input
            type="text"
            name="caption"
            placeholder="Enter caption"
          />

          <button type="submit">Create Post</button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
