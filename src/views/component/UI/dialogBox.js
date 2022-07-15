import React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  Grow,
  IconButton,
  Typography,
} from "@material-ui/core";
import { ReactComponent as CloseIcon } from "src/assets/images/icons/close.svg";
import { useLocation } from "react-router-dom";
import "./ui.scss";

const DialogBox = ({ handleClose, open, title, content, closeIcon }) => {
  const location = useLocation();
  return (
    <Dialog
      className="custom-dialog"
      // maxWidth="md"
      onClose={handleClose}
      open={open}
      TransitionComponent={Grow}
      scroll={"paper"}
    >
      <Box className="dialog-content-box">
        <DialogTitle>
          <Box className="custom-dialog-title">
            <Typography variant="h3" className="dialog-title">
              {title}
              {closeIcon !== false && (
                <IconButton className="dialog-close" onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              )}
            </Typography>
          </Box>
        </DialogTitle>
      </Box>
      {content}
    </Dialog>
  );
};

export default DialogBox;
