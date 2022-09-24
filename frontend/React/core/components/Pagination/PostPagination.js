import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/router";
import PostList from "../postList";
import { Box, List, Grid, ListItem, Divider } from "@mui/material";
import usePagination from "./HandleData";
// import { default as data } from "./MOCK_DATA.json";

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

const PostPagination = ({ data }) => {
  const router = useRouter();
  const classes = useStyles();

  let [page, setPage] = useState(1);
  const PER_PAGE = 6;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  console.log(data);
  return (
    <Box p="5">
      <Grid container spacing={2}>
        <PostList posts={_DATA.currentData()} />
      </Grid>
      <Stack className={classes.paginationContainer} spacing={2}>
        <Pagination
          count={count}
          page={page}
          variant="outlined"
          shape="rounded"
          color="primary"
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
};

export default PostPagination;
