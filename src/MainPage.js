import React, { Component } from "react";
import {Link} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.LinkElement.click();
    }

    render(){
        return (
            <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                    <h1>React Main Page</h1>
                    <Link  to={{
                        pathname: '/Canvas',
                        state: {
                            data: 'Data from Main Page' 
                        }}}
                        ref={Link => this.LinkElement = Link}>
                    </Link>
                    <p className ="App-link"
                        rel="noopener noreferrer"
                        onClick={this.handleClick}>
                    Go to canvas
                </p>
            </header>
            </div>
        );
    }
}

export default MainPage;
