import { getproductdetails } from "../Features/ProductDetailsSlice";
import axios from "axios";


export const asyncgetproductdetails = (url) => async (dispatch,getstate) => {
    
    try{

        const data = await axios.get(
            import.meta.env.VITE_API_URL + url,
            {
              headers : {
                Authorization: "bearer " + import.meta.env.VITE_API_TOKEN,
              },
            }
          );
          dispatch(getproductdetails(data?.data?.data)) ;
    }
    catch(err){
        console.log(err);
    }
};