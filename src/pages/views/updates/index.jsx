import React, { useEffect, useState } from 'react'
import Icon from '../../../assets/icon'
import UpdateTable from './update-table'
import useRequest from '../../../component/hook/use-request';

function Updates() {
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest("/admin/update-notifications", "GET",{
    Authorization: `Bearer ${userToken}`,
  });
  const [updates, setUpdate] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const params = new URLSearchParams(new URL(window.location.href).search);
  const [currentPage, setCurrentPage] = useState(params.get("page") || 1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const [dropdownOpen, setDropdownOpen] = useState(null);

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
      updates = updates.filter(update => 
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

  const handleDropdownToggle = (rowId) => {
    setDropdownOpen(dropdownOpen === rowId ? null : rowId);
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
      <select
          className=" custom-select border px-5 py-1 bg-[#459BDA] text-[#fff] text-[14px] font-semibold rounded-md border-[#459BDA]"
          // value={selectedStatus}
          // onChange={handleStatusChange}
        >
          <option value="">Create Update</option>
          <option value="draft">Draft</option>
          <option value="suspended">Suspended</option>
          <option value="inactive">Inactive</option>
          <option value="blocked">Blocked</option>
        </select>

        <select
          className=" custom-select border px-3 py-1 bg-[#fff] text-[#459BDA] text-[14px] font-semibold rounded-full border-[#459BDA]"
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
  </>
  )
}

export default Updates