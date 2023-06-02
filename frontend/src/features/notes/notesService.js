import axios, { AxiosHeaders } from "axios";


const API_URL = '/api/notes'

// add note to DB
const addNote = async (noteData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }    

    const response =  await axios.post(API_URL, noteData, config);
    
    return response.data;
}

// get all notes
const getAllNotes = async (token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        
        const response =  await axios.get(API_URL, config);
        
        // console.log(`notes => ${response.data}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const notesService = {
    addNote,
    getAllNotes,
};

export default notesService;