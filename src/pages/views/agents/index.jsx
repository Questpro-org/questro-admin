import React, { useEffect, useState } from "react";
import Icon from "../../../assets/icon";
import AgentTable from "./agent-table";
import useRequest from "../../../component/hook/use-request";
import Pagination from "../../../component/pagination/pagination";
import { useNavigate } from "react-router-dom";

function Agents() {
  const [agent, setAgent] = useState([]);
  const [unreadNotification, setUnreadNotification] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const params = new URLSearchParams(new URL(window.location.href).search);
  const [currentPage, setCurrentPage] = useState(params.get("page") || 1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate()
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest("/admin/agents", "GET",{
    Authorization: `Bearer ${userToken}`,
  });

  const { makeRequest: getUnreadNotification } = useRequest("/notifications/unread/admin", "GET", {
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

    setSearchQuery(storedSearchQuery);
    setSelectedStatus(storedStatus);
    fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    updateUrlParams({
      page: currentPage,
      search: searchQuery,
      status: selectedStatus,
    });
    fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedStatus, currentPage]);

  async function fetchData() {
    const page = currentPage;
    const limit = itemsPerPage;
  
    const params = {
      limit: limit,
      page: page,
      ...(selectedStatus ? { status: selectedStatus } : {}),
    };
  
    const [response] = await makeRequest(undefined, params);
    let agents = response.data?.data?.docs || [];
  
  
    if (searchQuery) {
      const lowerSearchQuery = searchQuery.toLowerCase();
      agents = agents.filter(agent => 
        agent.agencyName?.toLowerCase().includes(lowerSearchQuery) ||
        agent.firstname?.toLowerCase().includes(lowerSearchQuery) ||
        agent.lastname?.toLowerCase().includes(lowerSearchQuery) ||
        agent.email?.toLowerCase().includes(lowerSearchQuery)
      );
    }
  
    setAgent(agents);
    setTotalPages(Math.ceil(response.data?.data?.totalPages));
  }

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getUnreadNotification();
      setUnreadNotification(response?.data?.unreadCount || []);
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

  const handleClick = () => {
    navigate('/notifications')
  }

  return (
    <>
      <div className="bg-[#459BDA] h-[80px] flex justify-between px-10 py-7">
        <h3 className="text-[16px] font-semibold text-white">Agents</h3>
        <div className="relative" onClick={handleClick}>
          <button>
            <Icon name="bellicon" />
          </button>
          {unreadNotification > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
              {unreadNotification}
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
            placeholder="Search agent"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <section className="flex gap-4">
          <select
            className=" custom-select border px-3 py-1 bg-[#fff] text-[#459BDA] text-[14px] font-semibold rounded-full border-[#459BDA]"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="suspended">Suspended</option>
            <option value="deactivated">Deactivated</option>
          </select>
        </section>
      </div>

      <AgentTable
        agent={agent}
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

export default Agents;
