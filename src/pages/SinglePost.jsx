import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const initialPostData = {
  title: "Default title",
  content: "Default content",
  image: "https://via.placeholder.com/600/771796",
  category: "Sport",
  published: true,
  id: -1,
};

export default function SinglePost() {
  const { id } = useParams();
  const [currentPost, setCurrentPost] = useState([initialPostData]);

  const getData = () => {
    fetch("http://localhost:3000/" + id)
      .then((res) => {
        if (!res.ok) {
          if (res.status === 404) goToPage("/not-found");
          throw new Error("Qualcosa è andato storto");
        }
        return res.json();
      })
      .then((data) => {
        setCurrentPost(data);
      })
      .catch((error) => console.error("Errore nella richiesta SHOW :", error));
  };

  useEffect(getData, []);

  return (
    <main className="container d-flex flex-column align-items-center py-5">
      <p className="fs-1 text-light mb-4">Stai guardando il post id: {id}</p>
      <div className="card h-50 w-50">
        <img
          src={currentPost.image || "https://via.placeholder.com/600/771796"}
          className="card-img-top"
        />
        <div className="card-body text-dark">
          <h5 className="card-title">
            {currentPost.title || "Titolo non disponibile"}
          </h5>
          <p className="card-text fs-6">
            {currentPost.content || "Contenuto non disponibile"}
          </p>
          <span class="badge rounded-pill text-bg-dark mx-2">
            {currentPost.category}
          </span>
          <span
            className={`badge rounded-pill ${
              currentPost.published
                ? "text-black bg-white border border-dark"
                : "text-white bg-dark"
            }`}
          >
            {currentPost.published ? "Pubblicato" : "Non pubblicato"}
          </span>
        </div>
      </div>
    </main>
  );
}
