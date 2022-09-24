import axios from "axios";
import { Container } from "@mui/material";
import { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRouter } from "next/router";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import Final from "./Final";
import { v4 as uuidv4 } from "uuid";

////////////////////////////////////
import CardActionArea from "@mui/material/CardActionArea";
import Fab from "@mui/material/Fab";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { withStyles } from "@mui/styles";
import { makeStyles } from "@mui/styles";
////////////////////////////////////

const styles = (theme) => ({
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
      color: "black",
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
});

function PostForm() {
  //state for steps
  const [step, setstep] = useState(1);
  const index = useRef(0);
  const postID = useRef(0);

  const router = useRouter();
  //state for form data
  const initialData = {
    title: "",
    image: null,
    description: "",
    sections: null,
    category: "",
    tags: null,
  };
  const [formData, setFormData] = useState(initialData);
  // const [tags, setTags] = useState();

  //Get some formData from the server
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:8000/categories/")
      .then((response) => response.json())
      .then((categoryData) => {
        console.log("categoryData", categoryData);
        setCategories(categoryData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  //Handle the Tags and send to the server
  function handleSelecetedTags(items) {
    console.log(items);
    formData.tags = items;
    console.log("Tags", formData.tags);
  }

  const [editMode, setEditMode] = useState(false);
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
    { sec_id: uuidv4(), title: "", media: null, text: "", order: null },
  ]);

  const handleChangeInput = (sec_id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (sec_id === i.sec_id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  // const handleChangeImage = (sec_id, event) => {
  //   const newInputFields = inputFields.map((i) => {
  //     if (sec_id === i.sec_id) {
  //       i[event.target.media] = event.target.files[0];
  //     }
  //     return i;
  //   });

  //   setInputFields(newInputFields);
  // };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { sec_id: uuidv4(), title: "", media: null, text: "", order: null },
    ]);
  };
  console.log(inputFields);

  const handleRemoveFields = (sec_id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.sec_id === sec_id),
      1
    );
    setInputFields(values);
  };

  ///////////////////////SECTION MODEL////////////////////////////////

  //////////////////////////PHOTO UPLOAD//////////////////////////////

  const [mainState, setMainState] = useState("initial");
  const [imageUploaded, setImageUploaded] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [cardImage, setCardImage] = useState(null);

  const [openSectionImageAlert, setOpenSectionImageAlert] = useState(false);

  const handleUploadClick = (sec_id, event) => {
    event.preventDefault;
    const newInputFields = inputFields.map((i) => {
      if (sec_id === i.sec_id) {
        if (event.target.files != null) {
          var file = event.target.files[0];
          if (file) {
            i[event.target.name] = event.target.files[0];
            const reader = new FileReader();
            var url = reader.readAsDataURL(file);

            reader.onloadend = function (e) {
              setSelectedFile(reader.result);
            };
            // console.log(url); // Would see a path?

            setMainState("uploaded");
            setSelectedFile(event.target.files[0]);
            setImageUploaded(1);
            setOpenSectionImageAlert(true);
          } else {
            alert("Upload an image");
          }
        }
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  // const renderInitialState = () => {
  //   return (
  //     <Fragment>
  //       <input
  //         value={inputFields.media}
  //         accept="image/*"
  //         className={classes.input}
  //         id="contained-button-file"
  //         multiple
  //         type="file"
  //         // onChange={(event) => handleUploadClick(inputField.id, event)}
  //         onChange={handleUploadClick(inputField.id, event)}
  //       />
  //       <label htmlFor="contained-button-file">
  //         <Fab component="span" className={classes.button}>
  //           <AddPhotoAlternateIcon />
  //         </Fab>
  //       </label>
  //     </Fragment>
  //   );
  // };

  const renderUploadedState = (sec_id) => {
    console.log("File", selectedFile);
    // console.log("File", sectionImage);
    console.log("sec_id", sec_id);
    // console.log("Image:", formData.image);
    // console.log("Form Data:", formData);
    // console.log("image:", cardImage);
    inputFields.map((i) => {
      if (sec_id === i.sec_id) {
        return (
          <Fragment>
            <p>image here!!!</p>
            <CardActionArea onClick={imageResetHandler}>
              <img width="100%" className={classes.media} src={i.media} />;
            </CardActionArea>
          </Fragment>
        );
      }
    });
  };

  const imageResetHandler = (event, sec_id) => {
    console.log("Click!");
    inputFields.map((i) => {
      if (sec_id === i.sec_id) {
        setMainState("initial");
        setSelectedFile(null);
        setImageUploaded(0);
      }
    });
  };

  const [openImageAlert, setOpenImageAlert] = useState(false);

  const onFileUpload = (e) => {
    e.preventDefault;
    if (e.target.files != null) {
      let file = e.target.files[0];
      setCardImage(file);
      setOpenImageAlert(true);
    }
  };

  //////////////////////////PHOTO UPLOAD//////////////////////////////

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = (input) => (e) => {
    // input value from the form
    const { value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  // const submitFinalData = async (e) => {
  //   e.preventDefault();
  //   if (title && sections && category) {
  //     const createdAt = new Date();
  //     const finalFormData = {
  //       ...formData,
  //       image: selectedFile,
  //       sections: inputFields,
  //     };
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/posts/",
  //       finalFormData
  //     );
  //     setFormData(initialData);
  //     router.replace("/");
  //   }
  // };
  // const showSections = (e) => {
  //   e.preventDefault();
  //   console.log("inputFields", inputFields);
  // };
  const submitFormData = async (e) => {
    e.preventDefault();
    setDisable(true);
    // const data = new FormData(document.getElementById("step2-form"));
    // data.set("image", cardImage);
    console.log("button clicked");
    console.log("inputFields", inputFields);

    ///////////////////////////////////////////////////////
    formData.image = cardImage;
    formData.author = 1;
    console.log(formData);
    await axios({
      url: `http://127.0.0.1:8000/posts/create/`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "POST",

      data: formData,
    })
      .then(function (response) {
        console.log(response);
        const post_id = response.data.id;
        postID.current = post_id;
      })
      .catch(function (error) {
        console.log(error);
      });
    /////////////send Tags to the server/////////////////////
    // if (tags) {
    //   console.log("Tags found");
    //   tags.map(async (tag) => {
    //     // finalData = {
    //     //   ...tag,
    //     //   post: postID.current,
    //     // };
    //     await axios({
    //       url: `http://127.0.0.1:8000/tags/`,
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //       method: "POST",

    //       data: tag,
    //     })
    //       .then(function (response) {
    //         console.log(response);
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    //   });
    // } else {
    //   console.log("No Tags found");
    // }
    ///////////////////////////////////////////////////////
    // const finalInputFields = {
    //   ...inputFields
    // };
    // const sections = finalInputFields;
    {
      inputFields.map(async (section) => {
        const finalInputFields = {
          ...section,
          order: index.current,

          post: postID.current,
        };
        index.current++;
        await axios({
          url: `http://127.0.0.1:8000/sections/`,
          headers: {
            "Content-Type": "multipart/form-data",
          },
          method: "POST",

          data: finalInputFields,
        })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      });
    }
    setFormData(initialData);
    router.replace("/");
  };

  ///////////////////////////////////////////////////////

  const [disable, setDisable] = useState(false);
  // javascript switch case to show different form in each step
  switch (step) {
    // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
    case 1:
      return (
        <div className="App">
          <Container>
            <StepOne
              nextStep={nextStep}
              categories={categories}
              handleFormData={handleInputData}
              values={formData}
              onFileUpload={onFileUpload}
              handleSelecetedTags={handleSelecetedTags}
              openImageAlert={openImageAlert}
              setOpenImageAlert={setOpenImageAlert}
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
              // renderInitialState={renderInitialState}
              imageResetHandler={imageResetHandler}
              handleUploadClick={handleUploadClick}
              selectedFile={selectedFile}
              mainState={mainState}
              values={formData}
              inputFields={inputFields}
              openSectionImageAlert={openSectionImageAlert}
              setOpenSectionImageAlert={setOpenSectionImageAlert}
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
              // submitFinalData={submitFinalData}
              submitFormData={submitFormData}
              disabled={disable}
            />
          </Container>
        </div>
      );
    // default case to show nothing
    default:
      return <div className="App"></div>;
  }
}

export default withStyles(styles)(PostForm);
