import React, { Component } from 'react'
import QrCodeReader from './QrCodeReader'
  
class Valuechange extends Component {
  constructor(props){
    super(props)
    this.state = {number : 0}
    this.makeTimer()
  }
  
  makeTimer(){
    setInterval(() => {
      let rand = Math.floor(Math.random() * 10) + 1
        this.setState({Number: rand})
    }, 1000)
  }
  render(){
    return (
      <div>value is 
      {this.state.Number}
        <QrCodeReader value={this.state.number}/>
      </div>
    )
  }
}
  
export default Valuechange