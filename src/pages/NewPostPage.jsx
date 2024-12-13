import { useState, useEffect } from "react";
import { usePosts } from "../contexts/PostsContext";

const initialPostData = {
  title: "",
  content: "",
  image: "",
  category: "sport",
  published: true,
  id: -1,
};

export default function NewPostPage() {
  const [articleFormData, setArticleFormData] = useState(initialPostData);
  const [isBeingModified, toggleIsBeingModified] = useState(false);
  const [selectedPost, setSelectedPost] = useState(initialPostData);

  const { posts, storeData, updateData } = usePosts();

  //HANDLERS
  const handleArticleFormData = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setArticleFormData((formData) => ({
      ...formData,
      [e.target.name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    const { title, content, image, published, category } = articleFormData;
    //l'id è assegnato da una funzione nel server
    if (!title || !content) {
      //non controllo il resto dei campi perchè sono presenti opzioni di default / sostitutive nel caso dell'immagine
      alert("Sono presenti dei campi non compilati");
      return;
    }

    e.preventDefault();
    if (!isBeingModified) {
      storeData(articleFormData);
    } else {
      console.log(selectedPost);
      updateData(selectedPost.id, {
        title,
        content,
        image,
        published,
        category,
      });
    }

    setArticleFormData(initialPostData);
  };

  const handleModificationCheckbox = () => {
    if (isBeingModified) {
      toggleIsBeingModified(false);
    } else {
      toggleIsBeingModified(true);
      setArticleFormData(selectedPost);
    }
  };

  const handleSelectedPostChange = (id) => {
    const currentPost = posts.find((post) => post.id === parseInt(id, 10));
    setSelectedPost(currentPost);
    setArticleFormData(currentPost);
  };

  //DOM
  return (
    <div className="container p-5 text-light row-cols-2 d-flex">
      <form onSubmit={handleFormSubmit} className="col-6 mx-3">
        {/* titolo */}
        <div className="mb-3">
          <label htmlFor="post-title" className="form-label">
            Titolo
          </label>
          <input
            type="text"
            className="form-control"
            id="post-title"
            name="title"
            value={articleFormData.title}
            onChange={handleArticleFormData}
          />
        </div>
        {/* contenuto */}
        <div className="mb-3">
          <label htmlFor="post-content" className="form-label">
            Contenuto
          </label>
          <input
            type="textarea"
            className="form-control"
            id="post-content"
            name="content"
            value={articleFormData.content}
            onChange={handleArticleFormData}
          />
        </div>
        {/* immagine */}
        <div className="mb-3">
          <label htmlFor="post-image" className="form-label">
            Immagine
          </label>
          <input
            type="text"
            className="form-control"
            id="post-image"
            name="image"
            value={articleFormData.image}
            onChange={handleArticleFormData}
          />
        </div>
        {/* categoria */}
        <div className="mb-3">
          <label htmlFor="post-category" className="form-label">
            Categoria
          </label>
          <select
            className="form-select"
            name="category"
            value={articleFormData.category}
            onChange={handleArticleFormData}
            id="post-category"
          >
            <option value="music">Musica</option>
            <option value="news">News</option>
            <option value="gaming">Gaming</option>
            <option value="sport">Sport</option>
            <option value="politics">Politica</option>
          </select>
        </div>
        {/* stato pubblicazione */}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="post-published-state"
            name="published"
            checked={articleFormData.published}
            onChange={handleArticleFormData}
          />
          <label className="form-check-label" htmlFor="post-published-state">
            Pubblica
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {/* modifica un post esistente */}
      <div className="col-6 mx-3">
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="post-modification-state"
            name=""
            checked={isBeingModified}
            onChange={handleModificationCheckbox}
          />
          <label className="form-check-label" htmlFor="post-modification-state">
            Modifica un post esistente
          </label>
        </div>
        <div className={`mb-3 ${isBeingModified ? "" : "d-none"}`}>
          <label htmlFor="post-list" className="form-label">
            Lista dei post per id
          </label>
          <select
            className="form-select"
            name="id"
            value={selectedPost.id}
            id="post-list"
            onChange={(e) => {
              handleSelectedPostChange(e.target.value);
            }}
          >
            {posts.map((post) => (
              <option value={post.id} key={post.id}>
                {post.id}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
