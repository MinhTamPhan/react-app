import React, { Component } from 'react';
import './App.css';

function Cell(props){
  var style = {
    width: 20,
    height: 20,
    backgroundColor: props.cell,
    border: '1px solid black'
  }
  return <div style = {style}/>;
}

function Row(props) {
  var style = {
    display: 'flex'
  }
  return (
    <div style = {style}>
      {
        props.row.map( (cell, index)=>{
          return <Cell cell = {cell} key={index}/>
        })
      }
    </div>
  )
}

function Gird(props) {
  return (
    <div>
      {
        props.gird.map( (row, index) => {
          return <Row row = {row} key={index}/>
        })
      }   
    </div>
  )
}

class Game extends Component {
  constructor(props) {
    super(props);
    var gird = [];
    for (let i = 0; i < 30; i++) {
      gird.push(new Array(60).fill('#8b9dc3'));
    }
    var bird = {
      height: 10,
      position: 2
    }
    var towers = [
      {position: 5,height: 10,upright: false},
      {position: 9,height: 9,upright: true},
      {position: 14,height: 8,upright: false},
      {position: 19,height: 12,upright: true},
      {position: 23,height: 10,upright: false},
      {position: 27,height: 11,upright: true},

      {position: 33,height: 12,upright: false},
      {position: 38,height: 9,upright: true},
      {position: 41,height: 7,upright: false},
      {position: 45,height: 10,upright: true},
      {position: 50,height: 12,upright: false},
      {position: 55,height: 11,upright: true},
    ];
    gird[bird.height][bird.position] = 'red';
    this.state = {gird:gird, bird:bird, towers:towers, crashed:false, score: 0}

    this.timerID = setInterval( ()=> {
      if (this.state.crashed){
        return;
      }
      var girdCopy = [];
      var towersCopy = this.state.towers.slice();

      for (let i = 0; i < 30; i++) {
        girdCopy.push(new Array(60).fill('#8b9dc3'));
      }

      for (let i = 0; i < towersCopy.length; i++) {
        towersCopy[i].position --;
        if (towersCopy[i].position < 0){
          towersCopy[i].position = 59;
          towersCopy[i].height = Math.floor(Math.random() * 12) + 3;
        }
      }

      for (let i = 0; i < towersCopy.length; i++) {
        for (let j = 0; j < towersCopy[i].height; j++) {
          if(towers[i].upright) {
            girdCopy[29 - j][towersCopy[i].position] = '#ffdb01';  
          }     
          else {
            girdCopy[j][towersCopy[i].position] = '#ffdb01';   
          }
        }
      }
      
      var birdCopy = this.state.bird;
      bird.height ++;
      var crashed = false;
      if(bird.height > 29){
        bird.height = 10;
        crashed = true;
      }

      for (let i = 0; i < 30; i++) {
        if(girdCopy[i][2] === '#ffdb01' && birdCopy.height === i) {
          birdCopy.height = 10 ;
          crashed = true;
        }
      }
      if(crashed) {
        this.setState({crashed:true,score: 0})
      }
      girdCopy[birdCopy.height][birdCopy.position] = 'red';
      this.setState({gird:girdCopy,bird:birdCopy, towers:towersCopy, score: this.state.score + 1});
    }, 200);
  }

  handleClick() {
    if(this.state.crashed) {
      return;
    }
    var birdCopy = this.state.bird;
    birdCopy.height -= 3;
    this.setState({bird:birdCopy});
  }
  restart(){
    this.setState({crashed:false,score: 0})
  }
  render(){
    return (
      <div onClick = {this.handleClick.bind(this)}>
        <Gird gird = {this.state.gird}/>
        {this.state.crashed? <button onClick = {this.restart.bind(this)}>Press restart</button>: this.state.score}
      </div>
    )
  }
}

export default Game;

