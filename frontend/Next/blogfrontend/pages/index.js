import Header from "../components/header";
import axios from "axios";
import { Grid } from "@mui/material";
import { Card } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import Link from "next/link";

function Home({ posts }) {
  return (
    <>
      <Header />
      <div>
        {console.log(posts)}
        <h1>Welcome to a blog!</h1>
        {posts.map((post) => (
          <Link key={post.id} href={"/"}>
            <Grid>
              <Card>
                <CardMedia></CardMedia>
                <CardContent>
                  <Typography component="h1">{post.title}</Typography>
                  <Box component="p">{post.image}</Box>
                </CardContent>
              </Card>
            </Grid>
          </Link>
        ))}
      </div>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:8000/post/");
  const posts = await res.json();
  return {
    props: {
      posts,
    },
  };
}
export default Home;
