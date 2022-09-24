import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
// import styles from "../../styles/[id].module.css";
import { useNavigate, useParams } from "react-router";
import UpdatePost from "../../components/UpdatePost";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
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
import { useTheme, useMediaQuery } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
// import { Router, useRouter } from "next/router";
import { withStyles } from "@mui/styles";

const styles = (theme) => ({
  container: {
    paddingTop: theme.spacing(3),
    justifyContent: "center",
    alignItems: "center",
  },
  bodyText: {
    textAlign: "justify",
    [theme.breakpoints.up("sm")]: {
      fontSize: 17,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 18,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 20,
    },
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
  relatedPost: {
    margin: "30px",
  },
  mainTitle: {
    color: theme.palette.primary.main,
    fontSize: 30,
    fontWeight: 500,
    // textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: 25,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 30,
    },
  },
  relatedTitle: {
    // color: theme.palette.primary.main,
    textAlign: "center",
    fontWeight: 700,
    fontSize: 25,
  },
});

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const DATE_OPTIONS = {
  // weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const Articles = (props) => {
  const router = useRouter();
  const { classes, post, relatedPostData } = props;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [relatedPost, setRelatedPost] = useState([]);
  const [latestPost, setLatestPost] = useState([]);

  // const User = () => {
  // const router = useRouter()
  // const { pid } = router.query;
  const query = router.query;

  const pid = query.id.toString();
  // return <p>User: {id}</p>
  // }
  // export default User

  // const params = useParams();
  // console.log(params);
  const deletePost = async (pid) => {
    if (window.confirm(`Delete this post? ID:${post.id}`)) {
      const response = await axios
        .delete(`http://127.0.0.1:8000/posts/${post.id}/`)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      router.replace("/");
    }
  };
  const updatePost = (id) => {
    router.replace(`http://localhost:3000/edit/${post.id}/`);
  };
  return (
    <>
      <div className={classes.container}>
        <div className="card shadow mt-4">
          <div className="card-body">
            <Box container>
              <Box
                sx={{
                  justifyContent: "center",
                  boarder: { xs: 2, sm: 3, md: 4, lg: 6 },
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    color: theme.palette.primary.main,
                    textAlign: "center",
                    marginBottom: { xs: 3, sm: 4, md: 6, lg: 8 },
                  }}
                >
                  {post.title}
                </Typography>
                <Typography
                  sx={{
                    marginBottom: { xs: 3, sm: 4, md: 6, lg: 8 },
                    justifyContent: "center",
                    display: "flex",
                  }}
                >
                  <AccountCircleIcon color="primary" />
                  {post.author}
                  <AccessTimeIcon
                    color="primary"
                    sx={{ marginLeft: { xs: 1, sm: 1, md: 2, lg: 2 } }}
                  />
                  {new Date(post.created_at).toLocaleDateString(
                    "en-US",
                    DATE_OPTIONS
                  )}
                </Typography>
              </Box>
              <div>
                {post.image && (
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      boarderRadius: { xs: 3, sm: 4, md: 6, lg: 8 },
                      // paddingTop: { xs: 3, sm: 4, md: 6, lg: 8 },
                      paddingBottom: { xs: 3, sm: 4, md: 6, lg: 8 },
                    }}
                  >
                    <Box
                      component="img"
                      sx={{
                        height: 500,
                        width: 1060,
                        maxHeight: { xs: 280, sm: 400, md: 500, lg: 600 },
                        maxWidth: { xs: 400, sm: 700, md: 800, lg: 960 },
                      }}
                      src={post.image}
                    />
                  </Box>
                )}
              </div>
              {/* <div
                style={{
                  marginLeft: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  className={styles.detail_btn}
                  variant="outlined"
                  color="primary"
                  startIcon={<DeleteRoundedIcon />}
                  onClick={deletePost}
                >
                  Delete
                </Button>

                <Button
                  className={styles.detail_btn}
                  variant="contained"
                  color="success"
                  startIcon={<EditRoundedIcon />}
                  onClick={updatePost}
                  style={{
                    marginLeft: 50,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Update
                </Button>
              </div> */}

              <Box
                sx={{
                  marginLeft: { xs: 2, sm: 5, md: 15, lg: 25 },
                  marginRight: { xs: 2, sm: 5, md: 15, lg: 25 },
                }}
              >
                <Typography sx={{ textAlign: "justify" }}>
                  {post.description}
                </Typography>
                <div>
                  {post.sections.map((section) => {
                    return (
                      <div key={section.id}>
                        <Typography
                          variant="h4"
                          className={classes.mainTitle}
                          sx={{
                            marginTop: { xs: 2, sm: 3, md: 4, lg: 6 },
                            paddingBottom: 1,
                          }}
                        >
                          {section.title}
                        </Typography>
                        {section.media && (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              boarderRadius: { xs: 2, sm: 3, md: 4, lg: 6 },
                              paddingTop: { xs: 2, sm: 3, md: 4, lg: 6 },
                              paddingBottom: { xs: 2, sm: 3, md: 4, lg: 6 },
                            }}
                          >
                            <Box
                              component="img"
                              sx={{
                                // height: 500,
                                // width: 1060,
                                maxHeight: {
                                  xs: 280,
                                  sm: 350,
                                  md: 450,
                                  lg: 550,
                                },
                                maxWidth: {
                                  xs: 400,
                                  sm: 500,
                                  md: 600,
                                  lg: 700,
                                },
                              }}
                              src={section.media}
                            />
                            {/* <Image
                              src={section.media}
                              layout="responsive"
                              height="500"
                              width="1060"
                              sx={{
                                maxHeight: {
                                  xs: 280,
                                  sm: 350,
                                  md: 450,
                                  lg: 550,
                                },
                                maxWidth: {
                                  xs: 400,
                                  sm: 500,
                                  md: 600,
                                  lg: 700,
                                },
                              }}
                            /> */}
                          </Box>
                        )}
                        <Typography className={classes.bodyText}>
                          {section.text}
                        </Typography>
                      </div>
                    );
                  })}
                </div>
                <Box>
                  {post.tags.length > 0 && (
                    <Box
                      className={classes.relatedTitle}
                      sx={{
                        paddingTop: { xs: 3, sm: 4, md: 6, lg: 8 },
                        paddingBottom: { xs: 1, sm: 2, md: 3, lg: 4 },
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 25,
                      }}
                    >
                      <Paper
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "wrap",
                          listStyle: "none",
                          p: 0.5,
                          m: 0,
                        }}
                        elevation={0}
                        component="ul"
                      >
                        {post.tags.map((data) => {
                          // const handleClick = () => {
                          //   console.log("Tag clicked!!!");
                          //   console.log(data);
                          //   router.push(`/category/${data.id}`);
                          // };
                          return (
                            <ListItem key={data.id}>
                              <Chip
                                color="secondary"
                                label={data.name}
                                // onClick={handleClick}
                              />
                            </ListItem>
                          );
                        })}
                      </Paper>
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>

            <Box container className={classes.relatedPost}>
              {console.log("Related:", relatedPostData)}
              {relatedPostData.length > 0 && (
                <>
                  {relatedPostData.length > 1 && (
                    <Box
                      className={classes.relatedTitle}
                      sx={{
                        paddingTop: { xs: 3, sm: 4, md: 6, lg: 8 },
                        paddingBottom: { xs: 1, sm: 2, md: 3, lg: 4 },
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: 25,
                      }}
                    >
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, fontSize: 25 }}
                      >
                        Related Content
                      </Typography>
                      <KeyboardArrowDownRoundedIcon />
                    </Box>
                  )}

                  <div>
                    <div>
                      <Container
                        maxWidth="lg"
                        className={classes.blogsContainer}
                      >
                        <Grid container spacing={3}>
                          {relatedPostData
                            .filter((item) => item.id != post.id)
                            .slice(0, 3)
                            .map((relatedPost) => (
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={4}
                                key={relatedPost.id}
                              >
                                <Card
                                  className={classes.card}
                                  variant="outlined"
                                >
                                  <Link
                                    href="/post/[id]"
                                    as={`/post/${relatedPost.id}`}
                                  >
                                    <CardActionArea>
                                      <CardMedia
                                        className={classes.CardMedia}
                                        image={relatedPost.image}
                                      ></CardMedia>
                                      <CardContent>
                                        <Typography variant="h5">
                                          {relatedPost.title}
                                        </Typography>

                                        <Divider
                                          style={{ padding: "4px 4px" }}
                                        />
                                        <Typography color="textSecondary">
                                          A card can also offer supplemental
                                          actions which should stand detached
                                          from the main action.
                                        </Typography>
                                      </CardContent>
                                    </CardActionArea>
                                  </Link>
                                  <CardActions className={classes.cardActions}>
                                    <Box className={classes.author}>
                                      <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                                      <Box ml={2}>
                                        <Typography
                                          variant="subtitle2"
                                          component="p"
                                        >
                                          Guy Clemons
                                        </Typography>
                                        <Typography
                                          variant="subtitle2"
                                          color="textSecondary"
                                          component="p"
                                        >
                                          May 14, 2020
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </CardActions>
                                </Card>
                              </Grid>
                            ))}
                        </Grid>
                      </Container>
                    </div>
                  </div>
                </>
              )}
            </Box>
          </div>
        </div>
        <br />
        <Box sx={{ ml: "10%", mr: "10%" }}>
          <Button
            // className={styles.detail_btn}
            variant="contained"
            href="/"
            startIcon={<ArrowBackIcon />}
          >
            Go Back
          </Button>
        </Box>
      </div>
    </>
  );
};

export const getStaticProps = async (context) => {
  const res = await fetch(`http://127.0.0.1:8000/posts/${context.params.id}`);
  const cat = await fetch(
    `http://127.0.0.1:8000/posts/?search=${context.params.category || ""}`
  );
  const data = await cat.json();
  const relatedPostData = data;
  const post = await res.json();
  return {
    props: {
      post,
      relatedPostData,
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

export default withStyles(styles)(Articles);
