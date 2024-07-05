import Link from "next/link";

const Home = () => {
  return (
    <div className="container mx-auto p-4 h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Bem-vindo ao Gerenciamento de Planilhas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 w-full">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Upload de Nova Planilha
          </h2>
          <p className="text-lg text-gray-700 mb-4 text-center">
            Faça o upload de uma nova planilha para ser salvo.
          </p>
          <Link
            href="/upload"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out text-center block w-full text-xl font-semibold"
          >
            Iniciar Upload
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-6 w-full">
          <h2 className="text-2xl font-semibold mb-4 text-blue-600">
            Visualizar Planilhas Anteriores
          </h2>
          <p className="text-lg text-gray-700 mb-4 text-center">
            Visualize e gerencie planilhas que foram salvas antes.
          </p>
          <Link
            href="/planilhas"
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out text-center block w-full text-xl font-semibold"
          >
            Ver Planilhas
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
