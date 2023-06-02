import {Link, useNavigate} from "react-router-dom";
import {reset, logout} from "../features/auth/authSlice";
import {useDispatch, useSelector} from 'react-redux';
import { useEffect } from "react";

const Header = () => {

  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const logoutUser = () => {
    dispatch(logout());  
    dispatch(reset());
    
  }

  return (
    <header>
        <div className="logo">
          <Link to='/'>Notes</Link>
        </div>
        <div>
        {
          user ? 
          (<div className="nav_items">
            <div className="nav_item">
              <Link onClick={logoutUser} className="logout-btn">Logout</Link>
            </div>
          </div>)
          :
            (<div className="nav_items">
            <div className="nav_item">
              <Link to='/login'>Login</Link>
            </div>
            <div className="nav_item">
              <Link to='/register'>Register</Link>
            </div>
          </div>)
        }
        </div>
    </header>
  )
}

export default Header