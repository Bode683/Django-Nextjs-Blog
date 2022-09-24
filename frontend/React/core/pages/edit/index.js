import { Typography } from "@mui/material";
import React from "react";
// import AddPost from "../components/AddPost";
// import PostForm from "../components/PostForm";
import Tags from "../../components/Tags";
// import UserForm from "../components/UserForm";

const EditPost = ({ postData }) => {
  console.log(postData);
  return (
    <div className="container">
      <Typography variant="h3">Update Post </Typography>
      <Tags />
    </div>
  );
};
export default EditPost;
