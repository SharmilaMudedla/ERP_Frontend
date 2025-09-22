import httpClient from "./httpClient";

export const uploadFileImage = async (image) => {
  let uploadRes;
  if (image.size < 2000000) {
    const formData = new FormData();
    formData.append("file", image);
    uploadRes = await httpClient.post(`/api/uploads/upload`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    uploadRes = {
      message: `Upload an Image less than 2MB`,
    };
  }
  return uploadRes;
};
