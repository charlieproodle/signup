import React, { Component } from 'react';
import {connect} from "react-redux";
import styles from "./styles.module.scss";
import Card from "react-bootstrap/Card";

class WelcomeScreen extends Component {
    state = {  }
    render() {
        return (
            <div className={styles.container}>
                <Card>
                    <Card.Body>This is a simple boilerplate to get you up an running!</Card.Body>
                </Card>
            </div>
        );
    }
}



export default connect(null)(WelcomeScreen);