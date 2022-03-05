import axios from "axios";
import React, { useEffect, useState } from "react";
import CommonAllData from "../../CommonAllPopData/CommonAllData";
import Loading from "../Loading";

const CryptoAllPost = () => {
const [allPost , setAllPost] = useState()
const [loading , setLoading] = useState(true)

  
const fetchingAllCryptoData = async (mounted ) => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/category/posts/crypto");
  
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
    fetchingAllCryptoData(mounted)
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

export default CryptoAllPost;
