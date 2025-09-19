import httpClient from "../Utils/httpClient";
const addLeave = async (data) => {
  try {
    const response = await httpClient.post("/leave/addLeave", data);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getLeaves = async () => {
  try {
    const response = await httpClient.get("/leave/getLeaves");
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSingleLeave = async (id) => {
  try {
    const response = await httpClient.get(`/leave/getSingleLeave/${id}`);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const updateLeave = async (id, data) => {
  try {
    const response = await httpClient.put(`/leave/updateLeave/${id}`, data);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const changeLeaveStatus = async (id) => {
  try {
    const response = await httpClient.patch(`/leave/updateLeaveStatus/${id}`);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getProfileDetails = async () => {
  try {
    const response = await httpClient.get(
      "/employee/getEmployeeProfileDetails"
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
const getLeaveLeft = async (employeeId) => {
  try {
    const response = await httpClient.get(`/leave/getLeavesLeft/${employeeId}`);
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
  addLeave,
  getLeaves,
  getSingleLeave,
  updateLeave,
  changeLeaveStatus,
  getProfileDetails,
  getLeaveLeft,
};
