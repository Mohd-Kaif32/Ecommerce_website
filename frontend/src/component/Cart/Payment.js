
import React, { useEffect, useState } from "react";
import "./payment.css";
import { useHistory } from "react-router-dom";
import {useSelector} from "react-redux";
const RAZORPAY_TEST_KEY = "rzp_test_FAKE123456789"; // fake key for demo only





const Payment = () => {
  const {cartItems} = useSelector((state)=>state.cart);


  
const cartTotal = cartItems.reduce(
  (acc,item) => acc + item.price * item.quantity,0
);


  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [amount] = useState(cartTotal*100); // amount in paise = ₹499.00
  const [currency] = useState("INR");

  // load Razorpay script
  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true);
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  useEffect(() => {
    loadRazorpayScript();
  }, []);

  // mock order creation (normally comes from backend)
  const createOrder = async () => {
    return {
      id: "order_demo_123456",
      amount,
      currency,
    };
  };

  const handlePayment = async () => {
    setLoading(true);
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert("Failed to load Razorpay SDK");
      setLoading(false);
      return;
    }

    let order;
    try {
      order = await createOrder();
    } catch (err) {
      alert("Order creation failed");
      setLoading(false);
      return;
    }

    const options = {
      key: RAZORPAY_TEST_KEY,
      amount: order.amount,
      currency: order.currency,
      name: "MyShop Demo",
      description: "Test Transaction",
      image: "https://via.placeholder.com/120x40?text=MyShop",
      order_id: order.id,
      handler: function (response) {
        console.log("Success:", response);
        alert("Payment successful (demo)!");
        history.push("/payment/success");
      },
      modal: {
        ondismiss: function () {
          setLoading(false);
        },
      },
      prefill: {
        name: "Demo User",
        email: "demo@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#F97316",
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.error("Payment failed:", response.error);
      alert("Payment failed (expected with fake key).");
      setLoading(false);
    });

    rzp.open();
    setLoading(false);
  };

  const goToProducts = () => {
    history.push("/products");
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2 className="payment-title">Secure Checkout</h2>

        <div className="payment-summary">
          <div className="summary-row">
            <span>Item</span>
            <span>Demo Product</span>
          </div>
          <div className="summary-row">
            <span>Quantity</span>
            <span>1</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>₹{(amount / 100).toFixed(2)}</span>
          </div>
        </div>

        <div className="payment-actions">
          <button
            className="btn-primary"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : "Pay with Razorpay"}
          </button>

          <button className="btn-secondary" onClick={goToProducts}>
            Continue Shopping
          </button>
        </div>

        <p className="note">
          This uses a <strong>fake test key</strong>. The Razorpay popup will
          appear, but payment will not succeed.
        </p>
      </div>
    </div>
  );
};

export default Payment;
