import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setData, setLoading, setError } from '../slices/dataSlice';
import { fetchData } from '../services/api';

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.data);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchData(page);
        dispatch(setData(data));
      } catch (error) {
        dispatch(setError(error.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    getData();
  }, [dispatch, page]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1>Lista dos dados</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
      <button onClick={loadMore}>Carregar Mais</button>
    </div>
  );
}
