import { createSlice } from "@reduxjs/toolkit"
import userServices from "../services/usersServices"

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers (state, action){
      return action.payload
    }
  }
})

export const initializeUsers = () => {
  return async (dispatch) => {
        const users = await userServices.getAll()
    dispatch(setUsers(users))
  }
}

export const {setUsers} = usersSlice.actions
export default usersSlice.reducer