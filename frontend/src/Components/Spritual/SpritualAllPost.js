import axios from "axios";
import React, { useEffect, useState } from "react";
import CommonAllData from "../../CommonAllPopData/CommonAllData";
import Loading from "../Loading";

const SpritualAllPost = () => {
  const [allPost , setAllPost] = useState()
const [loading , setLoading] = useState(true)


const fetchingAllSpritualData = async (mounted ) => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/category/posts/spritual");

    if (mounted) {
      setAllPost([...data.data]);
      setLoading(false)

    }
  } catch (error) {
    console.log(error);
  }
};
useEffect(()=>{
  let mounted = true;
  fetchingAllSpritualData(mounted)
  return () => {
    mounted = false;
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[])
if(loading){
return <Loading />
}


  return <CommonAllData allPostData={allPost} />;
};

export default SpritualAllPost;
