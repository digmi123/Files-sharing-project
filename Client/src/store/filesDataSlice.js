import { createSlice } from '@reduxjs/toolkit'
import  Axios  from 'axios';
import API from "../ApiEndPonts"
// import { useNavigate } from "react-router-dom";

const headers = { "x-access-token": localStorage.getItem("token")};

const initialState = {
  filesData:{
    id : 0,
    type: "Folder",
    name: "root",
    contains : []
  }
}

export const filesDataSlice = createSlice({
  name: 'filesData',
  initialState ,
  reducers: {
    update: (state,action) => {
        state.filesData = action.payload
    },
  },
})


export const { update } = filesDataSlice.actions
export default filesDataSlice.reducer


export const updateFilesData = () => async (dispatch) => {
  Axios.get(API.folders.getTree,{headers})
  .then(response => { dispatch(update(response.data)) })
  .catch(error =>{ dispatch(update(initialState))})
}

