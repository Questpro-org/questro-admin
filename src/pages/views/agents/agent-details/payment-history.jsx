import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { capitalizeFirstLetter, formatCurrency, formatDate } from "../../../../utilities/function";
import Table from "../../../../component/reusables/table";

const PaymentHistory = ({ payment }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  const columns = [
    { header: "Transaction ID", accessor: "transactionId" },
    { header: "Description", accessor: "paymentDescription" },
    { header: "Timeline", accessor: "duration" },
    { header: "Date", accessor: "updatedAt" },
    { header: "Amount", accessor: "amount", Cell: ({ value }) => (
        <span className={parseFloat(value.replace(/[^0-9.-]+/g, "")) < 0 ? "text-[#B42318]" : ""}>
          {value}
        </span>
      ) },
    { header: "Status", accessor: "status" },
  ];

  useEffect(() => {
    const filtered = payment?.map((user) => {
      if (user?.status) {
        return {
          ...user,
          plan: `${capitalizeFirstLetter(user?.subscription?.plan || 'N/A')}`,
          duration: `${capitalizeFirstLetter(user?.subscription?.duration || 'N/A')}`,
          updatedAt: `${formatDate(user?.updatedAt)}`,
          amount: `${formatCurrency(user?.amount)}`
        };
      }
      return null;
    }).filter(Boolean);
    setFilteredData(filtered);
    setLoading(false);
  }, [payment]);

  return (
    <div className="rounded-md bg-white border border-[#fff] mt-10">
      <h4 className="text-[#28292C] text-[16px] font-bold">Payment History</h4>
      <div className="mt-7">
        {loading ? (
          <div className="flex justify-center mt-10">
            <TailSpin color="skyblue" />
          </div>
        ) : (
          filteredData?.length > 0 ? (
            <Table
              columns={columns}
              data={filteredData}
              selectedUserId={null}
            />
          ) : (
            <div className="flex justify-center mt-10">
              <p className="text-gray-500 font-bold">No transaction data available</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
