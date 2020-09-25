import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'

class Header extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.filterUpdate = this.filterUpdate.bind(this)
  }


  filterUpdate(e) {
    this.props.filterUpdate(e)
  }


  render() {
    const filter = this.props.filter;
    const filterUpdate = this.props.filterUpdate;
    return (
      <div>
        <>

          <Navbar bg="primary" variant="dark" className="justify-content-center">
            <Navbar.Brand > Shopping List  </Navbar.Brand>
          </Navbar>

        </>
      </div>
    )
  }
}
export default Header