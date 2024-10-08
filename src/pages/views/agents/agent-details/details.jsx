import React, { useEffect, useState } from "react";
import {
  capitalizeFirstLetter,
  formatDate,
} from "../../../../utilities/function";
import Icon from "../../../../assets/icon";
import useRequest from "../../../../component/hook/use-request";
import ActiveListing from "./active-details";
import PaymentHistory from "./payment-history";
import UserComments from "./user-comments";
import EditAgent from "./edit-agent";
import Pagination from "../../../../component/pagination/pagination";

const AgentDetails = ({ title, value, icon }) => {
  return (
    <div className="flex gap-3 py-2 mt-3">
      <Icon name={icon} />
      <h3 className="font-medium text-[#2C2D2D] text-[14px]">
        {title}{" "}
        <span className="font-normal block text-[#515359] text-[14px] pt-1">
          {value}
        </span>
      </h3>
    </div>
  );
};

const AgentDetail = ({ agent, _id }) => {
  const userToken = localStorage.getItem("token");
  const [activeListing, setActiveListing] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [payment, setPayment] = useState([]);
  const [comment, setComment] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const params = new URLSearchParams(new URL(window.location.href).search);
  const [currentPage, setCurrentPage] = useState(params.get("page") || 1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const { makeRequest } = useRequest(
    `/admin/agent/${agent?._id}/listings`,
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );
  const { makeRequest: getPayment } = useRequest(
    `/payment/agent/${agent?._id}/transactions`,
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );
  const { makeRequest: getComments } = useRequest(
    `/admin/agent/${agent?._id}/comments`,
    "GET",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  let selfieUrl = agent?.selfie?.filePath || "";
  let uploadUrl = agent?.idUpload?.filePath || "";
  const handlePreview = (url) => {
    setPreviewUrl(url);
    setDropdownVisible(null);
  };

  // const handleSave = (url) => {
  //   const link = document.createElement("a");
  //   link.href = url;
  //   link.download = url.split("/").pop();
  //   link.click();
  //   setDropdownVisible(null);
  // };

  const handleSave = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = url.split("/").pop() || "download";
        link.dispatchEvent(
          new MouseEvent("click", { bubbles: true, cancelable: true })
        );
        URL.revokeObjectURL(url);
      });
  };

  const toggleDropdown = (url) => {
    setDropdownVisible(dropdownVisible === url ? null : url);
  };

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await makeRequest();
      setActiveListing(response?.data?.payload || []);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent?._id]);

  //PAYMENT
  function updateUrlParams(params) {
    const url = new URL(window.location.href);
    Object.keys(params).forEach((key) => {
      url.searchParams.set(key, params[key].toString());
    });
    window.history.pushState({}, "", url.toString());
  }

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    updateUrlParams({
      page: currentPage,
    });
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, agent?._id]);

  async function fetchData() {
    const page = currentPage;
    const limit = itemsPerPage;

    const params = {
      limit: limit,
      page: page,
    };

    const [response] = await getPayment(undefined, params);
    let payments = response?.message?.data?.docs || [];
    setPayment(payments);
    setTotalPages(Math.ceil(response.message?.data?.totalPages));
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    const fetchComment = async () => {
      const [response] = await getComments();
      const commentsData =
        response?.data?.flatMap((item) => item.comments) || [];
      setComment(commentsData);
    };
    fetchComment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agent?._id]);

  const handleEdit = () => {
    setModalVisible(true);
  };

  return (
    <>
      <div className="mt-2 w-full px-10">
        <section className="flex justify-between mt-3">
          <p className="text-[#28292C] font-semibold text-[16px]">
            Agent details
          </p>
          <button
            type="button"
            className="text-[#459BDA] text-[16px] font-normal"
            onClick={handleEdit}
          >
            Edit
          </button>
        </section>

        <section className="flex gap-2 mt-5">
          {selfieUrl ? (
            <img
              src={selfieUrl}
              className="w-[60px] -mt-[14px] h-[60px] rounded-full"
              alt="selfie"
            />
          ) : (
            <Icon name="avatarIcon" className=" -mt-[14px]  rounded-full" />
          )}
          <p className="text-[16px] text-[#515359] font-medium">
            {capitalizeFirstLetter(agent?.firstname)}{" "}
            {capitalizeFirstLetter(agent?.lastname)}
          </p>
          <hr className="w-[81%] mt-3 h-[1px] block bg-[#D2D9DF]" />
        </section>

        <div className="grid grid-cols-3 mt-3">
          <AgentDetails
            title="Agent Status"
            icon="agentIcon"
            value={capitalizeFirstLetter(agent?.status) || "N/A"}
          />

          <AgentDetails
            title="Email"
            icon="locationIcon"
            value={agent?.email || "N/A"}
          />

          <AgentDetails
            title="Joined on"
            icon="locationIcon"
            value={formatDate(agent?.createdAt || "N/A")}
          />

          <AgentDetails
            title="Verification"
            icon="locationIcon"
            value={agent?.isVerified ? "Verified" : "Not Verified" || "N/A"}
          />

          <AgentDetails
            title="Subscription Plan"
            icon="locationIcon"
            value={capitalizeFirstLetter(agent?.subscription?.plan) || "N/A"}
          />
        </div>

        <h4 className="text-[16px] font-semibold text-[#666975] mt-5">
          File uploads
        </h4>

        <section className="grid grid-cols-3 mt-10 gap-4">
          {uploadUrl && (
            <div className="relative">
              <img src={uploadUrl} className="" alt="upload" />
              <span onClick={() => toggleDropdown(uploadUrl)}>
                <Icon
                  name="dotIcon"
                  className="absolute top-0 right-0 cursor-pointer"
                />
              </span>
              {dropdownVisible === uploadUrl && (
                <div className="absolute top-6 right-0 bg-white shadow-lg rounded p-2">
                  <button
                    onClick={() => handlePreview(uploadUrl)}
                    className="block text-left w-full text-[14px] px-4 py-2 text-[#28292C] hover:bg-[#d1d2d4] rounded-md"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleSave(uploadUrl)}
                    className="block text-left w-full text-[14px] px-4 py-2 text-[#28292C] hover:bg-[#d1d2d4] rounded-md"
                  >
                    Save to device
                  </button>
                </div>
              )}
            </div>
          )}
          {selfieUrl && (
            <div className="relative">
              <img src={selfieUrl} className="" alt="selfie" />
              <span onClick={() => toggleDropdown(selfieUrl)}>
                <Icon
                  name="dotIcon"
                  className="absolute top-0 right-0 cursor-pointer"
                />
              </span>
              {dropdownVisible === selfieUrl && (
                <div className="absolute top-6 right-0 bg-white shadow-lg rounded p-2">
                  <button
                    onClick={() => handlePreview(selfieUrl)}
                    className="block text-left w-full text-[14px] px-4 py-2 text-[#28292C] hover:bg-[#d1d2d4] rounded-md"
                  >
                    Preview
                  </button>
                  <button
                    onClick={() => handleSave(selfieUrl)}
                    className="block text-left w-full text-[14px] px-4 py-2 text-[#28292C] hover:bg-[#d1d2d4] rounded-md"
                  >
                    Save to device
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {previewUrl && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded">
              <div className="flex justify-end">
                <button
                  onClick={() => setPreviewUrl(null)}
                  className="text-white px-2 py-2 rounded mr-0"
                >
                  <Icon name="cancelIcon" />
                </button>
              </div>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-[700px] h-[400px]"
              />
            </div>
          </div>
        )}

        <ActiveListing activeListing={activeListing} _id={_id} />

        <UserComments comments={comment} />

        <PaymentHistory payment={payment} />

        <EditAgent
          visible={modalVisible}
          handleClose={() => setModalVisible(false)}
          agent={agent}
        />
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default AgentDetail;
