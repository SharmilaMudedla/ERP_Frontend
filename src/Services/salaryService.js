import httpClient from "../Utils/httpClient";

const addSalary = async (data) => {
  try {
    const response = await httpClient.post(
      "/api/salarystructure/addSalarystructure",
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

const getSalaries = async () => {
  try {
    const response = await httpClient.get(
      "/api/salarystructure/getSalarystructures"
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

const getSingleSalarystructure = async (id) => {
  try {
    const response = await httpClient.get(
      `/api/salarystructure/getSalarystructure/${id}`
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

const updateSalarystructure = async (id, data) => {
  try {
    const response = await httpClient.put(
      `/api/salarystructure/updateSalarystructure/${id}`,
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

export {
  addSalary,
  getSalaries,
  getSingleSalarystructure,
  updateSalarystructure,
};
