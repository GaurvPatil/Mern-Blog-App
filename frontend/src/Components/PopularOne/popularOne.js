import axios from "axios";



export const fetchingPopularOne = async (mounted, setPop ,setLoading) => {
    try {
      const cryptoPopular = await axios.post(
        "http://localhost:8080/api/category/posts/crypto/popularone"
      );
  
      const spritualPopular = await axios.post(
        "http://localhost:8080/api/category/posts/spritual/popularone"
      );
  
      const lfPopular = await axios.post(
        "http://localhost:8080/api/category/posts/lifestyle&fashion/popularone"
      );
  
      if (mounted) {
       
        setPop([
         
         cryptoPopular.data.popular,
         spritualPopular.data.popular,
         lfPopular.data.popular
        ]);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  