import axios from "axios";
import toast from "react-hot-toast";
import { backendUri } from "./BackendUri";

const baseUrl = axios.create({
  baseURL: backendUri,
});

export const LogIn = async ({ userEmail, password, email }) => {
  try {
    let response = await baseUrl.post(
      "/user/login",
      { userEmail, password, email },
      {}
    );
    localStorage.setItem("jwt_token", response.data.token);
    toast.success(response.data.msg);
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.msg);
  }
};

export const LogOut = async () => {
  try {
    let response = await baseUrl.get("/user/logout", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });
    toast.success(response.data.msg);
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.msg);
  }
};

export const Register = async ({ userEmail, userName, password }) => {
  try {
    let response = await baseUrl.post(
      "/user/register",
      { userEmail, userName, password },
      {}
    );
    localStorage.setItem("jwt_token", response.data.token);
    toast.success(response.data.msg);
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.msg);
  }
};

export const Get_current_user = async () => {
  try {
    let response = await baseUrl.get("/user/get-current-user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const Get_all_users = async () => {
  try {
    let response = await baseUrl.get("/user/get-all-users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const Search_user = async ({ name }) => {
  try {
    let response = await baseUrl.get(`/user/search?name=${name}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const Get_user = async ({ userid }) => {
  try {
    console.log(userid)
    let response = await baseUrl.get(`/user/get-user/${userid}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const Delete_user = async ({ userid }) => {
  try {
    let response = await baseUrl.post(
      "/user/delete-user",
      { userid },
      {}
    );
    localStorage.getItem("jwt_token");
    toast.success(response.data.msg);
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.msg);
  }
};

export const Update_user = async ({ userId, ...formData }) => {
  try {
    console.log("Before ", )
    let response = await baseUrl.post(
      "/user/update-user",
      { userId, ...formData }
    );
    localStorage.getItem("jwt_token");
    toast.success(response.data.msg);
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.msg);
  }
};

export const Add_user = async ({ userEmail, userName, password }) => {
  try {
    let response = await baseUrl.post(
      "/user/add-user",
      { userEmail, userName, password },
      {}
    );
    toast.success(response.data.msg);
    return response;
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.msg);
  }
};
