import { ActionTypes } from "../constants/actionTypes";

const initialState = {
    movies: []
}
export const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_MOVIES:
            return action.payload
        default:
            return initialState.movies
    }
}