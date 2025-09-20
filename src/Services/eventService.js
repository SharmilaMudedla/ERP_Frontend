import httpClient from "../Utils/httpClient";

const addEvent = async (data) => {
  try {
    const response = await httpClient.post("/event/addEvent", data);
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
const getEvents = async () => {
  try {
    const response = await httpClient.get("/event/getEvents");
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { addEvent, getEvents };
