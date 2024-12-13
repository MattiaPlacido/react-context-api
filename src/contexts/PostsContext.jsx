import { createContext, useContext, useState, useEffect } from "react";

const PostsContext = createContext();

const initialPostData = {
  title: "Placeholder title",
  content: "Placeholder content",
  image: "https://via.placeholder.com/600/771796",
  category: "Sport",
  published: true,
  id: -1,
};

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([initialPostData]);

  //show
  const getPosts = () => {
    fetch("http://localhost:3000")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.posts);
      })
      .catch((error) => console.error("Errore nella richiesta SHOW :", error));
  };

  useEffect(getPosts, []);

  //delete
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

  // STORE
  const storeData = (item) => {
    fetch("http://localhost:3000/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(item),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Errore nell'aggiunta dell'articolo");
        return res.json();
      })
      .then((data) => {
        console.log(`L'articolo è stato aggiunto con successo:`, data);
      })
      .catch((error) => console.error("Errore nella richiesta POST :", error));
  };

  //update
  const updateData = (id, updatedData) => {
    fetch(`http://localhost:3000/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedData),
    });
  };

  return (
    <PostsContext.Provider value={{ posts, deleteData, storeData ,updateData}}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
