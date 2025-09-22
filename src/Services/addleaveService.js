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
const changeLeaveStatus = async (id, status, employeeId) => {
  try {
    const response = await httpClient.patch(`/leave/updateLeaveStatus/${id}`, {
      status,
      employeeId,
    });
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
const getLeavesByDate = async (date) => {
  try {
    const response = await httpClient.get(`/leave/getLeavesByDate/${date}`);
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
  getLeaveLeft,
  getLeavesByDate,
};
