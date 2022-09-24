import React from "react";
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
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
}));

const PostList = (posts) => {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Grid container spacing={3}>
          {posts.posts.map((post) => (
            <Grid item sm={12} md={6} key={post.id}>
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
                          A card can also offer supplemental actions which
                          should stand detached from the main action area.
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Link>
                <CardActions className={classes.cardActions}>
                  <Box className={classes.author}>
                    <Avatar src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                    <Box ml={2}>
                      <Typography variant="subtitle2" component="p">
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
  );
};

export default PostList;
