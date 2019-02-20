import React from 'react';
import './styles/Navbar.css';
import '../Images/proodle.png';
import history from '../helper_functions/history';

const resetCookies = () => {
    document.cookie = "jwt-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    history.push('/')
}

const redirectUser = () => {
    history.push('/')
}

const Navbar = (props) => {
    return (
        <div className='navbar'>
            <div onClick={redirectUser}>
                <img src="//proodlesolutions.com/wp-content/uploads/2018/06/sticky_header_logo.png" alt="Proodle Solutions Limited"/>
            </div>
            {
                props.cookies ?
                    <button className='btn btn-info' onClick={resetCookies}>(Reset Cookies)</button>
                :
                    false
            }
        </div>
    )
}

export default Navbar;