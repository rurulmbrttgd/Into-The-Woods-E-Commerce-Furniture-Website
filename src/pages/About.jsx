import React from "react"
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar"
import { mobile } from "../responsive";
import aboutcss from "./aboutcss.css";

const Image = styled.img``;
const Wrapper = styled.div`
${mobile({padding: "10px 0px"})}
//background-image: url("https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1330&q=80");
`;
const Info = styled.div`
  padding: 100px;
    text-align: center;
    background-image: url("https://res.cloudinary.com/dxzvh2xex/image/upload/v1658080468/aboutus_o9e1dn.png");
    background-position-y: 45%;
    background-repeat: no-repeat;
    background-size: 2000px;
    color: #59302d;
    ${mobile({padding: "5px 0px"})}
    `;
const Card = styled.div`
position: relative;
    left: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    margin: 8px;
`;


const About = () => {

  return (
    <div>
        <Navbar/>
            
        <Info>
  <h1 class="Name">ABOUT INTOTHEWOODS TEAM</h1>
  <p class="Abtitle">Welcome to IntoTheWoods, Into the Woods' team is consist of woodcraft artist that comes from Paete, Laguna, well-known as the Wood Carving Capital of the Philippines.</p>
  <p class="Abtitle">Assurance for high-quality products such as cabinets, well carved traditional tables, authentic chairs, and innovative wooden doors, in which we are providing for the consumer. If you have any questions or comments, please don't hesitate to contact us.</p>
</Info>
<Wrapper>
<div class="row">
  <div class="column">
    <div class="card">
    <Image src="https://res.cloudinary.com/dxzvh2xex/image/upload/v1658078959/utot_bctyju.jpg"   width="100%"
    />
      <div class="container">
        <h2 class="DevName">Ronald Lambert N. Tugadi</h2>
        <p class="title">Developer</p>
        <p class="desc">Hi! I'm Ronald, one of the developers for this project. If you have any questions or concerns, feel free to contact us!</p>
        <p class="desc">ronaldlambertnicolastugadi@gmail.com</p>
        <form action="https://mail.google.com/mail/u/0/#inbox?compose=CllgCJvnJtCHtjGZrBcMzqbJGHgRQMhNvQqwnKwFnQGJQpXlMvrknZNZLdzkMVTNNVZXVZqNQkL" target="_blank">
        <p><button class="button">Contact</button></p>
        </form> 
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
    <Image src="https://res.cloudinary.com/dxzvh2xex/image/upload/v1658083432/lassstttkerby_jvdpdy.png"   width="100%"
    />
      <div class="container">
        <h2 class="DevName">Kerby Soguilon</h2>
        <p class="title">Support</p>
        <p class="desc">Hi! I'm Kerby, one of the developers for this project. If you have any questions or concerns, feel free to contact us! </p>
        <p class="desc">soguilonkerby@gmail.com</p>
        <form action="https://mail.google.com/mail/u/0/?#inbox?compose=CllgCJZbjcSPQTMJXrbWqFffwrbBfGhSWXThmTXqjKjvdHvWKMQFxtFjRGlbfQHksTsJnKDvqdq" target="_blank">
        <p><button class="button" >Contact</button></p>
        </form>
      </div>
    </div>
  </div>
</div>
</Wrapper>
        <Footer/>
    </div>
  )
}

export default About;