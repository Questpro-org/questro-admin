import React, { useEffect, useState } from "react";
import Icon from "../../../assets/icon";
import AgentTable from "./agent-table";
import useRequest from "../../../component/hook/use-request";
import Pagination from "../../../component/pagination/pagination";

function Agents() {
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest("/admin/agents", "GET",{
    Authorization: `Bearer ${userToken}`,
  });
  const [agent, setAgent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const params = new URLSearchParams(new URL(window.location.href).search);
  const [currentPage, setCurrentPage] = useState(params.get("page") || 1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

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
  }, [currentPage]);

  useEffect(() => {
    updateUrlParams({
      page: currentPage,
      search: searchQuery,
      status: selectedStatus,
    });
    fetchData();
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
  
    // Client-side filtering for search query
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
  

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleStatusChange(event) {
    setSelectedStatus(event.target.value);
  }

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
            <option value="">All</option>
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
