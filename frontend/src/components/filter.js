import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

class Filter extends React.Component {
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
      <InputGroup className="mb-3" >

        <FormControl className="mr-sm-2"

          value={filter}
          placeholder="Search..."
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={filterUpdate}

        />
      </InputGroup>
    )
  }
}

export default Filter