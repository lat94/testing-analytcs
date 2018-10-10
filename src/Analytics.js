import React, { Component } from 'react'
import ReactGA from 'react-ga';

class Analytics extends Component{
    constructor(props){
        super(props);
        ReactGA.initialize('AIzaSyBo4MYb4JzC8xFLnA-0zywBWp5kOzpgCs0', {
            debug: true,
            titleCase: false,
            gaOptions: {
              userId: 123
            }
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