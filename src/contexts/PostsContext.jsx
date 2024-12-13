import { createContext, useContext } from "react";

const PostsContext = createContext();

export const PostsProvider = ({ children }) => {
  //lista dei post momentanea per verificare funzioni, da  sostituire con la chiamata all'api
  const posts = [
    {
      id: 1,
      title: "Lorem",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit animi perspiciatis consequuntur vero at necessitatibus nostrum blanditiis, natus eum? Numquam nulla asperiores cumque, repudiandae odit alias aliquam nihil earum commodi.",
      image: "",
      published: true,
      category: "music",
    },
    {
      id: 2,
      title: "Ipsum",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit animi perspiciatis consequuntur vero at necessitatibus nostrum blanditiis, natus eum? Numquam nulla asperiores cumque, repudiandae odit alias aliquam nihil earum commodi.",
      image: "",
      published: true,
      category: "sport",
    },
    {
      id: 3,
      title: "Lorem ipsum",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit animi perspiciatis consequuntur vero at necessitatibus nostrum blanditiis, natus eum? Numquam nulla asperiores cumque, repudiandae odit alias aliquam nihil earum commodi.",
      image: "",
      published: false,
      category: "news",
    },
    {
      id: 4,
      title: "Title",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit animi perspiciatis consequuntur vero at necessitatibus nostrum blanditiis, natus eum? Numquam nulla asperiores cumque, repudiandae odit alias aliquam nihil earum commodi.",
      image: "",
      published: false,
      category: "gaming",
    },
    {
      id: 5,
      title: "Default title",
      content:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sit animi perspiciatis consequuntur vero at necessitatibus nostrum blanditiis, natus eum? Numquam nulla asperiores cumque, repudiandae odit alias aliquam nihil earum commodi.",
      image: "",
      published: true,
      category: "politics",
    },
  ];

  return (
    <PostsContext.Provider value={{ posts }}>{children}</PostsContext.Provider>
  );
};

export const usePosts = () => useContext(PostsContext);
