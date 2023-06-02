import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {reset, register} from '../features/auth/authSlice';


const Register = () => {
  
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  
  const {name, email, password, password2} = credentials;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user, isLoading, isError, isSuccess, message} = useSelector(
    (state) => state.auth);

  useEffect(() => {
    if(isError) {
      toast.error(message);
    };

    if(isSuccess || user) {
      navigate('/');
    }

    dispatch(reset);

  },[isError, isSuccess, user, message, dispatch, navigate]);

  const changeHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name] : e.target.value 
    }));
  }


  const submitHandler = (e) => {
    e.preventDefault();

    if(password !== password2) {
      toast.error('Passwords do not match!');
    }else {
      const userData = {
        name,
        email,
        password
      };

      dispatch(register(userData));
  }
}

  if(isLoading) {
    // show a spinner
  }

  return (
    <>
        <section className="register_section">
            <div className="heading">
                <p className="heading_main">Register</p>
                <p className="heading_p">Please register to start writing notes.</p>
            </div>
            <form className="form_section" onSubmit={submitHandler}>
                <input type="text" name="name" id="name" value={name} placeholder="Name" onChange={changeHandler} required/>
                <input type="email" name="email" id="email" value={email} placeholder="Email" onChange={changeHandler} required/>
                <input type="password" name="password" id="password" value={password} placeholder="Password" onChange={changeHandler} required/>
                <input type="password" name="password2" id="password2" value={password2} placeholder="Confirm Password" onChange={changeHandler} required/>
                <button type='submit'>submit</button>
            </form>
        </section>
    </>
  )
}

export default Register