import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Auth from "../Pages/Authenticate/Auth";
import { DialogActions } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ likes , comment }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
     

{
  likes ? (
    <Button color="primary" onClick={handleClickOpen}>

      
        <FavoriteBorderIcon fontSize="small" style={{ color: "red" }} /> &nbsp; {likes}
     
  </Button>
  ) : (
    <Button
    style={{ marginTop: "10px" }}
    fullWidth
    disabled={!comment}
    color="primary"
    variant="contained"
    onClick={handleClickOpen}
  >
 COMMENT
  </Button>
  )
}

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            <CancelIcon style={{ color: "red" }} />
          </Button>
        </DialogActions>
        <DialogTitle id="alert-dialog-slide-title">
          {"log in or sign up for like and comment on post"}
        </DialogTitle>

        <DialogContent>
          <Auth />
        </DialogContent>
      </Dialog>
    </div>
  );
}
