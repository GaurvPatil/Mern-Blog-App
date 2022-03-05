import { Container, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import clsx from "clsx";
import { Image } from "cloudinary-react";

const useStyles = makeStyles((theme) => ({
  commonDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "1rem",
  },
  outerDiv: {
    marginTop: "5rem",
    fontFamily: "sans-serif",
  },
  headerTypos: {
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontSize: "2rem",
  },
  headerTyposRed: {
    color: "red",
  },
  mainHead: {
    fontSize: "2.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    imgsize: {
      width: "100%",
    },
  },
}));

const PostComplited = ({ post }) => {
  const { header, title, coverImage, category } = post;
  const {
    optionalImages,
    conclusion,
    lastBigImageoptional,
    intro,
    paragraphs,
    subheadings,
  } = post.body;
  const classes = useStyles();


  return (
    <Container maxWidth="lg">
      <div className={clsx(classes.outerDiv, classes.commonDiv)}>
        {category ? (
          <></>
        ) : (
          <Typography
            className={clsx(classes.headerTypos, classes.headerTyposRed)}
          >
            You forget to check category
          </Typography>
        )}
        <div className={classes.commonDiv}>
          {/* header  */}
          {header ? (
            <Typography
              className={clsx(classes.headerTypos, classes.mainHead)}
              variant="h4"
            >
              {header}
            </Typography>
          ) : (
            <Typography
              className={clsx(classes.headerTypos, classes.headerTyposRed)}
            >
              Header Required
            </Typography>
          )}

          {/* title  */}

          {title ? (
            <Typography
              className={clsx(classes.headerTypos, classes.mainHead)}
              variant="h4"
              style={{ textAlign: "center" }}
            >
              {title}
            </Typography>
          ) : (
            <Typography
              className={clsx(classes.headerTypos, classes.headerTyposRed)}
            >
              Title is required
            </Typography>
          )}
        </div>

        {/* cover Image  */}
        {coverImage ? (
          <Image cloudName="dg3djk3zp" publicId={coverImage} style = {{width:"100%"}}/>
       
        ) : (
          <Typography
            className={clsx(classes.headerTypos, classes.headerTyposRed)}
          >
            CoverImage Is Required
          </Typography>
        )}

        <section className={classes.commonDiv}>
          {intro && paragraphs ? (
            <article className={classes.commonDiv}>
              {/* intro  */}
              <Typography variant="h6">{intro}</Typography>

              {/* paragraphs  */}
              <div className={classes.commonDiv}>
                {paragraphs.map((para, index) => {
                  return <Typography key={index}>{para}</Typography>;
                })}
              </div>
            </article>
          ) : (
            <Typography
              className={clsx(classes.headerTypos, classes.headerTyposRed)}
            >
              Paragraph And Intro is required
            </Typography>
          )}

          {/* subheadings  */}
          {subheadings ? (
            <article className={classes.commonDiv}>
              {subheadings.map((subhead, index) => {
                const { heading, image, subheadParas } = subhead;
              
                return (
                  <div key={index}>
                    {/* sub head header  */}
                    <Typography
                      className={classes.headerTypos}
                      style={{ marginBottom: "1.5rem" }}
                    >
                      {heading}
                    </Typography>

                    {/* sub head image  */}

                    {image[0] && (
                      <div style={{ marginTop: "2rem ", marginBottom: "2rem" }}>
                        <Image
                          cloudName="dg3djk3zp"
                          publicId={image[0]}
                          className={classes.imgsize}
                        />
                      </div>
                    )}

                    {/* sub head paras  */}
                    <div>
                      {subheadParas.map((para, index) => {
                        return (
                          <Typography
                            key={index}
                            style={{ marginBottom: "1rem" }}
                          >
                            {para}
                          </Typography>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </article>
          ) : (
            <Typography
              className={clsx(classes.headerTypos, classes.headerTyposRed)}
            >
              At least 1 sub-head is required
            </Typography>
          )}

          {/* optional images  */}
          {optionalImages && (
            <article className={classes.commonDiv}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                {optionalImages.images &&
                  optionalImages.images.map((img, index) => {
                    return (
                      <div
                        key={index}
                        style={{ marginTop: "2rem ", marginBottom: "2rem" }}
                      >
                        <Image
                          cloudName="dg3djk3zp"
                          publicId={img}
                          style={{ width: "100%" }}
                        />
                      </div>
                    );
                  })}
              </div>
              {/* optionalImages paragraphs  */}
              {optionalImages.paragraphs && (
                <div className={classes.commonDiv}>
                  {optionalImages.paragraphs.map((para, index) => {
                    return <Typography key={index}> {para} </Typography>;
                  })}
                </div>
              )}
            </article>
          )}

          {/* last Big iamge  */}

          {lastBigImageoptional && (
            <article style={{ marginTop: "2rem ", marginBottom: "2rem" }}>
              <Image
                cloudName="dg3djk3zp"
                publicId={lastBigImageoptional}
                style={{ width: "100%" }}
              />
            </article>
          )}

          {/* conclusion  */}

          {conclusion ? (
            <article className={classes.commonDiv}>
              {conclusion.map((para, index) => {
                return <Typography key={index}>{para}</Typography>;
              })}
            </article>
          ) : (
            <Typography
              className={clsx(classes.headerTypos, classes.headerTyposRed)}
            >
              Conclusion Is Required
            </Typography>
          )}
        </section>
      </div>
    </Container>
  );
};

export default PostComplited;
