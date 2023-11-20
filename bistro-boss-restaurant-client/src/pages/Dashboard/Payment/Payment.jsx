import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import SectionHeading from "../../../components/SectionHeading";
import Checkout from "./Checkout";

const stripePromise = loadStripe(import.meta.env.VITE_payment_gateway);

const Payment = () => {
  return (
    <div>
      <SectionHeading heading="Payment" subHeading="Please pay to eat" />
      <div>
        <Elements stripe={stripePromise}>
          <Checkout />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
