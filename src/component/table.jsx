
import Icon from "../assets/icon";
import { formatDate } from "../utilities/function";
const Table = ({
  columns,
  data,
  onUserClick,
  selectedUserId,
  currentPage,
  onPageChange
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
      case "completed":
      case "confirmed":
        return "#D1FFC9";
      case "pending":
      case "delivered":
        return "#CFF0FC";
      case "failed":
      case "cancelled":
        return "#FFE2E2";
      case "inactive":
        return "#D9D9D9";
      default:
        return "transparent";
    }
  };

  return (
    <table className="table w-full">
      <thead className="border-b-2 h-10">
        <tr className="text-[16px] text-left">
          {columns?.map((column, index) => (
            <th className="font-medium" key={index}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-[12px]">
        {data?.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column, colIndex) => (
              <td key={colIndex} className="pt-5">
                {column.accessor === "created_at" || column.accessor === "createdAt" ? (
                  formatDate(row[column.accessor])
                ) : column.accessor === "profilePhoto" ? (
                //   <img
                //     src={row[column.accessor] ? row[column.accessor] : PlaceholderImage}
                //     width={40}
                //     alt="profile"
                //   />
                <p></p>
                ) : column.accessor === "id" || column.accessor === "orderId" ? (
                  <button onClick={() => onUserClick(row[column.accessor])}>
                    <Icon name="dotIcon" />
                  </button>
                ) : column.accessor === "phone" && !row[column.accessor] ? (
                  "N/A"
                ) : column.accessor === "status" ? (
                  <p
                    className="-mt-1 text-[12px] text-center font-normal w-20 p-1 rounded-lg"
                    style={{ backgroundColor: getStatusColor(row[column.accessor]) }}
                  >
                    {row[column.accessor]}
                  </p>
                ) : (
                  row[column.accessor]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
