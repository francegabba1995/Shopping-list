import React from 'react'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Filter from './filter'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.props = props

  }

  render() {

    let filteredItems = []



    for (let item of this.props.items) {
      if (this.props.filter === '') {
        filteredItems.push(<Item item={item} onEdit={this.props.onEdit} onEditQuantity={this.props.onEditQuantity} onDelete={this.props.onDelete} showModal={this.props.showModal} />)
      }
      else {
        if (item.name.indexOf(this.props.filter) >= 0) {
          filteredItems.push(<Item item={item} onEdit={this.props.onEdit} onEditQuantity={this.props.onEditQuantity} onDelete={this.props.onDelete} showModal={this.props.showModal} />)
        }
      }
    }


    return (

      <div>

        <table class="table">
          {filteredItems}

          <thead>
            <Filter filter={this.props.filter} filterUpdate={this.props.filterUpdate} />
            <tr>
              <th scope="col">Items</th>
              <th scope="col">Quantity</th>

              <th colspan="2"> </th>

            </tr>
          </thead>



        </table>


      </div>

    )
  }
}


export default List


class Item extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: false }
    this.props = props
    this.myOnChange = this.myOnChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.myOnChangeQuantity = this.myOnChangeQuantity.bind(this)
    this.showModal = this.showModal.bind(this)
  }




  showModal() {
    this.setState(state => ({
      show: !state.show
    }));
  }


  myOnChange(e) {
    this.props.onEdit(this.props.item.id, e.target.value)
  }


  myOnChangeQuantity(e) {
    this.props.onEditQuantity(this.props.item.id, Number(e.target.value))
  }




  handleDelete() {
    this.props.onDelete(this.props.item.id)
    fetch("http://localhost:8080/item/" + Number(this.props.item.id), {
      method: "Delete",
      headers: {}
    })

      .then(response => {
        console.log(response);
        console.log(this.props.item.id)
      })
      .catch(err => {
        console.error(err);
      });
  }




  handleEdit() {

    this.setState(state => ({
      show: !state.show
    }));

    const item = {
      name: this.props.item.name,
      quantity: Number(this.props.item.quantity)
    };


    fetch("http://localhost:8080/item/" + Number(this.props.item.id), {
      method: "PUT",
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



  render() {
    const name = this.props.item.name
    const quantity = this.props.item.quantity
    return (

      <tbody>
        <tr>
          <td>{name}</td>
          <td>{quantity}</td>

          <td> <a href="#" class="text-primary link" onClick={this.showModal} > Edit </a> </td>
          <td><a href="#" class="text-primary link" onClick={this.handleDelete} >Delete</a></td>
        </tr>

        <Modal show={this.state.show}>
          <Modal.Header >
            <Modal.Title > <h4> Insert new quantity or/and new Item </h4> </Modal.Title>
          </Modal.Header>
          <Modal.Body>

            <InputGroup>
              <FormControl className="mr-sm-2"
                value={name}
                input='text'
                placeholder="Add item..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={this.myOnChange}

              />

              <FormControl
                value={quantity}
                type='number'
                placeholder="Add quantity..."
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
                onChange={this.myOnChangeQuantity}
              />
            </InputGroup>
          </Modal.Body>
          <Modal.Footer> <Button variant="primary" onClick={this.handleEdit}>Modify </Button> </Modal.Footer>
        </Modal>
      </tbody>

    )
  }
}

