import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filesData: {
    id: null,
    type: "Folder",
    name: "root",
    contains: []
  }
}

export const filesDataSlice = createSlice({
  name: 'filesData',
  initialState,
  reducers: {
    update: (state, action) => {
      state.filesData = action.payload
    },
  },
})


export const { update, setProjectID } = filesDataSlice.actions
export default filesDataSlice.reducer