import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import ShareIcon from "@material-ui/icons/Share";
import {
  FacebookShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
} from "react-share";
import {
  FacebookIcon,
  WhatsappIcon,
  TelegramIcon,
  TwitterIcon,
  LinkedinIcon,
  EmailIcon,
} from "react-share";

import LinkIcon from "@material-ui/icons/Link";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Button, Tooltip } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShareModal({ postUrl }) {
  const [open, setOpen] = React.useState(false);
  const URL = `/http:/localhost:3000${postUrl}`;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ShareIcon onClick={handleClickOpen} />

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WhatsappShareButton url={URL} title="Check out this amazing post">
              <WhatsappIcon logofillcolor="white" round={true}></WhatsappIcon>
            </WhatsappShareButton>

            <FacebookShareButton url={URL} quote="Check out this amazing post">
              <FacebookIcon logofillcolor="white" round={true}></FacebookIcon>
            </FacebookShareButton>

            <TelegramShareButton url={URL} title="Check out this amazing post">
              <TelegramIcon logofillcolor="white" round={true}></TelegramIcon>
            </TelegramShareButton>

            <LinkedinShareButton
              url={URL}
              title="Check out this amazing post"
              source="/http://localhost:3000/"
            >
              <LinkedinIcon logofillcolor="white" round={true}></LinkedinIcon>
            </LinkedinShareButton>

            <TwitterShareButton url={URL} title="Check out this amazing post">
              <TwitterIcon logofillcolor="white" round={true}></TwitterIcon>
            </TwitterShareButton>

            <EmailShareButton url={URL} subject="Check out this amazing post">
              <EmailIcon logofillcolor="white" round={true}></EmailIcon>
            </EmailShareButton>
          </div>
          <div
            style={{
              margin: "2rem 0",
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <input
              type="text"
              value={URL}
              readOnly
              style={{
                padding: "0.5rem",
                borderRadius: "5px",
                border: "2px solid black",
              }}
            />
            <CopyToClipboard text={URL}>
              <Tooltip title="copy to clipboard" placement="top">
                <Button
                  style={{
                    background: "black",
                    color: "white",
                    fontWeight: "bold",
                    borderRadius: "5px",
                  }}
                >
                  <LinkIcon
                    style={{
                      transform: "rotate(45deg)",
                    }}
                  />{" "}
                  Copy{" "}
                </Button>
              </Tooltip>
            </CopyToClipboard>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
