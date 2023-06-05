import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { addNote, getAllNotes, deleteNote, updateNote, reset } from '../features/notes/notesSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {notes, isLoading, isError, message} = useSelector((state) => state.notes)

  
  const [noteData, setNoteData] = useState('');
  const [updateNoteData, setUpdateNoteData] = useState({
    text: '',
    id: ''
  });

  
  useEffect(() => {
    if(isError) {
      toast.error(message);
    }
      
    if(!user) {
      navigate('/login');
    }
    
    if(!isError && user) {
      dispatch(getAllNotes());

      return () => {
        dispatch(reset());
      }
    }

  }, [user, navigate, dispatch, isError, message]);


  const onChangeHandler = (e) => {
    setNoteData(e.target.value);
  }

  const onChangeUpdateHandler = (e) => {
    setUpdateNoteData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }


  const submitHandler = (e) => {
    e.preventDefault();

    const note = {
      note: noteData,
    }

    dispatch(addNote(note));
    setNoteData('');
  }
  
  const submitUpdateHandler = (e) => {
    e.preventDefault();
    
    dispatch(updateNote(updateNoteData));
    // dispatch(getAllNotes());
    setUpdateNoteData({
      text: '',
      id: ''
    });
  }


  if(isLoading) {
    return <Spinner />
  }

  return (
    <div className='dashboard'>
      <div className='greeting'>
        <h1>Welcome {user ? user.name : "User"}.</h1>
        <p>Start managing your notes by adding, updating or deleting notes with ease.</p>
      </div>
      <div className='note-container'>
        {
          updateNoteData.text ? (
            <form className='note-form' onSubmit={submitUpdateHandler}>
              <textarea id='note' name='text' value={updateNoteData.text} rows={4} cols={50} placeholder='type a note ...' onChange={onChangeUpdateHandler} required/>
              <button type='submit'>update note</button>
            </form>
          ) : (
            <form className='note-form' onSubmit={submitHandler}>
              <textarea id='note' name='note' value={noteData} rows={4} cols={50} placeholder='type a note ...' onChange={onChangeHandler} required/>
              <button type='submit'>add note</button>
            </form>
          )
        }
            {/* <form className='note-form' onSubmit={submitHandler}>
              <textarea id='note' name='note' value={noteData} rows={4} cols={50} placeholder='type a note ...' onChange={onChangeHandler} required/>
              <button type='submit'>add note</button>
            </form> */}
      </div>
      <section className='notes-view'>
        <div className='grid-container'>
          {
            notes.length > 0 ? (
              notes.map((note) => (
                  <div className='grid-item' key={note._id} onClick={() => setUpdateNoteData({text : note.text, id: note._id})}>
                    <p className='close-btn' onClick={() => dispatch(deleteNote(note._id))}>X</p>
                    <p className='note-paragraph'>{note.text}</p>
                    <p className='note-createdAt'>{new Date(note.createdAt).toLocaleString('en-US')}</p>
                  </div>
              ))
              ) : (
                <p className='notes-notify'>You do not have notes yet.</p>
                )
              }
          </div>
      </section>
    </div>
  )
}

export default Dashboard