import React from "react";

const notifications = [
  {
    id: 1,
    message:
      "Agent Mike has subscribed for Questpro Max. Please confirm payment and...",
    status: "Completed",
    time: "2:15 PM, Today",
  },
  {
    id: 2,
    message:
      "Agent Fola verification requested. Please verify agent details for approval",
    status: "Pending",
    time: "2:15 PM, Today",
  },
];

const NotificationsTable = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mt-10 mx-10">
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <h3 className="text-lg font-bold">Notifications</h3>
        <a href="#" className="text-sm text-blue-600">
          See more
        </a>
      </div>
      <table className="min-w-full">
        <tbody>
          {notifications.map((notification) => (
            <tr
              key={notification.id}
              className="flex justify-between p-4 border-b border-gray-200"
            >
              <td className="flex-2 text-left font-bold">{notification.message}</td>
              <td className="flex-1 text-right">
                <span
                  className={`inline-block px-2 py-1 text-sm font-semibold rounded-full ${
                    notification.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {notification.status}
                </span>
              </td>
              <td className="flex-1 text-right">{notification.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotificationsTable;
