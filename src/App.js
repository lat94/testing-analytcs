import React, { Component } from 'react'
import './App.css'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
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
      username: ''
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    let url = 'http://localhost:3003/lucah';
    
    axios.get(url)
      .then(response => {
        this.setState({username: response.data[0].name})
      }, error => {

      })
  }

  /*createPerson(){
    axios.post('http://172.16.1.190:3000/lucah', {      
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: {
        name: "Cleitu Rasta",
        email: "cabecadegelo@atalaio.com",
        born: "24/04/1975"
      }
      
    })
    .then(function (response) {
      console.log(response);
    }, error => {
      console.log(error);

    });    
  }*/
  createPerson(){
    var body = { a: 1 };
    fetch('http://localhost:3003/lucah', { 
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
        <button className='button' onClick={this.handleClick}>Click Me</button>
        <p>{this.state.username}</p>
        <button className='buttonPerson' onClick={this.createPerson}>Create</button>
        <p>{this.state.person}</p>
        <Button variant="contained" color="primary">
          Primary
        </Button>
      </div>
    )
  }
}
export default App