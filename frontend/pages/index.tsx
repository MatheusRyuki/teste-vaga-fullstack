import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Upload from "../components/Upload";

const Home = () => {
  const { items, loading, error } = useSelector(
    (state: RootState) => state.data
  );

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Lista dos dados</h1>
      <Upload />
      <ul className="mt-6">
        {items.map((item, index) => (
          <li key={index} className="p-4 border-b border-gray-200">
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
