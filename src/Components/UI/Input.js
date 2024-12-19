import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  const classes = `${styles.input} ${props.className}`

  return(
<div className={classes}>
  <label htmlFor={props.input.id}>{props.label}</label>
  <input ref={ref} {...props.input} />
</div>
  );
}) ;

export default Input;