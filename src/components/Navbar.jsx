import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../redux/userRedux";

const Container = styled.div`
    height: 60px;
    ${mobile({backgroundColor: ""})}
    background-color: aliceblue;
`;

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none" })}
`;
const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;

`;

const Input = styled.input`
    border: none;
    ${mobile({ width: "50px" })}
`;
const Center = styled.div`
    flex: 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px" })}
    &:hover{
    transform: scale(1.1)
}
`;
const Navbar = () => {
    const user = useSelector(state=>state.user.currentUser);
    const quantity = useSelector(state=>state.cart.quantity)
    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logout())
      }
  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input placeholder="Search"/>
                    <Search style={{color:"gray", fontSize:16 }}/>
                </SearchContainer>
                </Left>
            <Center>
            <Link  to="/"style={{ textDecoration: 'none', color:'#000000' }} >
                <Logo>IntoTheWoods</Logo>
                </Link>
            </Center>
            <Right>
                <Link to = "/register" style={{ textDecoration: 'none', color:'#000000' }}>
                <MenuItem>REGISTER</MenuItem>
                </Link>
                <Link to = "/login" style={{ textDecoration: 'none', color:'#000000' }}>
                <MenuItem>SIGN IN</MenuItem>
                </Link>
                <MenuItem>
              <Link  to="/about" style={{ textDecoration: 'none', color:'#000000' }}>
                   ABOUT US
                </Link>
                </MenuItem>
                <Link to= "/" style={{textDecoration: 'none', color:'#000000' }}>
                {user && <LogoutIcon onClick={handleLogout}/>}                </Link>
                <Link to = "/cart">
                <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlined/>
                    </Badge>
                </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  );
};

export default Navbar
