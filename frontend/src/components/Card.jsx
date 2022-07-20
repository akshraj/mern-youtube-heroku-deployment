import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { format } from 'timeago.js';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

const Container = styled.div`
  width: ${(props) => props.type !== "sm" && "360px"};
  margin-bottom: ${(props) => (props.type === "sm" ? "10px" : "45px")};
  cursor: pointer;
  display: ${(props) => props.type === "sm" && "flex"};
  gap: 10px;
`;

const Image = styled.img`
  width: 100%;
  height: ${(props) => (props.type === "sm" ? "120px" : "202px")};
  background-color: #999;
  flex: 1;
  object-fit:cover;
`;

const Details = styled.div`
  display: flex;
  margin-top: ${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
  flex: 1;
`;

const VideoThumbnailContainer = styled.div`
  position:relative;
  overflow:hidden;
`

const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
  display: ${(props) => props.type === "sm" && "none"};
`;

const Texts = styled.div``;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.h2`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
  margin: 9px 0px;
`;

const Info = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.textSoft};
`;

const BackDrop = styled.div`
  position:absolute;
  background-color: rgba(0,0,0,0.6);
  z-index:2;
  inset:0;
  opacity:0;
  display:flex;
  align-items:center;
  justify-content: center;
  transition:all 0.5s ease;


  &:hover{
    opacity:1
  }
`

const Card = ({ type, imgUrl, title, views, createdAt, userId, _id }) => {
  const [channel, setChannel] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const res = await axios.get(`/api/users/find/${userId}`);
        setChannel(res.data);
      } catch (err) {
        setError(err);
      }
    }
    fetchChannel();
  }, [userId])

  return (
    <Link to={`/video/${_id}`} style={{ textDecoration: "none" }}>
      <Container type={type}>
        <VideoThumbnailContainer>
          <BackDrop>
            <PlayCircleIcon htmlColor="rgba(255,255,255,0.6)" style={{ transform: 'scale(2.5)' }} />
          </BackDrop>
          <Image
            type={type}
            src={imgUrl}
          />
        </VideoThumbnailContainer>
        <Details type={type}>
          <ChannelImage
            type={type}
            src={channel?.img ? channel.img : 'https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg'}
          />
          <Texts>
            <Title>{title}</Title>
            <ChannelName>{channel?.username}</ChannelName>
            <Info>{views} views •  {format(createdAt)}</Info>
          </Texts>
        </Details>
      </Container>
    </Link>
  );
};

export default Card;
