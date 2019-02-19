import React from 'react';
import './styles/Navbar.css';
import '../Images/proodle.png';

const resetCookies = () => {
    document.cookie = "jwt-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.reload();
}

const Navbar = (props) => {
    return (
        <div className='navbar'>
            <img src="//proodlesolutions.com/wp-content/uploads/2018/06/sticky_header_logo.png" alt="Proodle Solutions Limited"/>
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