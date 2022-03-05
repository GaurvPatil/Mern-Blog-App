import axios from "axios";
import React, { useEffect, useState } from "react";
import CommonPopularDaa from "../../CommonAllPopData/CommonPopularDaa";
import Loading from "../Loading";

const CryptoPopularPost = () => {
  const [allPost, setAllPost] = useState();
  const [loading, setLoading] = useState(true);
  const fetchingAllCryptoData = async (mounted ) => {
    try {
      const { data } = await axios.post("http://localhost:8080/api/category/posts/crypto/privatepopular");
  
      if (mounted) {
       
        setAllPost([...data.arr]);
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
  if (loading) {
    return <Loading />;
  }
  return <CommonPopularDaa allPostData={allPost} />;
};

export default CryptoPopularPost;
