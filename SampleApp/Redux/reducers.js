import { ADD_USER } from "./constants";

export const addUserReducer = (state=[],action) =>{

    switch(action.type){
        case ADD_USER:{
            return [...state,action.payload]
        }
        default:{
            return state;
        }
    }
}