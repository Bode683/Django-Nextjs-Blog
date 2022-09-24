import { TextField, Button, Divider } from "@mui/material";
import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
const Newsletter = () => {
  return (
    <div>
      <Divider sx={{ marginTop: "2.5em" }} />
      <Box sx={{ marginTop: "2.5em" }}>
        <Typography
          variant="h6"
          component="p"
          color="common.black"
          textAlign="center"
          sx={{ my: 3 }}
        >
          Enter your email to subscribe to our newsletter.
        </Typography>
        <Grid container>
          <Grid item xs>
            <TextField
              variant="filled"
              label="Email address"
              fullWidth
              sx={{ bgcolor: "common.white" }}
            />
          </Grid>
          <Grid item xs="auto">
            <Button
              variant="contained"
              size="large"
              color="primary"
              sx={{ height: "100%", borderRadius: "2px" }}
            >
              Subscribe Now!
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Newsletter;
