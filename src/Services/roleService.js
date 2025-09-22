import httpClient from "../Utils/httpClient";
const addRole = async (data) => {
  try {
    const response = await httpClient.post("/api/role/addRole", data);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getRoles = async () => {
  try {
    const response = await httpClient.get("/api/role/getRoles");
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getRole = async (id) => {
  try {
    const response = await httpClient.get(`/api/role/getSingleRole/${id}`);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateRole = async (id, data) => {
  try {
    const response = await httpClient.put(`/api/role/updateRole/${id}`, data);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const changeRoleStatus = async (id) => {
  try {
    const response = await httpClient.patch(`/api/role/updateRoleStatus/${id}`);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { addRole, getRoles, getRole, updateRole, changeRoleStatus };
