import httpClient from "../Utils/httpClient";
const addAttendance = async (data) => {
  try {
    const response = await httpClient.post(
      "/api/attendance/addAttendance",
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
const getEmployeesAttendance = async () => {
  try {
    const response = await httpClient.get("/api/attendance/getAttendances");
    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Something went wrong");
    }
    return response?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getSingleEmployeeAttendance = async (id) => {
  try {
    const response = await httpClient.get(
      `/api/attendance/getSingleAttendance/${id}`
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

const updateAttendance = async (id, data) => {
  try {
    const response = await httpClient.put(
      `/api/attendance/updateAttendance/${id}`,
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

const getAttendenceByDate = async (date) => {
  try {
    const response = await httpClient.get(
      `/api/attendance/getAttendanceByDate/${date}`
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

const getAttendanceByEmployee = async (employeeId) => {
  try {
    const response = await httpClient.get(
      `/api/attendance/getAttendanceByEmployeeId/${employeeId}`
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

const getAttendanceByDateAndEmployee = async (date, employeeId) => {
  try {
    const response = await httpClient.get(
      `/api/attendance/getAttendanceBydateAndEmployee/${date}/${employeeId}`
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

const getAttendanceByMonthAndEmployee = async (month, employeeId) => {
  try {
    const response = await httpClient.get(
      `/api/attendance/getAttendanceByMonthAndEmployee/${month}/${employeeId}`
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
  addAttendance,
  getEmployeesAttendance,
  getSingleEmployeeAttendance,
  updateAttendance,
  getAttendenceByDate,
  getAttendanceByEmployee,
  getAttendanceByDateAndEmployee,
  getAttendanceByMonthAndEmployee,
};
