import React, { Component } from "react";
import Immutable, { set } from 'immutable';
import './DrawArea.css';

class DrawArea extends React.Component {
  constructor() {
    super();

    this.state = {
      lines: new Immutable.List(),
      isDrawing: false,
      styles: [],
      currentStyle: {
        stroke: '#61dafb',
        strokeWidth: '0.2em'    
      },
      toggle: true
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button !== 0 || String(mouseEvent.target.id) !== "draw") {
      return;
    }

    this.state.styles.push(this.state.currentStyle);
    const point = this.relativeCoordinatesForEvent(mouseEvent);

    this.setState(prevState => ({
      lines: prevState.lines.push(new Immutable.List([point])),
      isDrawing: true
    }));
  }

  handleMouseMove(mouseEvent) {
    if (!this.state.isDrawing) {
      return;
    }

    const point = this.relativeCoordinatesForEvent(mouseEvent);
    
    this.setState(prevState =>  ({
      lines: prevState.lines.updateIn([prevState.lines.size - 1], line => line.push(point))
    }));
  }

  handleMouseUp() {
    this.setState({ isDrawing: false });
    //Enviar al microservicio para actualizar el canvas de los otros clientes
    let sentdata = {
        lines: this.state.lines._tail.array[this.state.lines._tail.array.length - 1],
        styles: this.state.styles
    };
    console.log(sentdata);
  }

  relativeCoordinatesForEvent(mouseEvent) {
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    return new Immutable.Map({
        x: mouseEvent.clientX - boundingRect.left,
        y: mouseEvent.clientY - boundingRect.top,
    });
  }

  handleChangeColor() {
    this.setState({
      toggle: !this.state.toggle
    });

    if (this.state.toggle) {
        this.state.currentStyle = {
          stroke: '#B71C1C',
          strokeWidth: '0.4em'
        };
    }else{
        this.state.currentStyle = {
          stroke: '#61dafb',
          strokeWidth: '0.2em' 
        };
    }
  }

  render() {
    return (
        <div
            id = "drawArea"
            className="drawArea"
            ref="drawArea"
            onMouseDown={this.handleMouseDown}
            onMouseMove={this.handleMouseMove}>
            <Drawing props={[this.state.lines, this.state.styles ]}/>
            <div id = "btn_container" className="change_btn_container">
              <div id = "btn" className="change_btn" onClick={this.handleChangeColor}>
                <p>Cambiar color</p>
              </div>
            </div>
        </div>
    );
  }
}

function Drawing({ props }) {
    return (
        <svg className="drawing" id = "draw">
        {props[0].map((line, index) => (
            <DrawingLine key={index} props={[line, props[1][index]]}/>
        ))}
        </svg>
    );
}

function DrawingLine({ props }) {
    const pathData = "M " +
    props[0]
        .map(p => {
        return `${p.get('x')} ${p.get('y')}`;
        })
        .join(" L ");

    return <path className="path" style={props[1]} d={pathData} />;
}

export default DrawArea;