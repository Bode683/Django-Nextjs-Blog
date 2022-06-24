// import "./App.css";
import { Container } from "@mui/material";
import { Fragment, useState } from "react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import Final from "./Final";
import { v4 as uuidv4 } from "uuid";

////////////////////////////////////
import CardActionArea from "@mui/material/CardActionArea";
import Fab from "@mui/material/Fab";
import red from "@mui/material/colors/red";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { withStyles } from "@mui/styles";
import { makeStyles } from "@mui/styles";
////////////////////////////////////

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icon: {
    margin: theme.spacing.unit * 2,
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800],
    },
  },

  input: {
    display: "none",
  },
  button: {
    color: "#77002e",
    margin: 10,
  },
  secondaryButton: {
    color: "gray",
    margin: 10,
  },
}));

function PostForm() {
  const classes = useStyles();
  //state for steps
  const [step, setstep] = useState(1);

  //state for form data
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    image: null,
    description: "",
    sections: "",
    author: "",
    category: "",
  });

  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  ///////////////////////SECTION MODEL////////////////////////////////

  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), title: "", media: null, text: "" },
  ]);

  //  const handleSubmit = (e) => {
  //    e.preventDefault();
  //    console.log("InputFields", inputFields);
  //  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), title: "", media: "", text: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  ///////////////////////SECTION MODEL////////////////////////////////

  //////////////////////////PHOTO UPLOAD//////////////////////////////

  const [mainState, setMainState] = useState("initial");
  const [imageUploaded, setImageUploaded] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUploadClick = (event) => {
    console.log();
    // const { files } = event.target;
    // for (let i = 0; i < files.length; i++) {
    //   const file = files[i];
    // }
    // console.log(files);
    var file = event.target.files[0];
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setSelectedFile(reader.result);
    };
    console.log(url); // Would see a path?

    setMainState("uploaded");
    setSelectedFile(event.target.files[0]);
    setImageUploaded(1);
  };

  const renderInitialState = () => {
    return (
      <Fragment>
        <input
          accept="image/*"
          className={classes.input}
          id="contained-button-file"
          multiple
          type="file"
          // name="media"
          // value={inputField.media}
          // onChange={(event) => handleChangeInput(inputField.id, event)}
          onChange={handleUploadClick}
        />
        <label htmlFor="contained-button-file">
          <Fab component="span" className={classes.button}>
            <AddPhotoAlternateIcon />
          </Fab>
        </label>
      </Fragment>
    );
  };

  const renderUploadedState = () => {
    console.log("File", selectedFile);

    return (
      <Fragment>
        <CardActionArea onClick={imageResetHandler}>
          <img width="100%" className={classes.media} src={selectedFile} />
        </CardActionArea>
      </Fragment>
    );
  };

  const imageResetHandler = (event) => {
    console.log("Click!");

    setMainState("initial");
    setSelectedFile(null);
    setImageUploaded(0);
  };
  //////////////////////////PHOTO UPLOAD//////////////////////////////

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = (input) => (e) => {
    // input value from the form
    const { value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  // javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div className="App">
          <Container>
            <StepOne
              nextStep={nextStep}
              handleFormData={handleInputData}
              values={formData}
            />
          </Container>
        </div>
      );
    // case 2 to show stepTwo form passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the f
    case 2:
      return (
        <div className="App">
          <Container>
            <StepTwo
              nextStep={nextStep}
              prevStep={prevStep}
              handleFormData={handleInputData}
              handleChangeInput={handleChangeInput}
              handleAddFields={handleAddFields}
              handleRemoveFields={handleRemoveFields}
              renderUploadedState={renderUploadedState}
              renderInitialState={renderInitialState}
              mainState={mainState}
              values={formData}
              inputFields={inputFields}
            />
          </Container>
        </div>
      );
    // Only formData is passed as prop to show the final value at form submit
    case 3:
      return (
        <div className="App">
          <Container>
            <Final
              values={formData}
              prevStep={prevStep}
              inputFields={inputFields}
            />
          </Container>
        </div>
      );
    // default case to show nothing
    default:
      return <div className="App"></div>;
  }
}

export default PostForm;
