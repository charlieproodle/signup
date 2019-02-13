import React, { Component } from 'react';

export default class HomeScreen extends Component {

    resetCookie = () => {
        document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "auth_email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    }

    render(){
        return(
            <div className="flex flex-column justify-center items-center">
                <h1>Home Screen</h1>
                <p>This is the home screen</p>
                <button onClick={this.resetCookie} className="link br2 bg-grey black dim pa3 f6 sans-serif b--light-blue ba">
                    Press to reset cookies <span role="img" aria-label="cookie">🍪</span>
                </button>
            </div>
        )
    }
}
