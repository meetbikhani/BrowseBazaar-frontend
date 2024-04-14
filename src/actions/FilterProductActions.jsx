
import axios from "axios";
import { getfilterproducts } from "../Features/FilterProductSlice";


export const asyncgetfilterproducts = (url) => async (dispatch,getstate) => {
    
    try{

        const data = await axios.get(
            import.meta.env.VITE_API_URL + url,
            {
              headers : {
                Authorization: "bearer " + import.meta.env.VITE_API_TOKEN,
              },
            }
          );
          
          dispatch(getfilterproducts(data?.data?.data)) ;
    }
    catch(err){
        console.log(err);
    }
};