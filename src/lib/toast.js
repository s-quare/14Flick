"use client";
import Toastify from "toastify-js";

export const showToast = (message) => {
  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
      background: "#ffffff",
      color: "#000000",
      borderRadius: "10px",
      fontSize: "14px",
      fontWeight: "500",
      textAlign: "center",
      padding: "10px 20px", 
      maxWidth: "min(90%, 400px)",
      width: "fit-content",
      margin: "0 auto", 
      boxSizing: "border-box",
    },
  }).showToast();
};
