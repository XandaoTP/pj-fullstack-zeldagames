import { createSlice, PayloadAction } from '@reduxjs/toolkit'  


const initialState = {
    bgs: [{}],
  }

  const bgSlice = createSlice({
    name: 'bgs',
    initialState, 
    reducers: {
        addBg: (state, action: PayloadAction<any>) => {
            state.bgs = [...state.bgs, action.payload]
        },
        removeBg: (state, action) => {
            state.bgs = state.bgs.filter((b: any) => b.id !== action.payload.id)
        },
    },
  })

  export const { addBg, removeBg } = bgSlice.actions

export default bgSlice.reducer