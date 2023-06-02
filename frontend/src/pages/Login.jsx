import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {redirect, useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {reset, login} from '../features/auth/authSlice';
import Spinner from '../components/Spinner'

const Login = () => {

    const [credentials, setCredentials] = useState({
        email: "",
        password: "",
      });
      
      const {email, password} = credentials;

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

      // const redirectUser = () => {
      //     return redirect('/');
      // }
    
      const changeHandler = (e) => {
        setCredentials((prevState) => ({
          ...prevState,
          [e.target.name] : e.target.value 
        }));
      }
    
    
      const submitHandler = (e) => {
        e.preventDefault();
    
        if(!password && !email) {
          toast.error('Please enter credentials');
        }else {
          const userData = {
            email,
            password
          };
    
          dispatch(login(userData));
        }
      }

      if(isLoading) {
        return <Spinner/>
      }

    return (
      <>
          <section className="register_section">
              <div className="heading">
                  <p className="heading_main">Login</p>
                  <p className="heading_p">Please login to access your notes.</p>
              </div>
              <form className="form_section" onSubmit={submitHandler}>
                  <input type="email" name="email" id="email" onChange={changeHandler} placeholder="Email"/>
                  <input type="password" name="password" id="password" onChange={changeHandler} placeholder="Password"/>
                  <button type='submit'>submit</button>
              </form>
          </section>
      </>
    )
  }
  
  export default Login