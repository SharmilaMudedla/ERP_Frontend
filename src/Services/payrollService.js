import httpClient from "../Utils/httpClient";
const addPayroll = async (data) => {
  try {
    const response = await httpClient.post("/api/payroll/addPayroll", data);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getPayrolls = async () => {
  try {
    const response = await httpClient.get("/api/payroll/getPayrolls");
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSinglePayroll = async (id) => {
  try {
    const response = await httpClient.get(
      `/api/payroll/getSinglePayroll/${id}`
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

const updatePayroll = async (id, data) => {
  try {
    const response = await httpClient.put(
      `/api/payroll/updatePayroll/${id}`,
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

export { addPayroll, getPayrolls, getSinglePayroll, updatePayroll };
