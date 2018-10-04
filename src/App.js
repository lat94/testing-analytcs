import React, { Component } from 'react'
import './App.css'

import axios from 'axios'

class App extends Component {
  constructor () {
    super()
    this.state = {
      username: ''
    }

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    axios.get('https://api.github.com/users/lat94')
      .then(response => this.setState({username: response.data.name}))
  }

  createPerson(){
    axios.post('/person/create', {
      name: 'Cleitu Rasta',
      city: 'Atalaió',
      dateOfBirth: new Date()
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render () {
    return (
      <div className='button__container'>
        <button className='button' onClick={this.handleClick}>Click Me</button>
        <p>{this.state.username}</p>
        <button className='buttonPerson' onClick={this.createPerson}>Create</button>
        <p>{this.state.person}</p>
      </div>
    )
  }
}
export default App