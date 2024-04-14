
import axios from "axios";
import { getproducts } from "../Features/SearchSlice";



export const asyncgetsearch = (url) => async (dispatch,getstate) => {
    
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