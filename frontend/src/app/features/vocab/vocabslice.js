import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllVocab = createAsyncThunk("fetchAllVocab", async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/quiz/fetchallvocab`,
    {
      method: "GET",
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  return response.json();
});

export const addVocab = createAsyncThunk("addVocab", async (formData) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/quiz/create`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(formData),
  });
  return response.json();
});

export const deleteVocab = createAsyncThunk("deleteVocab", async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/quiz/deletevocab/${id}`,
    {
      method: "DELETE",
    }
  );
  return response.json();
});

export const updateVocab = createAsyncThunk("updateVocab", async (formData) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/quiz/updatevocab/${formData.id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify(formData),
    }
  );
  return response.json();
});

const initialState = {
  vocabs: [],
  status: "idle",
  error: null,
};

export const vocabSlice = createSlice({
  name: "vocab",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllVocab.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllVocab.fulfilled, (state, action) => {
      state.status = "success";
      state.vocabs = action.payload;
    });
    builder.addCase(fetchAllVocab.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(addVocab.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addVocab.fulfilled, (state, action) => {
      state.status = "success";
      state.vocabs.push(action.payload);
    });
    builder.addCase(addVocab.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(deleteVocab.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteVocab.fulfilled, (state, action) => {
      state.status = "success";
      state.vocabs = state.vocabs.filter(
        (vocab) => vocab._id !== action.payload._id
      );
    });
    builder.addCase(deleteVocab.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(updateVocab.pending, (state, action) => {
        state.status = "loading";
      });
      builder.addCase(updateVocab.fulfilled, (state, action) => {
        state.status = "success";
        const updatedTask = action.payload;
        const index = state.vocabs.findIndex(vocab => vocab._id === updatedTask._id);
        if (index !== -1) {
          state.vocabs[index] = updatedTask;
        }
      });
      builder.addCase(updateVocab.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
      
  },
});

export default vocabSlice.reducer;
