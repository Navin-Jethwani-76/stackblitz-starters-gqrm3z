import * as React from 'react';
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
const serverUrl = 'http://localhost:3001';
function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user_data = {
      user_name: name,
      user_email: email,
      user_message_subject: subject,
      user_message: message,
    };
    // Handle form submission logic here
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user_data),
    };
    async function sendMessage() {
      try {
        const response = await fetch(
          `${serverUrl}/send-message`,
          requestOptions
        );
        const data = await response.json();
        // console.log(data);
        if (data.message) {
          alert(data.message);
        } else if (data.error) {
          alert(data.error);
        }
      } catch (error) {
        console.error('Error sending the message:', error);
      }
    }
    sendMessage();
    // Reset form fields
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="container form">
      <div className="row">
        <div className="col-md-9">
          <p
            style={{
              textDecoration: 'none',
              fontSize: 'x-large',
              fontWeight: '400',
            }}
          >
            Contact Us
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                value={subject}
                required
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="message">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="Type your message here"
                value={message}
                required
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
