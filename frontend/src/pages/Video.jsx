import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { dislike, like, loadingSingleVideoSuccess } from '../redux/reducers/videosSlice';
import { subscribeUser } from '../redux/reducers/userSlice';
import axios from "axios";
import { format } from "timeago.js";
import Recommendation from "../components/Recommendation";

const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div`
  max-height:720px;
  position:relative;
`;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;

const VideoFrame = styled.video`
  width:100%;
  object-fit:cover;
`

const Video = () => {
  const { user } = useSelector(state => state.user);
  const { currentVideo } = useSelector(state => state.video);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = useLocation().pathname.split('/')[2];

  const [channel, setChannel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videoRes = await axios.get(`/api/videos/find/${path}`);
        dispatch(loadingSingleVideoSuccess(videoRes?.data))
        const channelRes = await axios.get(`/api/users/find/${videoRes?.data.userId}`);
        setChannel(channelRes?.data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    try {
      if (user) {
        await axios.put(`/api/users/like/${currentVideo._id}`);
        dispatch(like(user?._id))
      } else {
        navigate('/signin')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDislike = async () => {
    try {
      if (user) {
        await axios.put(`/api/users/dislike/${currentVideo._id}`);
        dispatch(dislike(user?._id))
      } else {
        navigate('/signin')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubscribe = async () => {
    try {
      if (user) {
        user?.subscribedUsers?.includes(channel?._id) ? await axios.put(`/api/users/unsub/${channel?._id}`) : await axios.put(`/api/users/sub/${channel?._id}`);
        dispatch(subscribeUser(channel?._id));
      } else {
        navigate('/signin')
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo?.videoUrl} controls autoplay={true} />
        </VideoWrapper>
        <Title>{currentVideo?.title}</Title>
        <Details>
          <Info>{currentVideo?.views} views • {format(currentVideo?.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
              {currentVideo?.likes?.includes(user?._id) ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />} {currentVideo?.likes?.length}
            </Button>
            <Button onClick={handleDislike}>
              {currentVideo?.dislikes?.includes(user?._id) ? <ThumbDownIcon /> : <ThumbDownOffAltOutlinedIcon />} Dislike
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel?.img ? channel.img : 'https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg'} />
            <ChannelDetail>
              <ChannelName>{channel?.username}</ChannelName>
              <ChannelCounter>{channel?.subscribers} subscribers</ChannelCounter>
              <Description>
                {currentVideo?.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          {user?._id !== channel?._id && <Subscribe onClick={handleSubscribe}>{user?.subscribedUsers?.includes(channel?._id) ? 'SUBSCRIBED' : 'SUBSCRIBE'}</Subscribe>}
        </Channel>
        <Hr />
        <Comments videoId={currentVideo?._id} />
      </Content>
      <Recommendation tags={currentVideo?.tags} />
    </Container>
  );
};

export default Video;
