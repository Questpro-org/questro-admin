import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { capitalizeFirstLetter, formatCurrency, formatDate } from "../../../../utilities/function";
import Table from "../../../../component/table";

const PaymentHistory = ({ payment }) => {
  const [filteredData, setFilteredData] = useState([]);
  const columns = [
    { header: "Transaction ID", accessor: "transactionId"},  
    { header: "Subscription", accessor: "plan" },
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
  }, [payment]);

  return (
    <div className="rounded-md bg-white border border-[#fff] mt-10">
      <h4 className="text-[#28292C] text-[16px] font-bold">Payment History</h4>
      <div className="mt-7">
        {filteredData?.length > 0 ? (
          <Table
            columns={columns}
            data={filteredData}
            selectedUserId={null}
          />
        ) : (
          <div className="opacity-80 mt-10 font-bold w-[4%] mx-auto">
            <TailSpin color="skyblue" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
