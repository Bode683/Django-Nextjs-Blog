import MainNavigation from "./MainNavigation";
import Footer from "./Footer";
import { Box } from "@mui/material";

function Layout(props) {
  return (
    <div>
      <MainNavigation />
      <Box sx={{ margin: "3rem auto", width: "90vw" }}>
        <main>{props.children}</main>
      </Box>
      <Footer />
    </div>
  );
}

export default Layout;
