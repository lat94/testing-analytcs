import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import fetch from 'node-fetch'
import Analytics from './Analytics'

class App extends Component {
  constructor () {
    super()
    this.state = {
      listCustomers:[]
    }

    this.handleClick = this.getCustomers.bind(this)
    this.mountList = this.mountList.bind(this)

  }

  async mountList() {
    let persons = await this.getCustomers();
    console.log("mountList");    
    console.log(persons);
    let listCustomers = persons;

    this.setState({listCustomers});
    
  }

  getCustomers () {
    let url = 'https://test-analytics-api.saas-solinftec.com/customers/list';
    
    return axios.get(url)
      .then(response => {
        //this.setState({username: response.data[0].name})
        console.log("handle click");
        
        console.log(response.data);        
        return response.data;
      }, error => {
        console.log(error);       
      })
  }
  
  createPerson(){
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let born = document.getElementById("born").value;
    var body = {name,
                email,
                born};
    
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("born").value = "";
    document.getElementById("name").focus(); 

    let analytics = new Analytics();
                 
    fetch('https://test-analytics-api.saas-solinftec.com/customers/create', { 
        method: 'POST',
        body:    JSON.stringify(body),
        headers: {
           'Content-Type': 'application/json' 
        },
    })
    .then(res => res.json())
    .then(json => console.log(json));       
  
    /*analytics.send('post', body);
    analytics.GA('create',body);*/

    /*analytics.GA('send', {
      'hitType': 'event', 'eventCategory': 'Event2', 'eventAction': 'Action2', 'eventLabel': born }
    );*/
    analytics.GA((tracker) => {

      // Grabs a reference to the default sendHitTask function.
      var originalSendHitTask = tracker.get('sendHitTask');
    
      // Updates sendHitTask to obfuscate personally identifiable information (PII).
      tracker.set('sendHitTask', function(model) {
    
        var hitPayload = model.get('hitPayload')
            .replace(/%PII%/g, 'XXXXX');
    
        // Updates the hitPayload string for the current hit.
        model.set('hitPayload', body, true);
    
        originalSendHitTask(model);
      });
    });

   



ga('send', 'pageview');
    
   
  }
  
  render () {
    return (
      <div className='button-container'>
        <h1>Client - React JS</h1>
        <p>Nome</p><input id="name"></input>
        <p>Email</p><input id="email"></input>
        <p>Data de Nascimento</p><input id="born"></input>
        <p></p><button className='buttonPerson' onClick={this.createPerson}>Create</button>
        <p></p><button className='button' onClick={this.mountList}>Get</button>
        { this.state.listCustomers.map(customers => <p>{customers.name} {customers.email} {customers.born}</p>)}
        <p>{this.state.person}</p>
      </div>
    )
  }
}

export default App
  

