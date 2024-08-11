import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllFolders = createAsyncThunk(
  "fetchAllFolders",
  async (id) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/quiz/getallfolders`,
      {
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return response.json();
  }
);

export const addFolder = createAsyncThunk("addFolder", async (folderName) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/quiz/createfolder`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
      body: JSON.stringify({ name: folderName }),
    }
  );
  return response.json();
});

export const deleteFolder = createAsyncThunk("deleteFolder", async (id) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/quiz/deletefolder/${id}`,
    {
      method: "DELETE",
      headers: {
        token: localStorage.getItem("token"),
      },
    }
  );
  return response.json();
});

export const updateFolder = createAsyncThunk(
  "updateFolder",
  async (formData) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/quiz/updatefolder/${formData.id}`,
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
  }
);

const initialState = {
  folders: [],
  status: "idle",
  error: null,
};

export const folderSlice = createSlice({
  name: "folder",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllFolders.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchAllFolders.fulfilled, (state, action) => {
      state.status = "success";
      state.folders = action.payload;
    });
    builder.addCase(fetchAllFolders.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(addFolder.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(addFolder.fulfilled, (state, action) => {
      state.status = "success";
      state.folders.push(action.payload);
    });
    builder.addCase(addFolder.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(deleteFolder.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(deleteFolder.fulfilled, (state, action) => {
      state.status = "success";
      state.folders = state.folders.filter(
        (folder) => folder._id !== action.payload._id
      );
    });
    builder.addCase(deleteFolder.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });

    builder.addCase(updateFolder.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(updateFolder.fulfilled, (state, action) => {
      state.status = "success";
      const updatedFolder = action.payload;
      const index = state.folders.findIndex(
        (folder) => folder._id === updatedFolder._id
      );
      if (index !== -1) {
        state.folders[index] = updatedFolder;
      }
    });
    builder.addCase(updateFolder.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export default folderSlice.reducer;
