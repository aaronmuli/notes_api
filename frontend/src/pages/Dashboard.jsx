import { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { addNote, getAllNotes, reset } from '../features/notes/notesSlice';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

const Dashboard = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const {notes, isLoading, isError, isSuccess, message} = useSelector((state) => state.notes)

  
  const [noteData, setNoteData] = useState('');

  
  useEffect(() => {
    if(isError) {
      toast.error(message);
    }
      
    if(!user) {
      navigate('/login');
    }


    dispatch(getAllNotes());

    return () => {
      dispatch(reset());
    }
  }, [user, navigate, dispatch, isError, message]);


  const onChangeHandler = (e) => {
    setNoteData(e.target.value);
    // console.log(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const note = {
      note: noteData,
    }

    dispatch(addNote(note));
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
        <form className='note-form' onSubmit={submitHandler}>
          <textarea id='note' name='note' rows={4} cols={50} placeholder='type a note ...' onChange={onChangeHandler} required/>
          <button type='submit'>add note</button>
        </form>
      </div>
      <section className='notes-view'>
        <div className='grid-container'>
          {
            notes.length > 0 ? (
              notes.map((note) => (
                <div className='grid-item' key={note._id}>
                  <p className='note-paragraph'>{note.text}</p>
                  <p className='note-createdAt'>{note.createdAt}</p>
                </div>
              ))
            ) : (
              <p>You do not have notes yet.</p>
            )
          }
        </div>
      </section>
    </div>
  )
}

export default Dashboard