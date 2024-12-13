import { createContext, useContext, useState, useEffect } from "react";

const PostsContext = createContext();

const initialPostData = {
  title: "Default title",
  content: "Default content",
  image: "https://via.placeholder.com/600/771796",
  category: "Sport",
  published: true,
  id: -1,
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([initialPostData]);

  const getPosts = () => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => console.error("Errore nella richiesta SHOW :", error));
  };

  useEffect(getPosts, []);

  const deleteData = (id) => {
    fetch("http://localhost:3000/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok)
          throw new Error("Errore nella cancellazione dell'articolo");
        return res.json();
      })
      .then((data) => {
        console.log(`L'oggetto con ID ${id} è stato eliminato con successo`);
        return data;
      })
      .catch((error) =>
        console.error("Errore nella richiesta DELETE :", error)
      );
  };

  return (
    <PostsContext.Provider value={{ posts, deleteData }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
