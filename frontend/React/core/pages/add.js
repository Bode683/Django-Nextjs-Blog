import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "../components/Pagination/PostPagination";
import PostPagination from "../components/Pagination/PostPagination";
const AddStudent = ({ data }) => {
  // const navigate = useNavigate();
  const initialData = {
    title: "",
    image: null,
    description: "",
    category: "",
  };
  const [formData, setFormData] = useState(initialData);

  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState(null);
  const [category, setCategory] = useState(3);
  const [author, setAuthor] = useState(1);

  const addNewStudent = async () => {
    let formField = new FormData(form);
    formField.append("title", title);
    formField.append("description", description);
    formField.append("category", category);
    formField.append("author", author);
    // formField.append("phone", phone);
    //entries()
    if (image !== null) {
      formField.append("image", image);
    }
    new Response(formField).text().then(console.log);
    for (const value of formField.values()) {
      console.log(value);
    }

    await axios({
      method: "post",
      url: "http://127.0.0.1:8000/posts/create",
      data: formField,
    }).then((response) => {
      console.log(response.data);
      //   navigate.push("/");
    });
  };

  return (
    <div className="container">
      <div className="container">
        <div className="w-75 mx-auto shadow p-5">
          <h2 className="text-center mb-4">Add Post</h2>

          <form id="form">
            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter the title..."
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Write your story..."
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="textarea"
                className="form-control form-control-lg"
                placeholder="Select category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            {/* <div className="form-group">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Enter Your address Name"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div> */}
          </form>
          <button className="btn btn-primary btn-block" onClick={addNewStudent}>
            Add Post
          </button>
        </div>
        <PostPagination data={data} />
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/posts/");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}
export default AddStudent;
