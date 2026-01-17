import React, { useState } from "react";
import { motion } from "framer-motion";

const CartModal = ({ isOpen, toggleModal, cart }) => {
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <></>
  );
};

export default CartModal;
