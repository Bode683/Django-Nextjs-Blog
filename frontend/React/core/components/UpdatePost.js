import axios from "axios";
import { Container } from "@mui/material";
import { Fragment, useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRouter } from "next/router";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import Final from "./Final";
import { v4 as uuidv4 } from "uuid";

////////////////////////////////////
import CardActionArea from "@mui/material/CardActionArea";
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
}));

function UpdateForm(postData) {
  // const { id } = useParams();
  const classes = useStyles();
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

  useEffect(() => {
    console.log("console", postData.postData);

    postData.postData.sections.forEach((object) => {
      // delete object["media"];
      object.sec_id = uuidv4();
    });
    setInputFields(postData.postData.sections);
    console.log("sections:", inputFields);
    setFormData({
      ...formData,
      title: postData.postData.title,
      image: postData.postData.image,
      description: postData.postData.description,
      category: postData.postData.category,
    });
    console.log("FormData", formData);
    // console.log("FormData ID", id);
  }, []);
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
    const newInputFields = inputFields.map((i) => {
      if (sec_id === i.sec_id) {
        if (event.target.files != null) {
          var file = event.target.files[0];
          if (file) {
            i[event.target.name] = event.target.files[0];
            console.log(event.target.files[0]);
            // setInputFields({ ...inputFields, media: file });
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

  const imageResetHandler = (event) => {
    console.log("Click!");

    setMainState("initial");
    setSelectedFile(null);
    setImageUploaded(0);
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

  const submitFormData = async (e) => {
    e.preventDefault();
    setDisable(true);
    console.log("button clicked");
    console.log("inputFields", inputFields);

    ///////////////////////////////////////////////////////

    //Check Main image before sending to the database
    if (cardImage) {
      formData.image = cardImage;
      console.log("Data with image", formData);
      // setFormData(dataWithImage);
    } else {
      // const values = formData;
      // delete values.image;
      console.log("No main image");
      delete formData.image;
      // setFormData(values);
    }

    // console.log("Data submitted", updateFormData);

    await axios({
      url: `http://127.0.0.1:8000/update/${postData.postData.id}/`,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      method: "PUT",

      data: {
        ...formData,
        //     if (image !== null) {
        //   formField.append("image", image);
        // },
        // image: cardImage,
        author: 1,
      },
    })
      .then(function (response) {
        console.log(response);
        const post_id = response.data.id;
        postID.current = post_id;
      })
      .catch(function (error) {
        console.log(error);
      });

    ///////////////////////////////////////////////////////

    {
      inputFields.map(async (section) => {
        // This runs for inputfields that already exists
        if (section.id) {
          console.log(section.id);
          ///////////////////Check section image update before sending to the database///////////////
          // setCurrentSection(section);
          if (section.media instanceof File) {
            (section.media = section.media),
              // setCurrentSection(dataWithImage);
              console.log("section with image", section);
          } else {
            // const values = [...section];
            // values.forEach((object) => {
            //   delete object["media"];
            // });
            delete section.media;
            console.log("section with No image", section);
            // setCurrentSection(section);
          }
          //////////////////////////////////////////

          Object.assign(section, { order: section.order, post: section.post });
          console.log("check section", section);
          index.current++;
          await axios({
            url: `http://127.0.0.1:8000/sections/${section.id}/`,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            method: "PUT",

            data: section,
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        // This block runs if new input fields are added
        else {
          console.log("No ID found");

          Object.assign(section, {
            order: index.current,
            post: postData.postData.id,
          });
          index.current++;
          await axios({
            url: `http://127.0.0.1:8000/sections/`,
            headers: {
              "Content-Type": "multipart/form-data",
            },
            method: "POST",

            data: section,
          })
            .then(function (response) {
              console.log(response);
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    }
    setFormData(initialData);
    router.replace("/");
  };

  ///////////////////////////////////////////////////////

  const showData = (e) => {
    console.log("Form Data:", inputFields);
  };

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
              showData={showData}
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

export default UpdateForm;
