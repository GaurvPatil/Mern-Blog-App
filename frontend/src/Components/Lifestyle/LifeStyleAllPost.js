import axios from "axios";
import React, { useEffect, useState } from "react";
import CommonAllData from "../../CommonAllPopData/CommonAllData";
import Loading from "../Loading";

const LifeStyleAllPost = () => {
  const [allPost , setAllPost] = useState()
const [loading , setLoading] = useState(true)

const fetchingAllLfData = async (mounted ) => {
  try {
    const { data } = await axios.get("http://localhost:8080/api/category/posts/lifestyle&fashion");

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
  fetchingAllLfData(mounted)
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

export default LifeStyleAllPost;
