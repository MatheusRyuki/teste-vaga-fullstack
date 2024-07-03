import axios from "axios";

export const fetchData = async (page: number) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/api/data?page=${page}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
