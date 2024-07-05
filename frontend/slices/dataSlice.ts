import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface DataState {
  items: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchSheets = createAsyncThunk("data/fetchSheets", async () => {
  const response = await axios.get("https://teste-vaga-fullstack.onrender.com/data");
  return response.data;
});

export const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<any[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSheets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSheets.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchSheets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao buscar planilhas";
      });
  },
});

export const { setData, setLoading, setError } = dataSlice.actions;

export default dataSlice.reducer;
