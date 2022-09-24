import React, { useState } from "react";
import { Input, TextField, Button, Tooltip, IconButton } from "@mui/material";
import TagsInput from "./TagsInput";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PhotoIcon from "@mui/icons-material/Photo";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import { withStyles } from "@mui/styles";
import CustomAlert from "./CustomAlert";

const styles = (theme) => ({});

// import validator from "validator";

// creating functional component ans getting props from app.js and destucturing them
const StepOne = ({
  nextStep,
  categories,
  handleFormData,
  values,
  onFileUpload,
  handleSelecetedTags,
  openImageAlert,
  setOpenImageAlert,
}) => {
  //creating error state for validation
  // const [error, setError] = useState(false);

  // after form submit validating the form data using validator
  const submitFormData = (e) => {
    e.preventDefault();

    // checking if value of first name and last name is empty show error else take to step 2
    // if (
    //   validator.isEmpty(values.firstName) ||
    //   validator.isEmpty(values.lastName)
    // ) {
    //   setError(true);
    // } else {
    nextStep();
    // }
  };

  return (
    <Box
      sx={{
        mr: "20%",
        ml: "20%",

        justifyContent: "center",
      }}
    >
      <form id="step1-form">
        <TextField
          placeholder="Title..."
          label="Title"
          onChange={handleFormData("title")}
          value={values.title}
          margin="normal"
          fullWidth
          required
        />
        <br />
        <FormControl required>
          <input
            accept="image/*"
            id="contained-button-file"
            style={{ display: "none" }}
            type="file"
            onChange={onFileUpload}
          />
          <Tooltip title="Card Image">
            <IconButton aria-label="photo">
              <label htmlFor="contained-button-file">
                <AddPhotoAlternateOutlinedIcon color={"primary"} />
              </label>
            </IconButton>
          </Tooltip>
          <CustomAlert
            msg={"Image uploaded"}
            open={openImageAlert}
            setOpen={setOpenImageAlert}
          />
        </FormControl>
        <TextField
          multiline
          rows={4}
          placeholder="Enter short description..."
          label="Description"
          onChange={handleFormData("description")}
          value={values.description}
          fullWidth
        />

        <Box sx={{ minWidth: 120 }}>
          <br />
          <FormControl fullWidth required>
            <InputLabel id="demo-simple-select-label">
              Select category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              value={values.category}
              onChange={handleFormData("category")}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id || ""}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <br />
        <div className="Tags">
          <TagsInput
            selectedTags={handleSelecetedTags}
            fullWidth
            variant="outlined"
            id="tags"
            name="tags"
            placeholder="Add Tags..."
            label="Tags"
          />
        </div>
        <br />

        <Box
          sx={{
            mr: "5%",
            ml: "5%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button variant="outlined" href="/" startIcon={<ArrowBackIcon />}>
            Go Back
          </Button>
          <Button
            disabled={!values.title}
            variant="contained"
            type="submit"
            onClick={submitFormData}
          >
            Continue
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default withStyles(styles)(StepOne);
