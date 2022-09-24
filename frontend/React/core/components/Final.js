import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
// import styles from "../../styles/[id].module.css";
import { useNavigate, useParams } from "react-router";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
//////////
import { Typography } from "@mui/material";
import { Box } from "@mui/material";
import { Divider } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

import { Router, useRouter } from "next/router";
import { withStyles, useStyles } from "@mui/styles";

const styles = (theme) => ({
  container: {
    paddingTop: theme.spacing(3),
    justifyContent: "center",
    alignItems: "center",
  },
  bodyText: {
    [theme.breakpoints.up("sm")]: {
      fontSize: 17,
    },
    [theme.breakpoints.up("md")]: {
      fontSize: 18,
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: 20,
    },
  },

  CardMedia: {
    height: 180,
    paddingTop: "20%",
  },

  card: {
    maxWidth: "100%",
  },

  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },
  author: {
    display: "flex",
  },
  relatedPost: {
    margin: "30px",
  },
  mainTitle: {
    color: theme.palette.primary.main,
    fontSize: 30,
    fontWeight: 500,
    // textAlign: "center",
    [theme.breakpoints.up("xs")]: {
      fontSize: 25,
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: 30,
    },
  },
  relatedTitle: {
    // color: theme.palette.primary.main,
    textAlign: "center",
    fontWeight: 700,
    fontSize: 25,
  },
});

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const DATE_OPTIONS = {
  // weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const Final = ({
  values,
  classes,
  prevStep,
  // submitFinalData,
  submitFormData,
  inputFields,
  disable,
}) => {
  //destructuring the object from values
  const theme = useTheme();
  console.log(inputFields);

  return (
    <>
      <div>
        {/* <div className="{classes.container}">
          <div className="card shadow mt-4">
            <Card style={{ marginTop: 100, textAlign: "left" }}>
              <div className="card-body">
                <div key={title}>
                  <h2 className="card-title text-center">{title}</h2>

                  <div>
                    <p>{description}</p>
                  </div>

                  <div className="{styles.sections}">
                    {inputFields.map((section) => {
                      return (
                        <div key={section.sec_id}>
                          <h4>{section.title}</h4>
                          <img src={section.media} className="{styles.media}" />
                          <img src={selectedFile} className="{styles.media}" />
                          <p>{section.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <br />
            </Card>

            <Button variant="outlined" onClick={prevStep}>
              Previous
            </Button>
            <Button
              disabled={disable}
              variant="contained"
              type="submit"
              onClick={submitFormData}
            >
              Finish
            </Button>
          </div>
        </div> */}
      </div>
      <Box
        container
        sx={{
          mr: "15%",
          ml: "15%",

          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            justifyContent: "center",
            margin: { xs: 2, sm: 3, md: 4, lg: 6 },
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              color: theme.palette.primary.main,
              textAlign: "center",
              marginBottom: { xs: 3, sm: 4, md: 6, lg: 8 },
            }}
          >
            {values.title}
          </Typography>
          <Typography
            sx={{
              marginBottom: { xs: 3, sm: 4, md: 6, lg: 8 },
              justifyContent: "center",
              display: "flex",
            }}
          >
            <AccountCircleIcon color="primary" />
            admin
            <AccessTimeIcon
              color="primary"
              sx={{ marginLeft: { xs: 1, sm: 1, md: 2, lg: 2 } }}
            />
            {new Date().toLocaleDateString("en-US", DATE_OPTIONS)}
          </Typography>
        </Box>
        <div>
          {values.image && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                boarderRadius: { xs: 3, sm: 4, md: 6, lg: 8 },
                // paddingTop: { xs: 3, sm: 4, md: 6, lg: 8 },
                paddingBottom: { xs: 3, sm: 4, md: 6, lg: 8 },
              }}
            >
              <Box
                component="img"
                sx={{
                  height: 500,
                  width: 1060,
                  maxHeight: { xs: 280, sm: 400, md: 500, lg: 720 },
                  maxWidth: { xs: 400, sm: 700, md: 960, lg: 1080 },
                }}
                src={values.image}
              />
            </Box>
          )}
        </div>

        <Box
          sx={{
            marginLeft: { xs: 2, sm: 4, md: 10, lg: 10 },
            marginRight: { xs: 2, sm: 4, md: 10, lg: 10 },
          }}
        >
          <Typography>{values.description}</Typography>
          <div>
            {inputFields.map((section) => {
              return (
                <div key={section.id}>
                  <Typography
                    variant="h4"
                    className={classes.mainTitle}
                    sx={{
                      marginTop: { xs: 2, sm: 3, md: 4, lg: 6 },
                      paddingBottom: 1,
                    }}
                  >
                    {section.title}
                  </Typography>
                  {section.media && (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        boarderRadius: { xs: 2, sm: 3, md: 4, lg: 6 },
                        paddingTop: { xs: 2, sm: 3, md: 4, lg: 6 },
                        paddingBottom: { xs: 2, sm: 3, md: 4, lg: 6 },
                      }}
                    >
                      <Box
                        component="img"
                        sx={{
                          // height: 500,
                          // width: 1060,
                          maxHeight: {
                            xs: 280,
                            sm: 350,
                            md: 450,
                            lg: 550,
                          },
                          maxWidth: {
                            xs: 400,
                            sm: 500,
                            md: 600,
                            lg: 700,
                          },
                        }}
                        src={section.media}
                      />
                      {/* <Image
                              src={section.media}
                              layout="responsive"
                              height="500"
                              width="1060"
                              sx={{
                                maxHeight: {
                                  xs: 280,
                                  sm: 350,
                                  md: 450,
                                  lg: 550,
                                },
                                maxWidth: {
                                  xs: 400,
                                  sm: 500,
                                  md: 600,
                                  lg: 700,
                                },
                              }}
                            /> */}
                    </Box>
                  )}
                  <Typography className={classes.bodyText}>
                    {section.text}
                  </Typography>
                </div>
              );
            })}
          </div>
          {/* <Box>
            {values.tags.length > 0 && (
              <Box
                className={classes.relatedTitle}
                sx={{
                  paddingTop: { xs: 3, sm: 4, md: 6, lg: 8 },
                  paddingBottom: { xs: 1, sm: 2, md: 3, lg: 4 },
                  textAlign: "center",
                  fontWeight: 700,
                  fontSize: 25,
                }}
              >
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
                  {values.tags.map((data) => {
                    // const handleClick = () => {
                    //   console.log("Tag clicked!!!");
                    //   console.log(data);
                    //   router.push(`/category/${data.id}`);
                    // };
                    return (
                      <ListItem key={data.id}>
                        <Chip
                          color="secondary"
                          label={data.name}
                          // onClick={handleClick}
                        />
                      </ListItem>
                    );
                  })}
                </Paper>
              </Box>
            )}
          </Box> */}
          <Box
            sx={{
              mr: "5%",
              ml: "5%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="outlined" onClick={prevStep}>
              Previous
            </Button>
            <Button
              disabled={disable}
              variant="contained"
              type="submit"
              onClick={submitFormData}
            >
              Finish
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default withStyles(styles)(Final);
