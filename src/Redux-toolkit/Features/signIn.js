import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sign_in = createAsyncThunk(
  "/sign/in",
  async ({ email, password }) => {
    return fetch("https://mern-ecommerce-backend-vjq6.onrender.com/api/v1/sign/in", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert(data.message);
        // if(data.success == false){
        //   alert(data.message)
        // }
        return data;
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }
);
const signIn = createSlice({
  name: "signIn",
  initialState: {
    user_id: "",
    auth: false,
    loading: false,
  },
  extraReducers: {
    [sign_in.pending]: (state) => {
      state.auth = false;
      state.loading = true;
    },
    [sign_in.fulfilled]: (state, action) => {
      if (action.payload && action.payload.user) {
        state.user_id = action.payload.user._id;
        state.auth = action.payload.success;
      } else {
        state.user_id = "";
        state.auth = false;
      }
      state.loading = false;
    },
    [sign_in.rejected]: (state) => {
      state.auth = false;
      state.loading = false;
    },
  },
});


export default signIn.reducer;
