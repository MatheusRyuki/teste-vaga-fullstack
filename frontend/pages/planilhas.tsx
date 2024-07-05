import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { fetchSheets, setData } from "../slices/dataSlice";
import router from "next/router";

const ViewSheets = () => {
  const dispatch = useDispatch();
  const {
    items: sheets,
    loading,
    error,
  } = useSelector((state: RootState) => state.data);

  useEffect(() => {
    dispatch(fetchSheets() as any);
  }, [dispatch]);

  const uniqueSpreadsheetIds = Array.from(
    new Set(sheets.map((sheet) => sheet.spreadsheetId))
  );

  const handleDetailsClick = (spreadsheetId: string) => {
    const sheetItems = sheets.filter(
      (sheet) => sheet.spreadsheetId === spreadsheetId
    );

    dispatch(setData(sheetItems));
    router.push("/detalhes");
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600 text-lg">
          Carregando planilhas...
        </span>
      </div>
    );

  if (error)
    return <p className="h-screen">Erro ao carregar planilhas: {error}</p>;

  return (
    <div className="container mx-auto p-6 h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">
        Visualizar Planilhas Anteriores
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueSpreadsheetIds.map((spreadsheetId) => (
          <div
            key={spreadsheetId}
            className="bg-white shadow-lg rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-700">
                ID: {spreadsheetId}
              </h2>
              <button
                className="text-blue-600 hover:text-blue-800 flex items-center"
                onClick={() => handleDetailsClick(spreadsheetId)}
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSheets;
