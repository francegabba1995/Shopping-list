import React from 'react';
import Container from 'react-bootstrap/Container'
import Header from './components/header'
import List from './components/list'
import Submit from './components/submit'
import './stile.css'

let counter = 1


class Item {
  constructor(name, quantity = 0) {
    this.id = counter++
    this.name = name
    this.quantity = quantity
  }
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { filter: '', items: [] }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.filterUpdate = this.filterUpdate.bind(this)
  }


  filterUpdate(e) {
    this.setState({ filter: e.target.value })
  }





  handleSubmit(name, quantity) {
    let items = [...this.state.items]
    for (let item of items) {
      if (name === item.name) {
        item.quantity = Number(item.quantity) + Number(quantity)
        this.setState({ items: [...this.state.items] })
        return
      }
    }
    this.setState({ items: [...this.state.items, new Item(name, quantity)] })
  }

  handleChange(id, newName) {
    let items = [...this.state.items];
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.id === id) {
        item.name = newName;
        break;
      }
    }
    this.setState({ items: items })
  }

  handleChangeQuantity(id, newQuantity) {
    let items = [...this.state.items];
    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.id === id) {
        item.quantity = newQuantity;
        break;
      }
    }
    this.setState({ items: items })
  }

  handleDelete(index) {
    let newArray = this.state.items.filter(item => item.id != index)
    this.setState({ items: newArray })
  }






  render() {
    return (
      <div className="App">
        <Header numItems={this.state.items.length} />
        <Container>
          <br></br>
          <Submit onFormSubmit={this.handleSubmit} />
          <br></br>
          <br></br>
          <List items={this.state.items} filter={this.state.filter} filterUpdate={this.filterUpdate} onEdit={this.handleChange} onEditQuantity={this.handleChangeQuantity} onDelete={this.handleDelete} filter={this.state.filter} filterUpdate={this.filterUpdate} />
          <br></br>
        </Container>
      </div>
    );
  }
}


export default App;
