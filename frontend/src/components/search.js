import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = { id: '' }
    this.state = { quantity: '' }
    this.state = { name: '' }
    this.state = { error: '' }
    this.handleChangeId = this.handleChangeId.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  handleChangeId = e => {
    this.setState({ id: e.target.value })
  }



  handleSearch = event => {
    event.preventDefault();


    fetch("http://localhost:8080/item/" + this.state.id, {
      method: "get",
      headers: { "content-type": "application/json" },
    })
      .then(res => {
        return res.json()
      })

      .then((response) => {
        this.setState({ quantity: 'Quantity: ' + response.quantity })
        this.setState({ name: 'Name: ' + response.name })
        this.setState({ error: '' })

      })
      .catch((error) => {
        this.setState({ error: 'item not found! Insert correct item-id' })
        this.setState({ quantity: '' })
        this.setState({ name: '' })
        console.log(error)
      });

  }




  render() {
    return (
      <div>
        <InputGroup className="mb-3">
          <FormControl
            value={this.state.id}
            placeholder="Filter..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.handleChangeId}
          />
        </InputGroup>
        <p id='quantity'> {this.state.quantity}</p>
        <p id='name'>{this.state.name}</p>
        <p id='error'>{this.state.error}</p>

      </div >
    )
  }
}

export default Search