import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setData, setError, setLoading } from "../slices/dataSlice";
import { useRouter } from "next/router";

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://teste-vaga-fullstack.onrender.com/data/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(setData(response.data.data));

      router.push("/detalhes");
    } catch (error) {
      if (error instanceof Error) {
        dispatch(setError(error.message));
      } else {
        dispatch(setError("Um erro desconhecido aconteceu"));
      }
    } finally {
      dispatch(setLoading(false));
      setUploading(false);
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
        disabled={uploading || !file}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-md transition duration-300 ${
          uploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {uploading ? "Fazendo Upload..." : "Fazer Upload"}
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
