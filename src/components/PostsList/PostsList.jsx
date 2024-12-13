import { useState, useEffect } from "react";
import styles from "./postList.module.css";
import { Link } from "react-router-dom";
import { usePosts } from "../../contexts/PostsContext";

export default function PostsList() {
  const { posts, deleteData } = usePosts();

  return (
    <main className="container py-5">
      <div className="row row-cols-2 gx-0">
        {posts.map((post) => (
          <div
            className={`card col-5 position-relative m-3 ${
              post.published ? "" : "opacity-50"
            }`}
            key={post.id}
          >
            <button
              type="button"
              className={"btn position-absolute " + styles.delete_button}
              onClick={() => {
                deleteData(post.id);
                window.location.reload();
              }}
            >
              &times;
            </button>
            <Link
              to={"/posts/" + post.id}
              type="button"
              className={"btn position-absolute bg-light " + styles.show_button}
            >
              &#128064;
            </Link>
            <img
              src={post.image || "https://via.placeholder.com/600/771796"}
              className="card-img-top mx-auto w-100 "
            />
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text fs-6">{post.content}</p>
              <span className="badge rounded-pill text-bg-dark">
                {post.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
