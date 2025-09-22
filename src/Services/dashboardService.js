import httpclient from "../Utils/httpClient";

const getEmployeeData = async () => {
  try {
    const response = await httpclient.get("/employee/totalEmployees");
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getEmployeeData };
