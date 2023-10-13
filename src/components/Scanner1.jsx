import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'

class Scanner extends Component {
  constructor(props){
    super(props)
    this.state = {
      delay: 100,
      result: 'No result',
    }

    this.handleScan = this.handleScan.bind(this)
  }
  handleScan(data){
    this.setState({
      result: data,
    })
  }
  handleError(err){
    console.error(err)
  }
  render(){
    const previewStyle = {
      height: 240,
      width: 320,
    }

    return(
      <div className='w-full h-screen bg-primary justify-center items-center'>
        <QrReader className='border-2 justify-center items-center  border-orange-500'
          delay={this.state.delay}
          style={previewStyle}
          onError={this.handleError}
          onScan={this.handleScan}
          />
        <p>{this.state.result}</p>

       
      </div>
    )
  }
}
export default Scanner;
