import React from "react";
import axios from "axios";
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
import Link from "next/link";
// import { Router, useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import PaginationList from "../components/PaginationList";
import MyPostCard from "../components/Cards/MyPostCard";
import MyPostPagination from "../components/Pagination/MyPostPagination";
import Search from "../components/Search/Search";

const useStyles = makeStyles((theme) => ({
  searchForm: {
    marginBottom: 7,
  },
  blogsContainer: {
    paddingTop: theme.spacing(3),
  },
  CardMedia: {
    height: 180,
    paddingTop: "20%",
  },
  card: {
    maxWidth: "100%",
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
}));

const PostList = (posts) => {
  const classes = useStyles();
  console.log("posts", posts);
  return (
    <div>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Typography
          sx={{
            textAlign: "center",
            mb: 4,
          }}
          variant="h4"
        >
          My Posts
        </Typography>
        <div className={classes.searchForm}>
          <Search URL={`http://127.0.0.1:8000/posts/?author=1&`} />
        </div>
        <Grid item xs={9}>
          <MyPostPagination data={posts.posts} />
        </Grid>
      </Container>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/posts/?author=1");
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}

export default PostList;
