import React, { Component } from "react";
import './Canvas.css';
import DrawArea from "./DrawArea.js";

class Canvas extends Component {

    constructor(props) {
        super(props);
        this.state = {
            test: true,
            sentData: this.props.location.state.data
        };

        console.log(this.state.sentData);
    }

    render(){
        return(
            <div className="Canvas">
                <h1 className="title">Canvas</h1>
                <DrawArea/>
            </div>
        )
    }
}

export default Canvas;