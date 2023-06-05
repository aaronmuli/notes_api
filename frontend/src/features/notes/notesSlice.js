import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import notesService from './notesService'

const initialState = {
    notes: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
};

// add note
export const addNote = createAsyncThunk("notes/add", async (noteData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await notesService.addNote(noteData, token);
    } catch (error) {
        const message = (error.response.data && 
            error.response.data.message && 
            error.response) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// get notes
export const getAllNotes = createAsyncThunk('notes/getAll', async (_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await notesService.getAllNotes(token);
    } catch (error) {
        const message = (error.response.data && 
            error.response.data.message && 
            error.response) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// delete note
export const deleteNote = createAsyncThunk('notes/delete', async (noteID, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await notesService.deleteNote(noteID, token);
    } catch (error) {
        const message = (error.response.data && 
            error.response.data.message && 
            error.response) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// update note
export const updateNote = createAsyncThunk('notes/update', async (noteData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await notesService.updateNote(noteData, token);
    } catch (error) {
        const message = (error.response.data && 
            error.response.data.message && 
            error.response) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false,
            state.isSuccess = false,
            state.isError = false,
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.isError = false,
                state.notes.push(action.payload)
            })
            .addCase(addNote.rejected, (state, action) => {
                state.isLoading = false,
                state.isSuccess = false,
                state.isError = true,
                state.notes = [],
                state.message = action.payload
            })
            .addCase(getAllNotes.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllNotes.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.isError = false,
                state.notes = action.payload
            })
            .addCase(getAllNotes.rejected, (state, action) => {
                state.isLoading = false,
                state.isSuccess = false,
                state.isError = true,
                state.notes = [],
                state.message = action.payload
            })
            .addCase(deleteNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.isError = false,
                state.notes = state.notes.filter((note) => note._id !== action.payload.id)
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.isLoading = false,
                state.isSuccess = false,
                state.isError = true,
                state.notes = [],
                state.message = action.payload
            })
            .addCase(updateNote.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isSuccess = true,
                state.isError = false,
                state.notes = state.notes.filter((note) => note._id !== action.payload._id)
                state.notes.push(action.payload)
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.isLoading = false,
                state.isSuccess = false,
                state.isError = true,
                state.notes = [],
                state.message = action.payload
            })
    }
});

export const {reset} = notesSlice.actions;
export default notesSlice.reducer;