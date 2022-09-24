import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { useRouter } from "next/router";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const Category = ({ categories }) => {
  const router = useRouter();
  return (
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
      {categories.map((data) => {
        const handleClick = () => {
          console.log("Tag clicked!!!");
          console.log(data);
          router.push(`/category/${data.id}`);
        };
        return (
          <ListItem key={data.id}>
            <Chip
              color="secondary"
              icon={<TagFacesIcon />}
              label={data.name}
              onClick={handleClick}
            />
          </ListItem>
        );
      })}
    </Paper>
  );
};
export default Category;
