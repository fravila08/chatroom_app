import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";

function ChatBox({ user }) {
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");

  const handleMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, { user: user, body: body }]);
  };

  return (
    <Container fluid="md">
      <Row>
        <ListGroup as="ol" numbered>
          {messages.map((message) => (
            <ListGroup.Item
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div className="fw-bold">{message.user}</div>
                {message.body}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
      <Row>
        <Form onSubmit={(e) => handleMessage(e)}>
          <Col>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control
                value={body}
                onChange={(e) => setBody(e.target.value)}
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Col>
          <Col>
            <Button type="submit">Send</Button>
          </Col>
        </Form>
      </Row>
    </Container>
  );
}

export default ChatBox;
