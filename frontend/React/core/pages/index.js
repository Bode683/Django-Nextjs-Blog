import { useState, useRef } from "react";
import axios from "axios";
import PostList from "../components/postList";
import { Container, Paper, Box } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import Stack from "@mui/material/Stack";
import Search from "../components/Search/Search";
import CategoryList from "../components/CategoryList";
import PaginationList from "../components/PaginationList";
import Newsletter from "../components/Newsletter";
import Category from "../components/Category";
import PostPagination from "../components/Pagination/PostPagination";

const useStyles = makeStyles((theme) => ({
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },

  searchForm: {
    margin: "auto",
    paddingBottom: "10px",
    display: "flex",
    justifyContent: "center",
  },
}));

function Home({ postData, posts, categories }) {
  const classes = useStyles();

  ////////////////////////PAGINATION/////////////////////////////

  ////////////////////////PAGINATION/////////////////////////////

  return (
    <Container>
      <div className="container">
        <div className={classes.searchForm}>
          <Search URL={`http://127.0.0.1:8000/posts/?`} />
        </div>
        <div>
          <Category categories={categories} />
        </div>
        <div>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <PostPagination data={postData} />
              </Grid>
            </Grid>
          </Box>
        </div>
        <div>
          <Newsletter />
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/posts/");
  const cat = await fetch("http://127.0.0.1:8000/categories/");
  const postData = await res.json();
  const categories = await cat.json();

  return {
    props: {
      postData,
      categories,
    },
  };
}
export default Home;
