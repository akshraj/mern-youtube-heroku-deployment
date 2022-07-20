import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../components/Card';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap:10px;
`

const NoVideoText = styled.h1`
  color:#fff;
`

export default function Search() {
  const [videos, setVideos] = useState([]);
  const query = useLocation().search;

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/api/videos/search${query}`);
      setVideos(res.data);
    }
    fetchVideos();
  }, [query]);

  return (
    <Container>
      {videos?.length > 0 ? videos?.map(video => <Card key={video._id} {...video} />) : <NoVideoText>No video found</NoVideoText>}
    </Container>
  )
}
