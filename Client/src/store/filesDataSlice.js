import { createSlice } from '@reduxjs/toolkit'
import  Axios  from 'axios';
import API from "../ApiEndPonts"

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
  const response = await Axios.get(API.folders.getTree,{headers})
  if(response.status === 200){
    dispatch(update(response.data))
    return true;
  }
  dispatch(update(initialState))
  return false;
}

