import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";

import { makeStyles } from "@mui/styles";
import logo from "../../src/images/logo1.jpg";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/WhatsApp";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HomeIcon from "@mui/icons-material/Home";
// if you wanto to add twitter
// import TwitterIcon from '@mui/icons-material/Twitter';

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.primary.main,
    width: `100%`,
    position: "relative",
    overflow: "hidden",
    marginTop: "6em",
    padding: "2em 0 ",
  },
  footerItem: {
    textDecoration: "none",
    color: "grey",
    "&:hover": {
      color: "black",
    },
  },
  copylight: {
    color: "#fff",
    fontSize: "1em",
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
  snsIcon: {
    color: "#fff",
    width: "30px",
    height: "30px",

    [theme.breakpoints.down("xs")]: {
      width: "25px",
      height: "25px",
    },
    "&:hover": {
      color: theme.palette.secondary.main,
    },
  },
}));
console.log("logo", logo);

const socialMedia = {
  instagram: "/",
  facebook: "/",
  github: "/",
  homepage: "/",
  // You can add like this
  // twitter: "https://twitter.com",
};

const Footer = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <footer className={classes.footer}>
      <div>
        <Container maxWidth="lg">
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={3}>
                <div>
                  <Box
                    sx={{
                      maxHeight: { xs: 75, sm: 100, md: 150, lg: 180 },
                      maxWidth: { xs: 75, sm: 100, md: 150, lg: 180 },
                    }}
                  >
                    <Image
                      src={logo}
                      layout="responsive"
                      style={{
                        borderRadius: 25,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    />
                  </Box>

                  <div>
                    <Grid
                      container
                      direction="column"
                      style={{ margin: "1.2em 0" }}
                    >
                      <Grid item container spacing={2} justify="center">
                        <Grid
                          item
                          component={"a"}
                          target="_blank"
                          rel="noreferrer noopener"
                          href={socialMedia.homepage}
                        >
                          <HomeIcon className={classes.snsIcon} />
                        </Grid>
                        <Grid
                          item
                          component={"a"}
                          target="_blank"
                          rel="noreferrer noopener"
                          href={socialMedia.facebook}
                        >
                          <FacebookIcon className={classes.snsIcon} />
                        </Grid>
                        <Grid
                          item
                          component={"a"}
                          target="_blank"
                          rel="noreferrer noopener"
                          href={socialMedia.instagram}
                        >
                          <InstagramIcon className={classes.snsIcon} />
                        </Grid>
                        <Grid
                          item
                          component={"a"}
                          target="_blank"
                          rel="noreferrer noopener"
                          href={socialMedia.github}
                        >
                          <WhatsAppIcon className={classes.snsIcon} />
                        </Grid>
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Grid>
              <Grid item xs={9}>
                <div>
                  <Box sx={{ bgcolor: "#f9f5ea", color: "grey.700" }}>
                    <Container maxWidth="md" sx={{ py: 6 }}>
                      <Stack spacing={4}>
                        <Typography
                          sx={{ color: "common.black", textAlign: "center" }}
                        >
                          Giving you the accomodation of you dreams
                        </Typography>

                        <Box>
                          <Grid container spacing={4}>
                            <Grid item xs={6} md={4}>
                              <Stack
                                sx={{
                                  textAlign: "center",
                                }}
                                spacing={2}
                              >
                                <Typography
                                  sx={{
                                    color: "common.black",
                                    textAlign: "center",
                                  }}
                                >
                                  Our Cities
                                </Typography>
                                <Typography
                                  className={classes.footerItem}
                                  variant="subtitle"
                                  component="a"
                                  href="https://weetyu.com/en/search?lat=3.866667&lon=11.516667"
                                >
                                  Yaounde
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Stack
                                sx={{
                                  textAlign: "center",
                                }}
                                spacing={2}
                              >
                                <Typography
                                  sx={{
                                    color: "common.black",
                                    textAlign: "center",
                                  }}
                                >
                                  About Us
                                </Typography>
                                <Typography
                                  className={classes.footerItem}
                                  variant="subtitle"
                                  component="a"
                                  href="https://weetyu.com/en/contact"
                                >
                                  Contact Us
                                </Typography>

                                <Typography
                                  className={classes.footerItem}
                                  variant="subtitle"
                                  component="a"
                                  href="https://weetyu.com/en/team"
                                >
                                  Our Team
                                </Typography>
                              </Stack>
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <Stack
                                sx={{
                                  textAlign: "center",
                                }}
                                spacing={2}
                              >
                                <Typography
                                  sx={{
                                    color: "common.black",
                                    textAlign: "center",
                                  }}
                                >
                                  Rules & Policy
                                </Typography>
                                <Typography
                                  className={classes.footerItem}
                                  variant="subtitle"
                                  component="a"
                                  href="https://weetyu.com/en/document/confidentiality"
                                >
                                  Privacy Policy
                                </Typography>

                                <Typography
                                  className={classes.footerItem}
                                  variant="subtitle"
                                  component="a"
                                  href="https://weetyu.com/en/document/tip"
                                >
                                  Tips
                                </Typography>
                              </Stack>
                            </Grid>
                            {/* <Grid item xs={6} md={3}>
                              <Stack  sx={{
                                  textAlign: "center",
                                }} spacing={2}>
                                <Typography
                                  className={classes.footerItem}
                                  variant="subtitle"
                                  component="a"
                                  href="#"
                                >
                                  Terms of Use
                                </Typography>
                                <Typography
                                  className={classes.footerItem}
                                  variant="subtitle"
                                  component="a"
                                  href="#"
                                >
                                  Contact Us
                                </Typography>
                              </Stack>
                            </Grid> */}
                          </Grid>
                        </Box>

                        <Box>
                          <Select
                            name="lang"
                            variant="outlined"
                            size="small"
                            defaultValue="EN"
                            sx={{
                              borderWidth: "2px",
                              borderStyle: "solid",
                              borderColor: "common.black",
                              color: "common.black",
                              "& .MuiSelect-icon": {
                                color: "common.black",
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                border: "none",
                              },
                            }}
                          >
                            <MenuItem value="FR">French</MenuItem>
                            <MenuItem value="EN">English</MenuItem>
                          </Select>
                        </Box>

                        <Typography variant="caption">
                          Weetyu Logement, 8860 BP Yaoundé, Cameroun
                        </Typography>
                        <Typography variant="caption">
                          contact@weetyu.com
                        </Typography>
                      </Stack>
                    </Container>
                  </Box>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
      {/* 
          <Grid container spacing={3} justify="center">
        <Grid item xs={9}>
            
          </Grid>
          
          <Grid
            item
            container
            component={"a"}
            target="_blank"
            rel="noreferrer noopener"
            href="https://satoruakiyama.com"
            justify="center"
            style={{
              textDecoration: "none",
            }}
          >
            <Typography className={classes.copylight}>
              &copy;Satoru Akiyama
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          
        </Grid>
      </Container> */}
    </footer>
  );
};

export default Footer;
