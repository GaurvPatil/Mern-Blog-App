import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { article } from "../CommonStyle";
import clsx from "clsx";
import {
  Button,
  makeStyles,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import {
  addItemInArr,
  removeLastItemFromArr,
  updateItemInArr,
  deleteItemFromArr,
} from "../CommonFunctions/commonFunction";

const useStyles = makeStyles((theme) => ({
  article,
  textAreaPara: {
    marginTop: "1rem",
    width: "100%",
    marginBottom: "2rem",
  },
  subParaTypo: {
    fontWeight: "bold",
    fontSize: "1rem",
  },
  subParaIcons: {
    cursor: "pointer",
    marginRight: "1rem",
  },
  subParaIconsDelete: {
    color: "red",
  },
  textAreaSubPara: {
    width: "100%",
  },
  updateBtn: {
    background: "green",
    fontWeight: "bold",
  },
}));

const ParaArr = ({ sectionData, setSectionData }) => {
  const [paragraph, setParagraph] = useState("");
  const [value, setValue] = useState();
  const classes = useStyles();
  return (
    <>
      <article className={classes.article}>
        <Typography variant="h5">
          Paragraphs &nbsp; &nbsp;
          <Button
            variant="contained"
            onClick={() => {
              addItemInArr(paragraph, setParagraph, setSectionData);
            }}
            style={{
              background: "green",
              fontWeight: "bold",
            }}
          >
            Add
          </Button>{" "}
          &nbsp; &nbsp;
          <Button
            variant="contained"
            color="secondary"
            onClick={() => {
              removeLastItemFromArr(setValue, sectionData, setSectionData);
            }}
            style={{
              background: "red",
              fontWeight: "bold",
            }}
          >
            Remove
          </Button>
        </Typography>

        <div>
          <TextareaAutosize
            placeholder="Paragrpah"
            minRows="5"
            className={classes.textAreaPara}
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
          />

          {sectionData.paragraphs.map((para, index) => {
            return (
              <div key={index}>
                <Typography className={classes.subParaTypo}>
                  Para - {index + 1}
                </Typography>
                <div>
                  <EditIcon
                    className={classes.subParaIcons}
                    onClick={() => {
                      setValue(index);
                    }}
                  />
                  <DeleteIcon
                    className={clsx(
                      classes.subParaIcons,
                      classes.subParaIconsDelete
                    )}
                    onClick={() => {
                      deleteItemFromArr(
                        index,
                        sectionData.paragraphs,
                        setSectionData
                      );
                    }}
                  />
                </div>
                {value === index ? (
                  <>
                    <TextareaAutosize
                      className={classes.textAreaSubPara}
                      minRows="5"
                      defaultValue={para}
                      onChange={(e) => setParagraph(e.target.value)}
                    />
                    {value === index && (
                      <Button
                        className={classes.updateBtn}
                        variant="contained"
                        onClick={() => {
                          updateItemInArr(
                            index,
                            paragraph,
                            sectionData.paragraphs,
                            setSectionData,
                            setParagraph
                          );
                          setValue();
                        }}
                      >
                        update
                      </Button>
                    )}
                  </>
                ) : (
                  <TextareaAutosize
                    className={classes.textAreaSubPara}
                    minRows="5"
                    value={para}
                  />
                )}
              </div>
            );
          })}
        </div>
      </article>
    </>
  );
};

export default ParaArr;
