import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import SectionHeading from "../../../components/SectionHeading";
import useAxiosHook from "../../../Hooks/useAxiosHook";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axios = useAxiosHook();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const response = await axios.get(`/payments/${user?.email}`);
      return response?.data || [];
    },
  });

  return (
    <div>
      <SectionHeading subHeading="At a Glance!" heading="PAYMENT HISTORY" />

      <div className="overflow-x-auto">
        {payments?.length ? (
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr className="bg-orange-500 text-white">
                <th>#</th>
                <th>Transaction Id</th>
                <th>Total Price</th>
                <th>No. of Products</th>
                <th>Payment Date</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {payments.map((payment, idx) => (
                <tr key={payment?._id}>
                  <td>{idx + 1}</td>
                  <td>{payment?.transactionID}</td>
                  <td>{payment?.price}</td>
                  <td>{payment?.menuItemIds?.length}</td>
                  <td>{payment?.date}</td>
                  <td>{payment?.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
};

export default PaymentHistory;
