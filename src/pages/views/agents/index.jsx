import React, { useEffect, useState } from "react";
import Icon from "../../../assets/icon";
import AgentTable from "./agent-table";
import useRequest from "../../../component/hook/use-request";

function Agents() {
  const { makeRequest } = useRequest("/admin/agents", "GET");
  const [agent, setAgent] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  // const params = new URLSearchParams(new URL(window.location.href).search);
  const params = new URLSearchParams(new URL(window.location.href));
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

  // const fetchData = async () => {
  //   const [response] = await makeRequest();
  //   setAgent(response.data?.data);
  // };

  async function fetchData() {
    const page = currentPage;
    const limit = itemsPerPage;

    const params = {
      limit: limit,
      page: page,
    };

    if (selectedStatus) {
      params.status = selectedStatus;
    }
    if (searchQuery) {
      params.search = searchQuery;
    }

    const [response] = await makeRequest();
    setAgent(response.data?.data?.docs);
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

  console.log(agent);

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
            //   value={searchQuery}
            //   onChange={handleSearchChange}
          />
        </div>

        <section className="flex gap-4">
          <select
            className=" custom-select border px-3 py-1 bg-[#fff] text-[#459BDA] text-[14px] font-semibold rounded-full border-[#459BDA]"
            // value={selectedStatus}
            // onChange={handleStatusChange}
          >
            <option value="">LGA</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>

          <select
            className="border text-[14px] font-semibold px-3 py-1 bg-[#fff] text-[#459BDA] rounded-full border-[#459BDA]"
            // value={selectedStatus}
            // onChange={handleStatusChange}
          >
            <option value="">Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
          </select>
        </section>
      </div>

      <AgentTable
        agent={agent}
        selectedStatus={selectedStatus}
        handleStatusChange={handleStatusChange}
      />
    </>
  );
}

export default Agents;
