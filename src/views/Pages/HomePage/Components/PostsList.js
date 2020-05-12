import React from 'react';
import { Container, Row, Button } from 'reactstrap';
import Post1 from '../assets/imgs/post1.png';
import Post2 from '../assets/imgs/post2.png';
import Post3 from '../assets/imgs/post3.png';
import Post4 from '../assets/imgs/post4.png';
import Post5 from '../assets/imgs/post5.png';
import Post6 from '../assets/imgs/post6.png';
import Post from './Post';
const PostsList = () => {
  return (
    <Container className="my-5">
      <Row>
        <Post image={Post1} />
        <Post image={Post2} />
        <Post image={Post3} />
        <Post image={Post4} />
        <Post image={Post5} />
        <Post image={Post6} />
      </Row>
      <div className="text-center mb-5">
        <Button className="primary__button">View More</Button>
      </div>
      <hr />
    </Container>
  );
};
export default PostsList;
