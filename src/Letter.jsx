import React, { useEffect, useRef } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import "./letter.css";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import toast, { Toaster } from "react-hot-toast";

const Letter = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        import.meta.env.VITE_API_EMAIL_1,
        import.meta.env.VITE_API_EMAIL_2,
        form.current,
        {
          publicKey: import.meta.env.VITE_API_PUBLIC_KEY,
        }
      )
      .then(
        () => {
          toast.success("Signed up Successfully!");
          e.target.reset();
        },
        (error) => {
          toast.error("Error in Signing up. Try Again!");
          e.target.reset();
        }
      );
  };

  return (
    <>
      <div className="newsletter-section">
        <div className="newsletter-content">
          <span className="small-text text-xl">Newsletter</span>
          <span className="big-text">
            Sign up for latest updates and offers
          </span>

          <form className="form" ref={form} onSubmit={sendEmail}>
            <input
              required
              type="email"
              placeholder="Email Address"
              className="letter-input "
              name="from_name"
            />
            <button
              type="submit"
              className="letter-button h-10 w-24 flex items-center justify-center cursor-pointer text-base text-white bg-purple-600 border-b-3 border-purple-800"
            >
              Subscribe
            </button>
          </form>
          <span className="text text-md">
            Will be used in accordance with our Privacy Policy
          </span>
        </div>
      </div>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "white",
            },
          },
          error: {
            style: {
              color: "white",
              background: "red",
            },
          },
        }}
      />
    </>
  );
};

export default Letter;
