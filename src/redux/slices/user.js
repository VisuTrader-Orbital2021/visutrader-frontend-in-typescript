import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { sendRequest } from "../../utils/api";

const initialState = {
  username: localStorage.getItem("username"),
  displayName: localStorage.getItem("displayName"),
  email: localStorage.getItem("email"),
  token: localStorage.getItem("token"),
  wallet: localStorage.getItem("wallet"),
  position: localStorage.getItem("position"),
  dateJoined: localStorage.getItem("dateJoined"),
  loading: false,
};

function setLocalStorage(data) {
  for (const [key, value] of Object.entries(data)) {
    if (value) {
      localStorage.setItem(key, value);
    }
  }
}

// Note: Signing up requires user to login again.
export const signUpUser = createAsyncThunk(
  "user/signup",
  async (request, { rejectWithValue }) => {
    try {
      const data = await sendRequest(
        "accounts/registration/",
        "",
        "post",
        request
      );

      return data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const getUserDetail = createAsyncThunk(
  "user/getUserDetail",
  async (token, { rejectWithValue }) => {
    try {
      const userDetail = await sendRequest("accounts/user/", token, "get");

      return userDetail;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (request, { dispatch, getState, rejectWithValue }) => {
    dispatch(resetUser());

    try {
      const { key } = await sendRequest("accounts/login/", "", "post", request);

      const tokenObject = {
        token: key,
      };

      const response = await dispatch(getUserDetail(tokenObject.token));

      if (response.type === getUserDetail.rejected.toString()) {
        return rejectWithValue(response.payload);
      }

      const userData = getState().user;

      setLocalStorage({
        username: userData.username,
        displayName: userData.displayName,
        email: userData.email,
        wallet: userData.wallet,
        position: userData.position,
        dateJoined: userData.dateJoined,
        token: tokenObject.token,
      });

      return tokenObject;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const forgotPasswordUser = createAsyncThunk(
  "user/forgotPassword",
  async (request, { rejectWithValue }) => {
    try {
      const response = await sendRequest(
        "accounts/password/reset/",
        null,
        "post",
        request
      );

      return response.detail;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resetPasswordUser = createAsyncThunk(
  "user/resetPassword",
  async (request, { rejectWithValue }) => {
    try {
      const path =
        "accounts/password/reset/confirm/" +
        request.uid +
        "/" +
        request.token +
        "/";

      const response = await sendRequest(path, null, "post", request);

      return response.detail;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUser: {
      reducer: (state) => {
        state.username = "";
        state.displayName = "";
        state.email = "";
        state.token = "";
      },
      prepare: () => {
        localStorage.clear();
        return {};
      },
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signUpUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpUser.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signUpUser.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.token = payload.token;
    });

    builder.addCase(getUserDetail.fulfilled, (state, { payload }) => {
      state.username = payload.username;
      state.displayName = payload.display_name;
      state.email = payload.email;
      state.wallet = payload.wallet;
      state.position = payload.position;
      state.dateJoined = payload.created_at;
    });
  },
});

export const { resetUser } = userSlice.actions;

export const userSelector = (state) => {
  const { username, displayName, email, dateJoined, token } = state.user;
  const authenticated = Boolean(token);
  return { username, displayName, email, dateJoined, token, authenticated };
};

export default userSlice.reducer;
