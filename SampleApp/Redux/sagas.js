import {takeEvery} from 'redux-saga/effects';
import {POST_USER_DATA_REQUEST} from './action';

function* handler(){
    yield takeEvery(POST_USER_DATA_REQUEST, postUser);
}
function* postUser(action){
    try{
        //API call
    }catch(e){

    }
}

export {handler};