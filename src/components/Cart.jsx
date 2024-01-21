import { useContext } from "react";
import Button from "./UI/Button";
import Modal from "./UI/Modal";
import CartContext from "./store/CartContext";
import { currencyFormatter } from "../assets/utils/formatting";
import UserProgressContext from "./store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            {...item}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item)}
          />
        ))}
      </ul>
      <p className="cartTotal">{currencyFormatter.format(cartTotal)}</p>
      <p className="modalActions">
        <Button textOnly onClick={handleCloseCart}>
          close
        </Button>
        <Button onClick={handleCloseCart}>Go to CheckOut</Button>
      </p>
    </Modal>
  );
}
