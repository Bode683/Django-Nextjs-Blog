import { Typography } from "@mui/material";
import React from "react";
// import AddPost from "../components/AddPost";
// import PostForm from "../components/PostForm";
import UpdatePost from "../../components/UpdatePost";
// import UserForm from "../components/UserForm";

const EditPost = ({ postData }) => {
  console.log(postData);
  return (
    <div className="container">
      {/* <Typography variant="h3">Update Post {postData.id}</Typography> */}
      <UpdatePost postData={postData} />;
    </div>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(
    `http://127.0.0.1:8000/posts/retrieve/${context.params.id}`
  );

  const postData = await res.json();

  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`http://127.0.0.1:8000/posts/`);

  const articles = await res.json();
  const ids = articles.map((article) => article.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};
export default EditPost;
