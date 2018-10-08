import React, { Component } from 'react'
import './App.css'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios'
import fetch from 'node-fetch';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

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
    let url = 'http://172.16.0.51:3010/customers/list';
    
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
    var body = { name: document.getElementById("name").value,
                 email: document.getElementById("email").value,
                 born: document.getElementById("born").value };
    
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("born").value = "";
    document.getElementById("name").focus(); 
    
                 
    fetch('http://172.16.0.51:3010/customers/create', { 
        method: 'POST',
        body:    JSON.stringify(body),
        headers: {
           'Content-Type': 'application/json' 
        },
    })
    .then(res => res.json())
    .then(json => console.log(json));       

  }




  render () {
    return (
      <div className='button-container'>
        <button className='button' onClick={this.mountList}>Get</button>
        { this.state.listCustomers.map(customers => <p>{customers.name} {customers.email} {customers.born}</p>)}
        <p></p>
        <input id="name"></input>
        <input id="email"></input>
        <input id="born"></input>
        <p></p>
        <button className='buttonPerson' onClick={this.createPerson}>Create</button>
        <p></p>
        

        <p>{this.state.person}</p>
        <Button variant="contained" color="primary">
          Primary
        </Button>
      </div>
    )
  }
}
export default App
  

