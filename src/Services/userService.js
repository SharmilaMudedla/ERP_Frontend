import httpClient from "../utils/httpClient";
const addUser = async (data) => {
  try {
    const response = await httpClient.post("/user/addUser", data);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getUsers = async () => {
  try {
    const response = await httpClient.get("/user/getUsers");
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUser = async (id) => {
  try {
    const response = await httpClient.get(`/user/getSingleUser/${id}`);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateUser = async (id, data) => {
  try {
    const response = await httpClient.put(`/user/updateUser/${id}`, data);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const changeUserStatus = async (id) => {
  try {
    const response = await httpClient.patch(`/user/changeUserStatus/${id}`);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { addUser, getUsers, getUser, updateUser, changeUserStatus };
