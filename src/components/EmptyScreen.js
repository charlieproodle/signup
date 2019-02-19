import React from 'react';
import '../App.css';

const EmptyScreen = (props) => {
    return (
        <div className='App'> 
            <h1>Error: {props.error_msg}</h1>
        </div>
    )
}

export default EmptyScreen