import httpClient from "../Utils/httpClient";
const addEmployee = async (data) => {
  try {
    const response = await httpClient.post("/api/employee/addEmployee", data);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getEmployees = async () => {
  try {
    const response = await httpClient.get("/api/employee/getEmployees");
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getEmployee = async (id) => {
  try {
    const response = await httpClient.get(
      `/api/employee/getSingleEmployee/${id}`
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

const updateEmployee = async (id, data) => {
  try {
    const response = await httpClient.put(
      `/api/employee/updateEmployee/${id}`,
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

const changeEmployeeStatus = async (id) => {
  try {
    const response = await httpClient.patch(
      `/api/employee/updateEmployeeStatus/${id}`
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
const getEmployeeProfileDetails = async () => {
  try {
    const response = await httpClient.get(
      "/api/employee/getEmployeeProfileDetails"
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
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  changeEmployeeStatus,
  getEmployeeProfileDetails,
};
