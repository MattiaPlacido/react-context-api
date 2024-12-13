import { useState, useEffect } from "react";
import styles from "./postPage.module.css";
import { Link } from "react-router-dom";

const initialPostData = {
  title: "Default title",
  content: "Default content",
  image: "https://via.placeholder.com/600/771796",
  category: "Sport",
  published: true,
  id: -1,
};

export default function PostsPage() {
  const [postData, setPostData] = useState([initialPostData]);

  const getData = () => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => {
        setPostData(data.posts);
      })
      .catch((error) => console.error("Errore nella richiesta SHOW :", error));
  };

  useEffect(getData, []);

  const deleteData = (id) => {
    fetch("http://localhost:3000/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Errore nella cancellazione dell'articolo");
        return res.json();
      })
      .then(() => {
        console.log(`L'oggetto con ID ${id} è stato eliminato con successo`);
        setPostData(() => postData.filter((post) => post.id !== id));
      })
      .catch((error) =>
        console.error("Errore nella richiesta DELETE :", error)
      );
  };

  const handleDeleteButton = (id) => {
    deleteData(id);
  };

  return (
    <main className="container py-5">
      <div className="row row-cols-2 gx-0">
        {postData.map((post) => (
          <div
            className={`card col-5 position-relative m-3 ${
              post.published ? "" : "opacity-50"
            }`}
            key={post.id}
          >
            <button
              type="button"
              className={"btn position-absolute " + styles.delete_button}
              onClick={() => handleDeleteButton(post.id)}
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
