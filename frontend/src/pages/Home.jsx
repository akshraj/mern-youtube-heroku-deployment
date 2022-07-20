import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from 'axios';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`/api/videos/${type}`);
        setVideos(res.data);
      } catch (err) {
        setError(err);
      }
    }
    fetchVideos();
  }, [type])

  return (
    <Container>
      {videos?.length > 0 && videos?.map(video => <Card key={video._id} {...video} />)}
    </Container>
  );
};

export default Home;
