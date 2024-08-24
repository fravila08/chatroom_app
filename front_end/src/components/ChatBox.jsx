import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useRef, useState } from "react";

function ChatBox({ user }) {
  const [messages, setMessages] = useState([]);
  const [body, setBody] = useState("");
  const socketRef = useRef(null); // Declare the socket variable outside the useEffect and functions

  useEffect(() => {
    // Initialize the WebSocket connection
    socketRef.current = new WebSocket("ws://127.0.0.1:8000/ws/chat/main/");

    // Handle incoming messages
    socketRef.current.onmessage = (e) => {
      const newMessage = JSON.parse(e.data);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const sendMessage = () => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(
        JSON.stringify({ message: body, user: user })
      );
      setBody("");
    } else {
      console.error("WebSocket is not open.");
    }
  };

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  const handleMessage = (e) => {
    e.preventDefault();
    sendMessage();
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
                {message.message}
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
