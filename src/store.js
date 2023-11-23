import { configureStore, createSlice } from "@reduxjs/toolkit";
import user from "./store/userSlice";

let cart = createSlice({
  name: "cart",
  initialState: [
    { id: 0, name: "White and Black", count: 2 },
    { id: 2, name: "Grey Yordan", count: 1 },
  ],
  reducers: {
    changeCount(state, action) {
      let id = state.findIndex((a) => {
        return a.id === action.payload;
      });
      state[id].count++;
    },
    addItem(state, action) {
      let id = state.findIndex((a) => {
        return a.id === action.payload.id;
      });
      if (id === action.payload.id) {
        state[id].count++;
      } else {
        state.push(action.payload);
      }
    },
    deleteItem(state, action) {
      let id = state.findIndex((a) => {
        return a.id === action.payload.id;
      });
      state.splice(id, 1);
    },
  },
});

export let { changeCount, addItem, deleteItem } = cart.actions;

export default configureStore({
  reducer: {
    cart: cart.reducer,
    user: user.reducer,
  },
});
