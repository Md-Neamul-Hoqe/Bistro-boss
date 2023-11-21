import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosHook from "../../../Hooks/useAxiosHook";
import useCart from "../../../Hooks/useCart";
import useMenuIds from "../../../Hooks/useMenuIds";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState(null);
  const [transactionID, setTransactionID] = useState(null);
  const [error, setError] = useState(null);
  const [cart, refetch] = useCart();
  const menu = useMenuIds(cart);
  console.log(cart, menu);
  const stripe = useStripe();
  const elements = useElements();
  const axios = useAxiosHook();
  const totalPrice = menu?.reduce((total, item) => item?.price + total, 0);

  const navigate = useNavigate();
  console.log(totalPrice);

  useEffect(() => {
    totalPrice &&
      axios
        .post("/create-payment-intent", { price: totalPrice })
        .then((res) => {
          // console.log(res?.data?.clientSecret);
          setClientSecret(res?.data?.clientSecret);
        });
  }, [axios, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("submitted");

    if (!stripe || !elements) return;
    const card = elements.getElement(CardElement);

    if (card === null) return;

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
      setError(error?.message);
    } else {
      // console.log("paymentMethod: ", paymentMethod);
      setError(null);
    }

    /* Confirm Payment */

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymouse",
            name: user?.name,
          },
        },
      });

    if (confirmError) console.log("confirm error: ", confirmError);
    else {
      // console.log(paymentIntent);
      if (paymentIntent.status === "succeeded") {
        // console.log("Transaction id: ", paymentIntent.id);

        setTransactionID(paymentIntent.id);

        const payment = {
          email: user?.email,
          price: totalPrice,
          date: new Date(), // using moment js convert it to UTC date
          cartIds: cart.map((item) => item?._id),
          menuItemIds: menu.map((item) => item?._id),
          status: "pending",
          transactionID: paymentIntent.id,
        };

        const res = await axios.post("/payments", payment);
        // console.log("Payment succeeded: ", res);
        refetch();

        res.data?.paymentResult?.insertedId ? (
          <>
            {
              (Swal.fire({
                icon: "success",
                title: "Payment succeeded",
                text: "Thanks to order from our site.",
              }),
              navigate("/dashboard/payment-history"))
            }
          </>
        ) : null;
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button type="submit" disabled={!stripe || !clientSecret}>
          Pay
        </button>
        <p className="text-red-600">{error}</p>
        {transactionID ? (
          <p className="text-green-600">Your transaction id: {transactionID}</p>
        ) : null}
      </form>
    </div>
  );
};

export default Checkout;
