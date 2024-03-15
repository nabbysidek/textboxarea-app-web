import { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card } from 'react-bootstrap';
import { FaRegPaperPlane, FaEllipsisH } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import axios from 'axios';

function App() {

  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const result = await axios.get('http://localhost:8000/api/posts');
    setPosts(result.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:8000/api/posts', { post });
    setPost('');
    fetchPosts();
  };

  return (
    <>
      <Container>
        <div className="instructions-container">
          <Card>
            <Card.Body>
              To italicize, use <span className="alert-icons">*</span> at the
              front and the back of the text you want to italicize. To bold, use{" "}
              <span className="alert-icons">**</span> at the front and the back
              of the text. To bold and italicize, use{" "}
              <span className="alert-icons">***</span> at the front and the back
              of the text. To strikethrough, use{" "}
              <span className="alert-icons">~~</span> at the front and the back
              of the text.
            </Card.Body>
          </Card>
        </div>
        <div className="input-field-container">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={10}>
                <Form.Control
                  as="textarea"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                ></Form.Control>
                <Form.Text className="text-muted input-clue">
                  Click the{" "}
                  <span>
                    <FaRegPaperPlane />
                  </span>{" "}
                  or hit the <span>Enter</span> key.
                </Form.Text>
              </Col>
              <Col className="remove-padding" xs={2}>
                <Button type="submit" className='submit-btn '>
                  <FaRegPaperPlane />
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="post-container">
          {posts.map((posts) => (
            <Card className="post-item" key={posts.id}>
              <Button className='post-button-holder'><FaEllipsisH /></Button>
              <p>{posts.post}</p>
          </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

export default App
