import { Add, Remove, DeleteOutlineOutlined } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import React, { useEffect, useState, Fragment } from "react";
import { userRequest } from "../requestMethods";
import { useHistory, Link } from "react-router-dom";
import { updateProduct, deleteProduct } from "../redux/cartRedux";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`
background-color: #f1d5b1;
`;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 400;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;

const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })};
  position: relative;
  padding: 1px;
  margin: 10px 0;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  font-weight: 500;
`;

const ProductId = styled.span`
  font-weight: 500;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #ffffff;
  border: none;
  height: 1px;
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  background-color: #ffecda;
`;

const SummaryTitle = styled.h1`
  font-weight: 300;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const StyledDelete = styled(DeleteOutlineOutlined)`
  position: absolute;
  cursor: pointer;
  right: 50px;
  top: 0;
`;

const QuantityButton = styled(({ component, ...props }) =>
  React.cloneElement(component, props)
)`
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const ProductSize = styled.span`
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const dispatch = useDispatch()

  const onToken = (token) => {
    setStripeToken(token);
  };

  const handleDelete = (data) => {
    dispatch(deleteProduct(data))
  }

  const {
    cart: { products },
  } = useSelector((state) => state)

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        history.push("/success", {
          stripeData: res.data,
          products: cart });
      } catch {}
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, history]);
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>YOUR WOODCART</Title>
        <Top>
        <Link  to="/"style={{ textDecoration: 'none', color:'#000000' }} >
          <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag(2)</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Hr/>
          <Info>
{products?.map((product) => {
                  const {
                    img,
                    title,
                    _id: id,
                    categories,
                    obj,
                    quantity,
                    price
                  } = product
                  return (
                    <Fragment key={id+obj+categories}>
                      <Product>
                        <ProductDetail>
                          <StyledDelete
                        style={{color:"red"}}
                          onClick={() =>
                            handleDelete({
                              id,
                              totalPrice: price * quantity, obj, categories
                            })
                          }
                        /><Circle>
                          <Image src={img} alt={title} />
                          </Circle>
                          <Details>
                            <ProductName>
                              <b>{("Title")}: </b>
                              {title}
                            </ProductName>
                            <ProductId>
                              <b>{("ID")}: </b>
                              {id}
                            </ProductId>
                            <ProductSize>
                                <b>{("OBJECT")}: {product.obj}</b>
                              </ProductSize>
                              <ProductSize>
                                <b>{("CATEGORY")}: {product.categories}</b>
                              </ProductSize>
                          </Details>
                        </ProductDetail>
                        <PriceDetail>
                          <ProductAmountContainer>
                            <QuantityButton
                              component={<Add />}
                              onClick={() => {
                                dispatch(
                                  updateProduct({
                                    id,
                                    quantity: 1,
                                    price,
                                  })
                                )
                              }}
                            />
                            <ProductAmount>{quantity}</ProductAmount>
                            <QuantityButton
                              component={<Remove />}
                              onClick={() => {
                                if (quantity > 1)
                                  dispatch(
                                    updateProduct({
                                      id,
                                      quantity: -1,
                                      price,
                                    })
                                  )
                              }}
                            />
                          </ProductAmountContainer>
                          <ProductPrice>
                          {("₱")}
                            {price * quantity}
                          </ProductPrice>
                        </PriceDetail>
                      </Product>
                    </Fragment>
                  )
                })}
                
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Merchandise Subtotal</SummaryItemText>
              <SummaryItemPrice>₱ {cart.total} </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₱ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>₱ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>₱ {cart.total} </SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="IntoTheWoods"
              image="https://res.cloudinary.com/dxzvh2xex/image/upload/v1657600355/logo_h6wxoi.png"
              billingAddress
              shippingAddress
              description={`Your total is ₱${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
            <Button>STRIPE CHECKOUT</Button>
          </StripeCheckout>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;