
import Axios from "axios";
import React, { useState } from "react";
import useRazorpay from "react-razorpay";
import {Button} from "@material-tailwind/react"

function RazerPay(props) {
  const [Razorpay] = useRazorpay();
  

  const amount = parseInt(props.amount, 10);
  const Name = props.name

  const currency = "INR";
  const receiptId = "qwsaq1";
  const server = "http://127.0.0.1:8002"
  let bodyData = {"amount":amount,"name":Name}
  const paymentHandler = async (e) => {
   
    const response = await Axios({
        url: `${server}/api/booking/pay/`,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: bodyData,
      })
    const order = await response.data.order
    console.log('uyyyyyyyyyyyyyyy',order);

    var options = {
      key: "rzp_test_I7m6Q9rCGvlC2t", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "Acme Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.order_payment_id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {

        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature)


        const body = {
          ...response,
        };
  console.log(body)
        const validateRes = await fetch(
          `${server}/api/booking/complete/`,
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new Razorpay(options);

    // var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };
//   useEffect(() => {
//  paymentHandler()
//   }, []);
  return (
    <>

      <Button variant="gradient" onClick={paymentHandler} color="green">
              <span>Confirm</span>
            </Button>


    </>

  );
}

export default RazerPay;