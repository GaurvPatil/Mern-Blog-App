import { Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

export const modalDataSetupOne = (finalData) => {
  return (
    <>
      <Typography
        gutterBottom
        style={{
          fontWeight: "bold",
        }}
      >
        Intro
      </Typography>
      <Typography gutterBottom>{finalData.intro}</Typography>
      {finalData.paragraphs.map((para, index) => {
        return (
          <div
            style={{
              marginTop: "12px",
            }}
            key={index}
          >
            <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
              {" "}
              Para - {index + 1}{" "}
            </p>
            <p>{para}</p>
          </div>
        );
      })}
    </>
  );
};

// section two setup

export const modalDataSetupTwo = (
  subheadings,
  setSubheadings,
  dispatchBody
) => {
  return (
    <>
      {subheadings.map((subhead, index) => {
        const { heading, subheadParas } = subhead;
        return (
          <div key={index}>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  marginBottom: "5px",
                  color: "green",
                }}
              >
                Subhead - {index + 1}
              </p>

              <DeleteIcon
                style={{
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={() => {
                  if (subheadings.length > 0) {
                    const newArr = subheadings.filter(
                      (subhead, idx) => idx !== index
                    );
                  
                    dispatchBody({ type: "SECTION_TWO", payload: [...newArr] });
                    setSubheadings(newArr);
                  }
                }}
              />
            </div>
            <div>
              <Typography>{heading}</Typography>
              {subheadParas.map((para, index) => {
                return (
                  <div key={index}>
                    <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                      Para - {index + 1}
                    </p>
                    <p
                      style={{
                        marginBottom: "5px",
                      }}
                    >
                      {para}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
};

