
import axios from "axios";
import { getcategory } from "../Features/CategorySlice";


export const asyncgetcategory = (url) => async (dispatch,getstate) => {
    
    try{

        const data = await axios.get(
            import.meta.env.VITE_API_URL + url,
            {
              headers : {
                Authorization: "bearer " + import.meta.env.VITE_API_TOKEN,
              },
            }
          );
          
          dispatch(getcategory(data?.data?.data)) ;
    }
    catch(err){
        console.log(err);
    }
};