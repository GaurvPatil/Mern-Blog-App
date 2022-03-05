import React from "react";
import image from "../images/404icon.png";
import { Button, Container, Typography } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();
  return (
    <Container maxWidth="lg">
      <div
        style={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          margin: "3rem 0",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <Typography variant="h3" style={{ fontWeight: "bold" }}>
            Be cool!
          </Typography>
          <br />
          <Typography variant="h3" style={{ fontWeight: "bold" }}>
            {" "}
            It´s just 404 ... ;)
          </Typography>
          <br />
          <br />
          <Button onClick={() => navigate("/", { replace: true })}
          style = {{background:"green", fontWeight:"bold"}}
          >
            Back To Home
          </Button>
        </div>
        <img src={image} alt="404" />
      </div>
    </Container>
  );
};

export default Error;
