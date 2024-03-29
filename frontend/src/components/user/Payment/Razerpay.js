
import Axios from "axios";
import React, { useState } from "react";
import useRazorpay from "react-razorpay";
// import "../../../../src/"
// import { server } from "./server";

function Razerpay() {
  const [Razorpay] = useRazorpay();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const server = "http://127.0.0.1:8002"
  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));
      console.log("haiiii")

      await Axios({
        
        url: `${server}/api/booking/paymentsuccess/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          console.log("Everything is OK!");
          setName("");
          setAmount("");
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  // this will load a script tag which will open up Razorpay payment card to make transactions
  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async () => {
   
    const res = loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("amount", amount.toString());
    bodyData.append("name", name);

    const data = await Axios({
      url: `${server}/api/booking/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    }).then((res) => {
        console.log(res)
         
      return res;
    });

    // in data we will receive an object from the backend with the information about the payment
    //that has been made by the user
    const REACT_APP_PUBLIC_KEY = 'rzp_test_I7m6Q9rCGvlC2t'
    const REACT_APP_SECRET_KEY = 'QHkXUqlVm6fqb1VUuBPna3Ei'

    const options = {
      key_id: REACT_APP_PUBLIC_KEY, // in react your environment variable must start with REACT_APP_
      key_secret: REACT_APP_SECRET_KEY,
      amount: data.data.payment.amount,
      currency: "INR",
      name: "Org. Name",
      description: "Test teansaction",
      image: "", // add image url
      order_id: data.data.payment.id,
    
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    console.log("haiii",options)
    const rzp1 = new Razorpay(options);
    // var rzp1 = new window.Razorpay(options);
    rzp1.open();
  
  };

  return (
    <div className="container" style={{ marginTop: "20vh" }}>
      <form>
        <h1>Payment page</h1>

        <div className="form-group">
          <label htmlFor="name">Product name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Amount</label>
          <input
            type="text"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </form>
      <button onClick={showRazorpay} className="btn btn-primary btn-block">
        Pay with razorpay
      </button>
    </div>
  );
}

export default Razerpay;