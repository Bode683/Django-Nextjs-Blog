import React, { useState } from "react";
import axios from "axios";
import { Container, Grid, IconButton } from "@mui/material";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { CardActions } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { Divider } from "@mui/material";
import { Avatar } from "@mui/material";
import { Button } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ConfirmDialog from "../ConfirmDialog";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: "25px, auto",
    // marginLeft: "25px",
    // maxWidth: "90vw",
    // color: "red",
    // paddingBottom: "20px",
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
    backgroundColor: theme.palette.body_bg.main,
  },
  cardActions: {
    display: "flex",
    // margin: "0 10px",
    justifyContent: "space-between",
  },
}));

const MyPostCard = (posts) => {
  const classes = useStyles();

  const DATE_OPTIONS = {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const [confirmOpen, setConfirmOpen] = useState(false);
  // const User = () => {
  const router = useRouter();
  // const { pid } = router.query;
  // const query = router.query;

  // const pid = query.id.toString();
  // return <p>User: {id}</p>
  // }
  // export default User

  // const params = useParams();
  // console.log(params);
  const deletePost = async (id) => {
    console.log(id);
    if (window.confirm(`Delete this post? ID:${id}`)) {
      const response = await axios
        .delete(`http://127.0.0.1:8000/posts/${id}/`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      router.replace("/myposts");
    }
  };
  const updatePost = (id) => {
    router.replace(`http://localhost:3000/edit/${id}/`);
  };
  return (
    <div>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Grid container spacing={3}>
          {posts.posts.map((post) => (
            <Grid item xs={12} sm={6} md={4} key={post.id}>
              <Card className={classes.card} variant="outlined">
                <Link href="/post/[id]" as={`/post/${post.id}/`}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.CardMedia}
                      image={post.image}
                    ></CardMedia>
                    <CardContent>
                      <Box>
                        <Typography variant="h5">{post.title}</Typography>
                      </Box>
                      <Divider style={{ paddingBottom: "4px " }} />
                      <Box>
                        <Typography color="textSecondary">
                          {post.description.substr(0, 80)}...
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions className={classes.cardActions}>
                  <Box
                    display="flex"
                    alignItems="center"
                    // width={400}
                    justifyContent="space-between"
                  >
                    <Box display="flex" alignItems="center" m={1}>
                      <Avatar src="" />
                      <Box m={1}>
                        <Typography variant="subtitle2" component="p">
                          {post.author}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="textSecondary"
                          component="p"
                        >
                          {new Date(post.created_at).toLocaleDateString(
                            "en-US",
                            DATE_OPTIONS
                          )}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      display="flex"
                      justifyContent="center"
                      // sx={{
                      //   ml: { xs: 12, sm: 6, md: 6, lg: 6 },
                      // }}
                    >
                      <IconButton
                        title="Delete"
                        color="error"
                        // onClick={() => {
                        //   setConfirmOpen(true);
                        //   console.log("Middle ID", post.id);
                        // }}
                        onClick={() => {
                          deletePost(post.id);
                          console.log("Update ID", post.id);
                        }}
                      >
                        <DeleteRoundedIcon />
                      </IconButton>
                      <IconButton
                        title="Update"
                        color="primary"
                        onClick={() => {
                          updatePost(post.id);
                          console.log("Update ID", post.id);
                        }}
                      >
                        <EditRoundedIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </CardActions>
                <Box>
                  <ConfirmDialog
                    title="Delete Post?"
                    open={confirmOpen}
                    setOpen={setConfirmOpen}
                    onConfirm={() => {
                      deletePost(post.id);
                      console.log("Delete ID", post.id);
                    }}
                  >
                    Are you sure you want to delete this post? {post.id}
                  </ConfirmDialog>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default MyPostCard;
