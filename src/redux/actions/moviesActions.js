import axios from "axios"
import { ActionTypes } from "../constants/actionTypes"
import apiServices from "../../apiServices/apiServices"

export const fetchUpcomingMovies=()=>{
    return async function (dispatch,getState) {
        const response = await apiServices.get(`/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)

        dispatch({type:ActionTypes.FETCH_MOVIES,payload:response.data.results})
    }
} 