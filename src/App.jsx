import { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Button, Card, Dropdown } from 'react-bootstrap';
import { FaRegPaperPlane, FaEllipsisH } from "react-icons/fa";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'
import axios from 'axios';

function App() {

  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);
  const [editPostId, setEditPostId] = useState(null);
  const [editedPostContent, setEditedPostContent] = useState('');

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

  const handleEdit = (postId, postContent) => {
    setEditPostId(postId);
    setEditedPostContent(postContent);
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:8000/api/posts/${editPostId}`, { post: editedPostContent });
    setEditPostId(null);
    fetchPosts();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // prevent form submission
      handleSubmit(e);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:8000/api/posts/${postId}`);
      setPosts (posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error:', error);
    }
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
                  onKeyPress={handleKeyPress}
                ></Form.Control>
                <Form.Text className="text-muted input-clue">
                  Click the{" "}
                  <span>
                    <FaRegPaperPlane />
                  </span>{" "}
                  or hit the <span>Enter</span> key. To create a new line, hit
                  Shift + Enter keys.
                </Form.Text>
              </Col>
              <Col className="remove-padding" xs={2}>
                <Button type="submit" className="submit-btn ">
                  <FaRegPaperPlane />
                </Button>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="post-container">
          {posts.map((posts) => (
            <Card className="post-item" key={posts.id}>
              <Dropdown className='custom-dropwdown'>
                <Dropdown.Toggle className="post-button-holder">
                  <FaEllipsisH />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleEdit(posts.id, posts.post)}>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleDelete(posts.id)}>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {editPostId === posts.id ? (
              <Form onSubmit={handleUpdate}>
                <Form.Control
                  as="textarea"
                  value={editedPostContent}
                  onChange={(e) => setEditedPostContent(e.target.value)}
                />
                <Button type="submit" className='save-button'>Update</Button>
              </Form>
            ) : (
              <ReactMarkdown remarkPlugins={[remarkGfm]} className="show-details">
                {posts.post}
              </ReactMarkdown>
            )}
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

export default App
