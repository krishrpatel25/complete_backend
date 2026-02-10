import React, { useEffect, useState } from "react";
import axios from "axios";
const Feed = () => {
  const [posts, setPosts] = useState([
    {
      _id: "01",
      image: "https://ik.imagekit.io/zcgb4pdmf/image_wJt0AmnHB.jpg",
      caption:
        "Minimalism isn't just a design choice; it's a way of thinking. 🕊️",
    },
  ]);

  useEffect(() => {
    axios.get("http://localhost:3000/posts")
      .then((res) => {
     setPosts(res.data.posts)
      
    })
  }, []);

  return (
    <section className="feed-container">
      <div className="card-stack">
        {posts.map((post) => (
          <div key={post._id} className="post-card">
            <div className="card-image">
              <img src={post.image} alt="Post content" loading="lazy" />
            </div>
            <div className="card-content">
              <p>{post.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Feed;
