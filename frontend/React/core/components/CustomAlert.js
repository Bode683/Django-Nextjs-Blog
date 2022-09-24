import * as React from "react";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";

export default function CustomAlert({ msg, open, setOpen }) {
  const closeAlert = () => {
    setOpen(false);
  };
  const openAlert = () => {
    setOpen(!open);
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Alert severity="info" onClose={() => setOpen(false)} closeText="Close">
          {msg}
        </Alert>
      </Dialog>
    </>
  );
}
