import { getproducts } from "../Features/ProductSliderSlice";
import axios from "axios";


export const asyncgetproducts = (url) => async (dispatch,getstate) => {
    
    try{

        const data = await axios.get(
            import.meta.env.VITE_API_URL + url,
            {
              headers : {
                Authorization: "bearer " + import.meta.env.VITE_API_TOKEN,
              },
            }
          );
          
          dispatch(getproducts(data?.data?.data)) ;
    }
    catch(err){
        console.log(err);
    }
};