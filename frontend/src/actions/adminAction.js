import Axios from "axios";
import Cookie from "js-cookie";
import {
  ADMIN_SIGNIN_REQUEST,
  ADMIN_SIGNIN_SUCCESS,
  ADMIN_SIGNIN_FAIL,
  ADMIN_REGISTER_REQUEST,
  ADMIN_REGISTER_SUCCESS,
  ADMIN_REGISTER_FAIL,
  ADMIN_LOGOUT,
} from "../constants/adminConstant";

const signinadmin = (email, password) => async (dispatch) => {
  dispatch({ type: ADMIN_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("/api/admin/signinadmin", {
      email,
      password,
    });
    dispatch({ type: ADMIN_SIGNIN_SUCCESS, payload: data });
    Cookie.set("adminInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: ADMIN_SIGNIN_FAIL, payload: error.message });
  }
};

const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: ADMIN_REGISTER_REQUEST,
    payload: { name, email, password },
  });
  try {
    const { data } = await Axios.post("/api/admin/register", {
      name,
      email,
      password,
    });
    dispatch({ type: ADMIN_REGISTER_SUCCESS, payload: data });
    Cookie.set("adminInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ type: ADMIN_REGISTER_FAIL, payload: error.message });
  }
};

const logout = () => (dispatch) => {
  Cookie.remove("adminInfo");
  dispatch({ type: ADMIN_LOGOUT });
};

export { signinadmin, register, logout };
