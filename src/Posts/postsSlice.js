import {createSlice} from "@reduxjs/toolkit"
import {sub} from 'date-fns';
import db from "src/Database";

const initialState = db.reviews;

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdd(state, action){
            let date = new Date().toISOString();
            console.log("Date:", date);
            state.push({...action.payload, date: date});
        }
    }
})

export const selectAllPosts = (state) => state.posts;

export const {postAdd} = postSlice.actions

export default postSlice.reducer

