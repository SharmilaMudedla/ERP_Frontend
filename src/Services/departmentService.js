import httpClient from "../Utils/httpClient";
const addDepartment = async (data) => {
  try {
    const response = await httpClient.post(
      "/api/department/addDepartment",
      data
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getDepartments = async () => {
  try {
    const response = await httpClient.get("/api/department/getDepartments");
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSingleDepartment = async (id) => {
  try {
    const response = await httpClient.get(
      `/api/department/getSingleDepartment/${id}`
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateDepartment = async (id, data) => {
  try {
    const response = await httpClient.put(
      `/api/department/updateDepartment/${id}`,
      data
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const changeDepartmentStatus = async (id) => {
  try {
    const response = await httpClient.patch(
      `/api/department/updateDepartmentStatus/${id}`
    );
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  addDepartment,
  getDepartments,
  getSingleDepartment,
  updateDepartment,
  changeDepartmentStatus,
};
