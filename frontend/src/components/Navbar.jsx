import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Upload from "./Upload";
import axios from "axios";
import { logout } from "../redux/reducers/userSlice";

const User = styled.div`
  display: flex;
  align-items: center;
  gap:10px;
  font-weight: 500;
  color:${({ theme }) => theme.text};
`

const Avatar = styled.img`
  width:32px;
  height:32px;
  border-radius:50%;
  background-color:#999;
`

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
  z-index:999;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;

const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 0px;
  right: 0px;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  flex:1;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const { user } = useSelector(state => state.user);
  const [searchInputText, setSearchInputText] = useState('');
  const dispatch = useDispatch();

  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/logout');
      localStorage.removeItem('persist:root');
      dispatch(logout())
    } catch (err) {
      console.log(err);
    }
  }

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInputText === '') return;
    navigate(`/search?q=${searchInputText}`);
  }

  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input placeholder="Search" onChange={e => setSearchInputText(e.target.value)} />
            <SearchOutlinedIcon onClick={handleSearch} style={{ cursor: 'pointer' }} />
          </Search>
          {!user ? <Link to="signin" style={{ textDecoration: "none" }}>
            <Button>
              <AccountCircleOutlinedIcon />
              SIGN IN
            </Button>
          </Link> : <User>
            <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
            <Avatar src={user?.img ? user.img : 'https://i.pinimg.com/736x/89/90/48/899048ab0cc455154006fdb9676964b3.jpg'} />
            {user?.username}
          </User>}

          {user && <Button style={{ marginLeft: '10px' }} onClick={handleLogOut}>
            SIGN OUT
          </Button>}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
