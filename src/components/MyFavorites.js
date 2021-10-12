import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import { Col, Button, Row, Card } from 'react-bootstrap';
import EditModal from './EditModal'
class MyFavorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      progFav: [],
      show: false,
      updateOne: {}
    }
  }

  componentDidMount() {
    let email = this.props.user.email
    axios.get(`${process.env.REACT_APP_SERVER}getfav?email=${email}`).then(result => {
      this.setState({
        progFav: result.data
      })
    })
  }
  deleting = (item) => {
    let title = item.title
    let email = this.props.user.email
    console.log("s", item.title);
    axios.delete(`${process.env.REACT_APP_SERVER}deletefav?email=${email}&title=${title}`).then(result => {
      this.setState({
        progFav: result.data
      })
    })

  }

  updating = (item) => {
    this.setState({
      show: true,
      updateOne: item
    })
  }

  saving = (e) => {
    e.preventDefault()
    let body = {
      title1:this.state.updateOne.title,
      title: e.target.title.value,
      imageUrl: e.target.imageUrl.value,
      email: this.props.user.email
    }
    axios.put(`${process.env.REACT_APP_SERVER}updatefav`, body).then(result => {
      this.setState({
        progFav: result.data,
        show: false
      })
    })
  }

  render() {
    return (
      <div>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>
        {this.state.progFav.length > 0 ? <Row md={3}>
          {this.state.progFav.map((elem, idx) => {
            return (
              <Col key={idx}>
                <Card style={{ width: '18rem' }}>
                  <Card.Img variant="top" src={elem.imageUrl} />
                  <Card.Body>
                    <Card.Title>{elem.title}</Card.Title>
                    <Card.Text>
                      {elem.description}
                    </Card.Text>
                    <Button onClick={() => { this.deleting(elem) }} variant="primary">delete</Button>
                    <Button onClick={() => { this.updating(elem) }} variant="primary">update</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row> : <h1>Your list is empty</h1>}
        <EditModal
          show={this.state.show}
          updateOne={this.state.updateOne}
          saving={this.saving}

        />
      </div>
    )
  }

}

export default withAuth0(MyFavorites);

