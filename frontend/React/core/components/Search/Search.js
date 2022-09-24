import React from "react";
import { Button, Container, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { TextField, Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import SearchResultsCard from "../Cards/SearchResultsCard";
import Link from "next/link";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: theme.palette.secondary.main,
  },
  modalBox: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  },
}));

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "80%",
  overflow: "auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Search = ({ URL }) => {
  const classes = useStyles();

  const [openAlert, setOpenAlert] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSearchData([]);
  };

  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const onInputChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchValue) {
      fetch(`${URL}search=${searchValue}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(" data", data);
          setSearchData(data);
          console.log("search data", searchData);
          setOpen(true);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      setOpenAlert(!open);
    }
  };

  return (
    <>
      <Box style={{ justifyContent: "center" }}>
        <Container
          className={classes.container}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <form>
            <TextField
              className={classes.btn}
              type="search"
              id="search-bar"
              onChange={onInputChange}
              value={searchValue}
              label="Search..."
              variant="outlined"
              placeholder="Search..."
              size="small"
            />
          </form>

          <Box
            onClick={handleSearch}
            sx={{
              backgroundColor: "#007788",
              width: "3em",
              justifyContent: "center",
            }}
          >
            <IconButton type="submit" aria-label="search">
              <SearchIcon sx={{ fill: "#fff" }} />
            </IconButton>
          </Box>
        </Container>
      </Box>
      <Box>
        <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
          <Alert
            severity="info"
            onClose={() => setOpenAlert(false)}
            closeText="Close"
          >
            No search term entered.
          </Alert>
        </Dialog>
      </Box>
      <Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            {searchData.length > 0 ? (
              <>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Showing results for &ldquo;{searchValue}&ldquo;
                </Typography>
                <SearchResultsCard posts={searchData} />
              </>
            ) : (
              <Typography id="modal-modal-title" variant="h6" component="h2">
                No results found for &ldquo;{searchValue}&ldquo;
              </Typography>
            )}
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default Search;
