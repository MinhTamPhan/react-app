import React, { Component } from 'react';


function Bird(props) {
  var style = {
    position: 'absolute',
    top: props.bird.top,
    left: props.bird.left,
    width: props.bird.width,
    height: props.bird.height,
    border: '3px solid black',
    backgroundColor: 'red'
  }
  return (
    <div style = {style}/>
  )
}

function Gird(props) {
  var style = {
    width: props.gird.widthGird,
    height:props.gird.heightGird,
    backgroundColor: 'navy'
  }
  return (
    <div style = {style}>
      <Bird bird = {props.bird}/>
    </div>
  )
}
class Game extends React.Component {
  constructor (props) {
    super(props);

  
      var gird = {
        widthGird: 800,
        heightGird: 660,
      }
      var bird = {
        top: 250,
        left: 20,
        width: 40,
        height: 40,
      }
    
    
    this.state = {gird:gird , bird:bird}
  }
 
  render() {
    return (
      <Gird gird = {this.state.gird} bird = {this.state.bird}>
      </Gird>
    )
  }
}
export default Game;
