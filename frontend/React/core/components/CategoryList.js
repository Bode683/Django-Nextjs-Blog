import { Box, Container, Grid, Paper, ListItem } from "@mui/material";
import { Card } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";
import Link from "next/link";
import Chip from "@mui/material/Chip";
// import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: "25px, auto",
    // marginLeft: "25px",
    // maxWidth: "90vw",
    // color: "red",
    // paddingBottom: "20px",
  },
  category: {
    paddingTop: theme.spacing(3),
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
  },

  card: {
    maxWidth: "100%",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  link: {
    textDecoration: "none",
  },
}));

const Category = ({ handleCategory, categories, posts }) => {
  const classes = useStyles();
  return (
    <div>
      <Container maxWidth="lg" className={classes.blogsContainer}>
        <Grid container spacing={3}>
          <Paper className={classes.category}>
            <Typography variant="h4" sx={{ textAlign: "center" }}>
              Recent posts
            </Typography>
            {categories.map((category) => (
              // <Box
              //   style={{ cursor: "pointer" }}
              //   className={classes.card}
              //   variant="outlined"
              // >
              //   <Link
              //     color="inherit"
              //     className={classes.link}
              //     href="/category/[id]"
              //     as={`/category/${category.id}`}
              //   >
              //     <Typography variant="subtitle">{category.name}</Typography>
              //   </Link>
              // </Box>

              <ListItem key={category.id}>
                <Chip
                  icon={TagFacesIcon}
                  label={category.name}
                  component="a"
                  href="/category/[id]"
                  // as={`/category/${category.id}`}
                  variant="outlined"
                  clickable
                />
              </ListItem>
            ))}
          </Paper>
        </Grid>
      </Container>
    </div>
  );
};

export default Category;
