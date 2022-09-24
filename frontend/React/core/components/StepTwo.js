import React, { Fragment, useState } from "react";
import { Card, Box, Button, FormControl, Tooltip } from "@mui/material";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import CardActionArea from "@mui/material/CardActionArea";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/send";
import Fab from "@mui/material/Fab";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";

import { makeStyles } from "@mui/styles";
import CustomAlert from "./CustomAlert";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  imageUpload: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  button: {
    margin: theme.spacing(1),
  },
  section: {
    // display: "flex",
  },
}));

// creating functional component and getting props from postform.js and destucturing them
const StepTwo = ({
  nextStep,
  handleFormData,
  prevStep,
  values,
  handleChangeInput,
  handleAddFields,
  handleRemoveFields,
  inputFields,
  renderUploadedState,
  // renderInitialState,
  handleUploadClick,
  imageResetHandler,
  mainState,
  selectedFile,
  openSectionImageAlert,
  setOpenSectionImageAlert,
}) => {
  const classes = useStyles();

  console.log(inputFields);
  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.currentTarget.disabled = true;
    e.preventDefault();
    // checking if value of first name and last name is empty show error else take to next step
    // if (validator.isEmpty(values.age) || validator.isEmpty(values.email)) {
    //   setError(true);
    // } else {
    nextStep();
    // }
  };
  return (
    <>
      <Box
        sx={{
          mr: "20%",
          ml: "20%",

          justifyContent: "center",
        }}
      >
        <Box sx={{ mb: { sm: 3, md: 4, lg: 5 } }}>
          <Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                pb: 4,
              }}
            >
              <Button variant="contained" onClick={handleAddFields}>
                Add
              </Button>
            </Box>
            <form id="step2-form" className={classes.root}>
              {inputFields.map((inputField, i) => (
                <div key={i}>
                  <div className={classes.section}>
                    <TextField
                      name="title"
                      label="Title..."
                      variant="filled"
                      fullWidth
                      value={inputField.title}
                      onChange={(event) =>
                        handleChangeInput(inputField.sec_id, event)
                      }
                    />
                    <Fragment>
                      <div className={classes.imageUpload}>
                        <div>
                          {/* {(mainState == "initial" && ( */}
                          <Fragment>
                            <input
                              name="media"
                              value={inputFields.media}
                              accept="image/*"
                              // className={classes.input}
                              id="contained-button-file"
                              multiple
                              type="file"
                              onChange={(event) =>
                                handleUploadClick(inputField.sec_id, event)
                              }
                            />
                            <label htmlFor="contained-button-file">
                              <Fab
                                component="span"
                                // className={classes.button}
                              >
                                <AddPhotoAlternateIcon />
                              </Fab>
                            </label>
                          </Fragment>
                          {/* // )) ||
                          //   (mainState == "uploaded" && (
                          //     <Fragment>
                          //       <p>image here!!!</p>
                          //       <CardActionArea onClick={imageResetHandler}>
                          //         <img
                          //           width="100%"
                          //           className={classes.media}
                          //           src={inputField.media}
                          //         />
                          //       </CardActionArea>
                          //     </Fragment>
                          //   ))} */}
                        </div>
                        <CustomAlert
                          msg={"Image uploaded"}
                          open={openSectionImageAlert}
                          setOpen={setOpenSectionImageAlert}
                        />
                      </div>
                    </Fragment>
                  </div>
                  <TextField
                    label="Tell your story..."
                    name="text"
                    margin="normal"
                    fullWidth
                    multiline
                    rows={10}
                    // maxRows={Infinity}
                    value={inputField.text}
                    onChange={(event) =>
                      handleChangeInput(inputField.sec_id, event)
                    }
                  />
                  <IconButton
                    onClick={() => handleRemoveFields(inputField.sec_id)}
                    variant="contained"
                    color="primary"
                  >
                    {inputFields.length !== 1 && <CloseIcon />}
                  </IconButton>
                  <IconButton
                    onClick={handleAddFields}
                    variant="contained"
                    color="primary"
                  >
                    {inputFields.length - 1 === i && <AddIcon />}
                  </IconButton>
                </div>
              ))}
            </form>
          </Container>
        </Box>
        <Box
          sx={{
            mr: "5%",
            ml: "5%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            sx={{ display: "flex" }}
            variant="outlined"
            onClick={prevStep}
          >
            Previous
          </Button>

          <Button
            disabled={inputFields.length < 1}
            variant="contained"
            type="submit"
            onClick={submitFormData}
            sx={{ display: "flex" }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default StepTwo;
