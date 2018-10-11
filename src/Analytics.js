import React, { Component } from 'react'
import ReactGA from 'react-ga';

class Analytics extends Component{
    constructor(props){
        super(props);
        ReactGA.initialize('UA-127318307-1', {
            debug: true,
            titleCase: false,
          }, ReactGA.pageview('/'));

        this.send = this.send.bind(this)
        this.GA = this.GA.bind(this)
    }
    
    GA(method, obj){
        return ReactGA.ga(method, obj);
    } 

    send(act, obj){
        return ReactGA.send(act, obj);
    }
}

export default Analytics