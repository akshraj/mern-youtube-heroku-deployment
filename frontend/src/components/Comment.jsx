import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { format } from 'timeago.js'

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: ${({ theme }) => theme.text}
`;
const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const Date = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ _id, userId, videoId, desc, createdAt }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`/api/users/${userId}`);
        setChannel(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchComments();
  }, [userId]);

  return (
    <Container>
      <Avatar src={channel?.img} />
      <Details>
        <Name>
          {channel?.username} <Date>{format(createdAt)}</Date>
        </Name>
        <Text>
          {desc}
        </Text>
      </Details>
    </Container>
  );
};

export default Comment;
