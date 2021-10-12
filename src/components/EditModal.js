import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap';
export class EditModal extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Modal show={this.props.show}>
                <Modal.Header>
                    <Modal.Title>Modal title</Modal.Title>
                    <Button style={{float:"right"}} variant="primary">X</Button>
                </Modal.Header>
                <Form onSubmit={this.props.saving} >
                    <Modal.Body>

                        <Form.Label>Edit Title</Form.Label>
                        <Form.Control name="title" type="text" defaultValue={this.props.updateOne.title} />

                        <Form.Label>Edit image</Form.Label>
                        <Form.Control name="imageUrl" type="text" defaultValue={this.props.updateOne.imageUrl} />

                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" variant="primary">Save changes</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

export default EditModal
