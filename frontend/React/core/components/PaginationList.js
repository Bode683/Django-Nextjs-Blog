import { useState, useEffect } from "react";
import PostList from "../components/postList";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import { Box, Grid, List, ListItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "2rem",
  },

  searchForm: {
    margin: "auto",
    paddingBottom: "10px",
    display: "flex",
    justifyContent: "center",
  },
}));

const PaginationList = ({
  postData,
  per_page,
  ClientURL,
  FilterURL,
  ServerURL,
}) => {
  const router = useRouter();
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState(postData.results);
  const [nextLink, setNextLink] = useState(postData.next);
  const [prevLink, setPrevLink] = useState(postData.previous);

  const count = Math.ceil(postData.count / per_page);
  const handleChange = (event, value) => {
    setPage(value);
    router.push(`${ClientURL}?page=${value}`, undefined, {
      shallow: true,
    });
  };

  useEffect(() => {
    fetch(`${ServerURL}?page=${page}`)
      .then((response) => response.json())
      .then((json) => {
        console.log("json", json);
        setPosts(json.results);
        setPrevLink(json.previous);
        setNextLink(json.next);
      });
  }, [page]);

  return (
    <Box>
      <div>
        <Grid spacing={2}>
          <PostList posts={posts} />
        </Grid>
      </div>
      <Stack className={classes.paginationContainer} spacing={2}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Stack>
    </Box>
  );
};

export default PaginationList;
