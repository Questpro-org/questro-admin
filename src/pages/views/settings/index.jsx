import React, { useEffect, useState } from "react";
import SettingsTable from "./settings-table";
import Icon from "../../../assets/icon";
import useRequest from "../../../component/hook/use-request";
import AddAdmin from "./settings-modal/add-admin";
import Pagination from "../../../component/pagination/pagination";
import { useNavigate } from "react-router-dom";

function Settings() {
  const userToken = localStorage.getItem("token");
  const [notification, setNotification] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRoles, setSelectedRoles] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const params = new URLSearchParams(new URL(window.location.href).search);
  const [currentPage, setCurrentPage] = useState(params.get("page") || 1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  const { makeRequest } = useRequest("/admin/admins", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  const { makeRequest: getNotification } = useRequest("/notifications", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  function updateUrlParams(params) {
    const url = new URL(window.location.href);
    Object.keys(params).forEach((key) => {
      url.searchParams.set(key, params[key].toString());
    });
    window.history.pushState({}, "", url.toString());
  }

  useEffect(() => {
    const storedSearchQuery = params.get("search") || "";
    const storedStatus = params.get("status") || "";
    const storedRoles = params.get("role") || "";

    setSearchQuery(storedSearchQuery);
    setSelectedStatus(storedStatus);
    setSelectedRoles(storedRoles);
    fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    updateUrlParams({
      page: currentPage,
      search: searchQuery,
      status: selectedStatus,
      role: selectedRoles,
    });
    fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedStatus, selectedRoles, currentPage]);

  async function fetchData() {
    const page = currentPage;
    const limit = itemsPerPage;

    const params = {
      limit: limit,
      page: page,
      ...(selectedStatus ? { status: selectedStatus } : {}),
      ...(selectedRoles ? { role: selectedRoles } : {}),
    };

    const [response] = await makeRequest(undefined, params);
    let users = response.data?.data?.docs || [];
    if (searchQuery) {
      const lowerSearchQuery = searchQuery.toLowerCase();
      users = users.filter(
        (admin) =>
          admin.username?.toLowerCase().includes(lowerSearchQuery) ||
          admin.email?.toLowerCase().includes(lowerSearchQuery) ||
          admin.role?.toLowerCase().includes(lowerSearchQuery)
      );
    }

    setAdmins(users);
    setTotalPages(Math.ceil(response.data?.data?.totalPages));
  }

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getNotification(undefined, {
        recipientType: 'admin',
      });
      setNotification(response?.data?.data?.docs || []);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleStatusChange(event) {
    setSelectedStatus(event.target.value);
  }

  function handleRolesChange(event) {
    setSelectedRoles(event.target.value);
  }

  const addAdmin = () => {
    setModalVisible(true);
  };

  const notificationCount = notification.filter(notify => !notify.readBy || notify.readBy.length === 0).length;
  
  const handleClick = () => {
    navigate("/notifications");
  };

  return (
    <>
      <div className="bg-[#459BDA] h-[80px] flex justify-between px-10 py-7">
        <h3 className="text-[16px] font-semibold text-white">Agents</h3>
        <div className="relative" onClick={handleClick}>
          <button>
            <Icon name="bellicon" />
          </button>
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
              {notificationCount}
            </span>
          )}
        </div>
      </div>

      <div className="flex justify-between w-full px-10 py-14">
        <div className="border-2 rounded-md solid pl-5 bg-transparent h-[45px] flex gap-3">
          <Icon name="searchIcon" className="mt-3 rounded" />
          <input
            className="outline-none border-none bg-transparent"
            id="input-placeholder"
            placeholder="Search user"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <section className="flex gap-4">
          <button
            className=" custom-select flex gap-4 border px-5 py-3 bg-[#459BDA] text-[#fff] text-[14px] font-semibold rounded-md border-[#459BDA]"
            onClick={addAdmin}
          >
            Add new user
            <Icon name="addicon" />
          </button>

          <select
            className=" custom-select border px-3 py-1 bg-[#fff] text-[#459BDA] text-[14px] font-semibold rounded-full border-[#459BDA]"
            value={selectedRoles}
            onChange={handleRolesChange}
          >
            <option value="">Type</option>
            <option value="admin">Admin</option>
            <option value="superadmin">Super Admin</option>
            <option value="support">Support</option>
          
          </select>

          <select
            className="border text-[14px] font-semibold px-3 py-1 bg-[#fff] text-[#459BDA] rounded-full border-[#459BDA]"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="deactivated">Deactivated</option>
            {/* <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option> */}
          </select>
        </section>
      </div>

      <SettingsTable
        admins={admins}
        selectedStatus={selectedStatus}
        handleStatusChange={handleStatusChange}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {modalVisible && (
        <AddAdmin
          visible={modalVisible}
          handleClose={() => setModalVisible(false)}
        />
      )}
    </>
  );
}

export default Settings;
