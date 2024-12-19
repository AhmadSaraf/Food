import { Fragment, useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import styles from "./Cart.module.css";
import CartContext from "../Store/cartContext";
import CheckOutForm from "./CheckOutForm";

const Cart = (props) => {
  const [isCheckOut, setIsCheckOut] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const orderHandler = () => {
    setIsCheckOut(true);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const submitHandler = async (userData) => {
    setIsSending(true);
    const reponse = await fetch(
      "https://food-order-5a722-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          items: cartCtx.items,
        }),
      }
    );

    if (!reponse.ok) {
      throw new Error("Something went wrong");
    }
    setIsSending(false);
    setSent(true);
    cartCtx.clearCart()

  };

  const cartItems = (
    <ul className={styles["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const CartItemContent = (
    <Fragment>
      {cartItems}
      <div className={styles.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>

      {isCheckOut && (
        <CheckOutForm onConfirm={submitHandler} onCancel={props.onClose} />
      )}
      {!isCheckOut && (
        <div className={styles.actions}>
          <button className={styles["button--alt"]} onClick={props.onClose}>
            Close
          </button>
          {hasItems && (
            <button className={styles.button} onClick={orderHandler}>
              Order
            </button>
          )}
        </div>
      )}
    </Fragment>
  );

  const isSendingModal = <p>Please Wait, Order is submitting!</p>;

  const sentModal = (
    <Fragment>
      <p>
        Order submitted successfully, We'll let you know ASA the order is ready
      </p>
      <div className={styles.actions}>
        <button className={styles.button} onClick={props.onClose}>
          Ok
        </button>
      </div>
    </Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSending && !sent && CartItemContent}
      {isSending && !sent && isSendingModal}
      {!isSending && sent && sentModal}
    </Modal>
  );
};

export default Cart;
