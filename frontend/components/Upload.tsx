import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setData, setError, setLoading } from "../slices/dataSlice";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/data/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(setData(response.data.data));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("Um erro desconhecido aconteceu"));
      }
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Upload de Planilha
      </h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300"
      >
        Fazer Upload
      </button>
      {file && (
        <p className="mt-4 text-sm text-gray-500">
          Arquivo selecionado: {file.name}
        </p>
      )}
    </div>
  );
};

export default Upload;
