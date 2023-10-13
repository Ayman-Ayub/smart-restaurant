import React ,{useState}from 'react';
import QRCode from 'react-qr-code';
import "../styles/result.css"

import Html5QrcodePlugin from './Html5QrcodePlugin.jsx'
import ResultContainerPlugin from './ResultContainerPlugin.jsx'

class Scanner extends React.Component {
   
    constructor(props) {
      super(props);
      this.state = {
        decodedResults: []
      }
  
      // This binding is necessary to make `this` work in the callback.
      this.onNewScanResult = this.onNewScanResult.bind(this);
    
       
    
    }
    
    render() {
      return (
        <div className="App bg-primary">
          <section className="App-section ">
           
            <br />
            <br />
            <br />
          
            <Html5QrcodePlugin 
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={this.onNewScanResult}/>
             {/* <ResultContainerPlugin results={this.state.decodedResults} /> */}
           
          </section>
        </div>
      );
    }
  
    onNewScanResult(decodedText, decodedResult) {
      console.log(
        "App [result]", decodedResult,decodedText);
        window.location.replace( decodedText)
      // let decodedResults = this.state.decodedResults;
      // decodedResults.push(decodedResult);
      // this.setState((state, props) => {
      //   state.decodedResults.push(decodedResult);
      //   return state;
      // });
    }
  }
  
  export default Scanner;