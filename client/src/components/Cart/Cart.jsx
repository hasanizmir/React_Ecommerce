import React from "react";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

import "./Cart.scss";
import { removeItem, resetCart } from "../../redux/cartReducer";
import makeRequest from "../../makeRequest";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const totalPrice = () => {
    let total = 0;
    products.forEach((item) => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const stripePromise = loadStripe(
    "pk_test_eOTMlr8usx1ctymXqrik0ls700lQCsX2UB"
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      const res = await makeRequest.post("/orders", {
        products,
      });
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="cart">
      {products.length > 0 ? (
        <>
          <h1>Products in your cart</h1>
          {products.map((item) => (
            <div className="item" key={item.id}>
              <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
              <div className="details">
                <h1>{item.title}</h1>
                <p>{item.desc?.substring(0, 50)}...</p>
                <div className="price">
                  {item.quantity} x ${item.price}
                </div>
              </div>
              <DeleteOutlinedIcon
                className="delete"
                onClick={() => dispatch(removeItem(item))}
              />
            </div>
          ))}
          <div className="total">
            <span>SUBTOTAL</span>
            <span>${totalPrice()}</span>
          </div>
          <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
          <span className="reset" onClick={() => dispatch(resetCart())}>
            Delete all item
          </span>
        </>
      ) : (
        <h1>Cart is empty</h1>
      )}
    </div>
  );
};

export default Cart;
