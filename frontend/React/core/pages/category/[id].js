import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useNavigate, useParams } from "react-router";
import PostPagination from "../../components/Pagination/PostPagination";

//////////
import { Container, Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { Divider } from "@mui/material";
import { Avatar } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import { Router, useRouter } from "next/router";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({}));

const Articles = ({ postData, category }) => {
  const classes = useStyles();
  // const router = useRouter();
  // const params = useParams();
  // console.log(params);
  const style = {
    // position: "fixed",
    // top: 0,
    // left: 0,
    minWidth: "100%",
    minHeight: "100%",
  };

  console.log("post data", postData);
  return (
    <>
      <div style={style}>
        <Typography
          style={{
            textAlign: "center",
            margin: "0, auto",
          }}
          variant="h4"
        >
          {category.name}
        </Typography>
      </div>
      <div>
        <Grid item xs={9}>
          <PostPagination
            data={postData}
            // per_page={6}
            // color="primary"
            // ClientURL={`http://localhost:3000/category/${category.id}`}
            // ServerURL={`http://127.0.0.1:8000/posts/`}
            // FilterURL={`category=${category.id}`}
          />
        </Grid>
      </div>
    </>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(
    `http://127.0.0.1:8000/categories/${context.params.id}/`
  );
  const cat = await fetch(
    `http://127.0.0.1:8000/posts/?category=${context.params.id}`
  );

  const postData = await cat.json();
  const category = await res.json();
  return {
    props: {
      postData,
      category,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`http://127.0.0.1:8000/categories/`);

  const articles = await res.json();

  const ids = articles.map((article) => article.id);
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
};

export default Articles;
