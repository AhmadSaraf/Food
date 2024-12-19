import styles from "./CheckOutForm.module.css";
import { useRef, useState } from "react";

const isEmpty = (value) => value.trim() === "";
const isFiveDigit = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const [isValid, setIsValid] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInput = useRef();
  const streetInput = useRef();
  const cityInput = useRef();
  const postalCodeInput = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();
    console.log(isValid);

    const enteredName = nameInput.current.value;
    const enteredStreet = streetInput.current.value;
    const enteredCity = cityInput.current.value;
    const enteredPostalCode = postalCodeInput.current.value;

    const nameIsValid = !isEmpty(enteredName);
    const streetIsValid = !isEmpty(enteredStreet);
    const cityIsValid = !isEmpty(enteredCity);
    const postalCodeIsValid = isFiveDigit(enteredPostalCode);

    setIsValid({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postalCode: postalCodeIsValid,
    });

    const formIsValid =
      isValid.name && isValid.street && isValid.city && isValid.postalCode;

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      city: enteredCity,
      postalCode: enteredPostalCode,
    });
  };

  const nameStyle = `${styles.control} ${isValid.name ? "" : styles.invalid}`;
  const cityStyle = `${styles.control} ${isValid.city ? "" : styles.invalid}`;
  const streetStyle = `${styles.control} ${
    isValid.street ? "" : styles.invalid
  }`;
  const postalCodeStyle = `${styles.control} ${
    isValid.postalCode ? "" : styles.invalid
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameStyle}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInput} />
        {!isValid.name && <p>Please Enter a Valid Name!</p>}
      </div>
      <div className={streetStyle}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInput} />
        {!isValid.street && <p>Please Enter a Valid Street!</p>}
      </div>
      <div className={postalCodeStyle}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInput} />
        {!isValid.postalCode && (
          <p>Please Enter a Valid Postal Code! (5 lenght digit!)</p>
        )}
      </div>
      <div className={cityStyle}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInput} />
        {!isValid.city && <p>Please Enter a Valid City!</p>}
      </div>
      <div className={styles.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
