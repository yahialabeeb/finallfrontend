import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import { Col, Button, Row, Card } from 'react-bootstrap';


class AllDataAPI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prog: []
        }
    }

    componentDidMount() {
        axios.get(`${process.env.REACT_APP_SERVER}getall`).then(result => {
            this.setState({
                prog: result.data
            })
        })
    }
    addingFav = (item) => {
        
        let body = {
            title: item.title,
            imageUrl: item.imageUrl,
            email: this.props.user.email
        }
        
        axios.post(`${process.env.REACT_APP_SERVER}addfav`, body).then(result => {
            console.log(result.data);
        })
    }
    render() {
        return (
            <div>
                <h1>All Data from the API</h1>
                <h3>Select your favorites :)</h3>
                <Row md={3}>
                    {this.state.prog.map((elem, idx) => {
                        return (
                            <Col key={idx}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={elem.imageUrl} />
                                    <Card.Body>
                                        <Card.Title>{elem.title}</Card.Title>
                                        <Button onClick={() => { this.addingFav(elem) }} variant="primary">Add to Fav</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </div>
        )
    }
}

export default withAuth0(AllDataAPI);
