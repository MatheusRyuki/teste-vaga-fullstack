import Upload from "../components/Upload";
import Link from "next/link";

const UploadPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-3xl w-full bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Upload de Nova Planilha
        </h1>
        <Upload />
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md transition duration-300 ease-in-out text-center block w-full md:w-auto text-lg font-semibold"
          >
            Voltar para a Página Inicial
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
