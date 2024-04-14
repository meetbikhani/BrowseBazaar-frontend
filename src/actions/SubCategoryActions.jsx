
import axios from "axios";
import { getsubcategory } from "../Features/SubCategorySlice";



export const asyncgetsubcategory = (url) => async (dispatch,getstate) => {
    
    try{

        const data = await axios.get(
            import.meta.env.VITE_API_URL + url,
            {
              headers : {
                Authorization: "bearer " + import.meta.env.VITE_API_TOKEN,
              },
            }
          );
          
          dispatch(getsubcategory(data?.data?.data)) ;
    }
    catch(err){
        console.log(err);
    }
};