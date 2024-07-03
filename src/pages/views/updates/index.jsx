import React, { useEffect, useState } from "react";
import Icon from "../../../assets/icon";
import UpdateTable from "./update-table";
import useRequest from "../../../component/hook/use-request";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../component/pagination/pagination";

function Updates() {
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest("/admin/update-notifications", "GET", {
    Authorization: `Bearer ${userToken}`,
  });
  const navigate = useNavigate();
  const [updates, setUpdate] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const params = new URLSearchParams(new URL(window.location.href).search);
  const [currentPage, setCurrentPage] = useState(
    Number(params.get("page")) || 1
  );
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [dropdownOpen, setDropdownOpen] = useState(false);

  function updateUrlParams(params) {
    const url = new URL(window.location.href);
    Object.keys(params).forEach((key) => {
      url.searchParams.set(key, params[key].toString());
    });
    window.history.pushState({}, "", url.toString());
  }

  useEffect(() => {
    const storedSearchQuery = params.get("search") || "";
    const storedStatus = params.get("sentStatus") || "";
    const storedType = params.get("type") || "";

    setSearchQuery(storedSearchQuery);
    setSelectedStatus(storedStatus);
    setSelectedType(storedType);
    fetchUpdates();
  }, [currentPage]);

  useEffect(() => {
    updateUrlParams({
      page: currentPage,
      search: searchQuery,
      sentStatus: selectedStatus,
      type: selectedType,
    });
    fetchUpdates();
  }, [searchQuery, selectedStatus, selectedType, currentPage]);

  async function fetchUpdates() {
    const page = currentPage;
    const limit = itemsPerPage;

    const params = {
      limit: limit,
      page: page,
      ...(selectedStatus ? { sentStatus: selectedStatus } : {}),
      ...(selectedType ? { type: selectedType } : {}),
    };

    const [response] = await makeRequest(undefined, params);
    let updates = response?.data?.data?.docs || [];
    if (searchQuery) {
      const lowerSearchQuery = searchQuery.toLowerCase();
      updates = updates.filter(
        (update) =>
          update.title?.toLowerCase().includes(lowerSearchQuery) ||
          update.type?.toLowerCase().includes(lowerSearchQuery)
      );
    }
    setUpdate(updates);
    setTotalPages(Math.ceil(response.data?.data?.totalPages));
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleStatusChange(event) {
    setSelectedStatus(event.target.value);
  }
  function handleTypeChange(event) {
    setSelectedType(event.target.value);
  }

  const handleDropdownToggle = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleUpdates = () => {
    setDropdownOpen(null);
    navigate("/property/update");
  };

  const handleNotification = () => {
    setDropdownOpen(null);
    navigate("/push/notification");
  };

  return (
    <>
      <div className="bg-[#459BDA] h-[80px] flex justify-between px-10 py-7">
        <h3 className="text-[16px] font-semibold text-white">Agents</h3>
        <button>
          <Icon name="bellicon" />
        </button>
      </div>

      <div className="flex justify-between w-full px-10 py-14">
        <div className="border-2 rounded-md solid pl-5 bg-transparent h-[45px] flex gap-3">
          <Icon name="searchIcon" className="mt-3 rounded" />
          <input
            className="outline-none border-none bg-transparent"
            id="input-placeholder"
            placeholder="Search updates"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <section className="flex gap-4">
          <button
            className="border px-5 py-1 flex gap-3 pt-2 bg-[#459BDA] text-[#fff] text-[14px] font-semibold rounded-md border-[#459BDA]"
            onClick={handleDropdownToggle}
          >
            Create Update
            <Icon name="dropdownIcon" />
          </button>

          {dropdownOpen && (
            <div className="absolute w-[164px] bg-white shadow-lg rounded-md mt-14 z-10">
              <button
                className="block px-4 py-2 text-[14px] text-[#1A1B1E] hover:bg-gray-100"
                onClick={handleUpdates}
              >
                Property Updates
              </button>
              <button
                className="block px-4 py-2 text-[14px] text-[#1A1B1E] hover:bg-gray-100"
                onClick={handleNotification}
              >
                Push Notifications
              </button>
            </div>
          )}

          <select
            className="custom-select border px-3 py-1 bg-[#fff] text-[#459BDA] text-[14px] font-semibold rounded-full border-[#459BDA]"
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value="">Type</option>
            <option value="Push Notifications">Push Notification</option>
            <option value="New Property">New Property</option>
          </select>

          <select
            className="border text-[14px] font-semibold px-3 py-1 bg-[#fff] text-[#459BDA] rounded-full border-[#459BDA]"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">All</option>
            <option value="sent">Sent</option>
            <option value="draft">Draft</option>
          </select>
        </section>
      </div>

      <UpdateTable
        updates={updates}
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
      
    </>
  );
}

export default Updates;
