import styles from "./Header.module.css";
import mealsphoto from "../../Assets/meals.jpg";
import CartButton from "../Cart/CartButton";
import { Fragment } from "react";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <CartButton onClick={props.onShowCart}/>
      </header>
      <div className={styles["main-image"]}>
        <img src={mealsphoto} alt="A table full of delicious meals!" />
      </div>
    </Fragment>
  );
};

export default Header;
