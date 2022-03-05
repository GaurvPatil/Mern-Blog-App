import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Button } from "@material-ui/core";
import { Image } from "cloudinary-react";
import Loading from "./Loading";
import { useParams } from "react-router-dom";
import ShareModal from "./ShareModal";

const SingleNews = () => {
    const [loading, setLoading] = useState(true);
  const [post, setPost] = useState("");
  const params = useParams();
  const postUrl = `/news/${post?._id}`;
  
  const fetchingPost = async (mounted) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/category/posts/news/${params.id}`
      );

      if (mounted) {
        setPost(data.data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let mounted = true;
    fetchingPost(mounted);
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading ) {
    return <Loading />;
  }

  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap:"1rem",
        marginTop:"3rem",
        marginBottom:"2rem"
      }}
    >
      <Typography variant="h6">{post.title}</Typography>
      <div style={{ marginTop: "2rem ", marginBottom: "2rem", width: "100%" }}>
        <Image cloudName="dg3djk3zp" publicId={post.coverImage} style={{ width: "100%" }} />
        
      </div>
      <Typography style={{fontWeight:"bold"}}>{post.body.intro}</Typography>
      {post.body.paragraphs &&
        post.body.paragraphs.map((para, index) => {
          return (
            <div key={index}>
              <Typography>{para}</Typography>
            </div>
          );
        })}

      <Button style={{ fontWeight: "bold"  }}>
        {" "}
        <ShareModal postUrl={postUrl} /> 
      </Button>
    </Container>
  );
};

export default SingleNews;
