import httpClient from "../Utils/httpClient";

const userLogin = async (data) => {
  try {
    const response = await httpClient.post("/api/user/login", data);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { userLogin };
