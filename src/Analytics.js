import React, { Component } from 'react'
import ReactGA from 'react-ga';

class Analytics extends Component{
    constructor(props){
        super(props);
        ReactGA.initialize('UA-000000-01', {
            debug: true,
            titleCase: false,
            gaOptions: {
              userId: 123
            }
          }, ReactGA.pageview('/'));

        this._send = this.send.bind(this)
        this._GA = this.GA.bind(this)
    }
    
    GA(method, obj){
        return ReactGA.ga(method, obj);
    } 

    send(act, obj){
        ReactGA.send(act, obj);
    }
}

export default Analytics