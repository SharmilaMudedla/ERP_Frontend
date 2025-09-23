import httpclient from "../Utils/httpClient";

const getEmployeeData = async () => {
  try {
    const response = await httpclient.get("/api/employee/totalEmployees");
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getEmployeeBirthdays = async () => {
  try {
    const response = await httpclient.get("/api/employee/getEmployeeBirthdays");
    console.log(response);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { getEmployeeData, getEmployeeBirthdays };
