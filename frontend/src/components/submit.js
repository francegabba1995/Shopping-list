import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import Col from 'react-bootstrap/Col'





class Submit extends React.Component {
  constructor(props) {
    super(props)
    this.state = { term: '' }
    this.state = { result: '' }
    this.state = { quantity: 0 }
    this.props = props
    this.handleSubmit = this.handleSubmit.bind(this)
    this.myOnChange = this.myOnChange.bind(this)
  }



  handleSubmit(e) {
    e.preventDefault();
    if (this.state.quantity === 0 || this.state.quantity === undefined  || this.state.term === undefined )  {
      return
    }
   
      this.props.onFormSubmit(this.state.term, this.state.quantity);
    

    const item = {
      quantity: Number(this.state.quantity),
      name: this.state.term
    };

    fetch('http://localhost:8080/item', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    })
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.error(err);
      });
  }


  myOnChange(e) {
    this.setState({ term: e.target.value })
  }

  render() {
    return (
      <div>
        <InputGroup className="mb-3" >
         
       <FormControl  className="mr-sm-2" 
          
            value={this.state.term}
            placeholder="add to list..."
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={this.myOnChange}
          
          />
          
         
          <Dropdown onSelect={(eventKey, _) => { this.setState({ quantity: eventKey }) }}>
            <Dropdown.Toggle variant="primary" id="dropdown-basic"  className="mr-sm-2" >
              quantity: {this.state.quantity}
            </Dropdown.Toggle>
            <Dropdown.Menu  >
              <Dropdown.Item key="1" eventKey="1" >1</Dropdown.Item>
              <Dropdown.Item key="2" eventKey="2" >2</Dropdown.Item>
              <Dropdown.Item key="3" eventKey="3" >3</Dropdown.Item>
              <Dropdown.Item key="4" eventKey="4" >4</Dropdown.Item>
              <Dropdown.Item key="5" eventKey="5" >5</Dropdown.Item>
              <Dropdown.Item key="6" eventKey="6" >6</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          
         
          <InputGroup.Append>
            <Button variant="primary" onClick={this.handleSubmit}>Add</Button>
          </InputGroup.Append>
          
        </InputGroup>
      </div>
    )
  }
}

export default Submit