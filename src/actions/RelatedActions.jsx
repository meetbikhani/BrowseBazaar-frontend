
import axios from "axios";
import { getrelated } from "../Features/RelatedSlice";



export const asyncgetrelated = (url) => async (dispatch,getstate) => {
    
    try{

        const data = await axios.get(
            import.meta.env.VITE_API_URL + url,
            {
              headers : {
                Authorization: "bearer " + import.meta.env.VITE_API_TOKEN,
              },
            }
          );
          // console.log("related ka data",data.data.data);
          dispatch(getrelated(data.data.data)) ;
    }
    catch(err){
        console.log(err);
    }
};