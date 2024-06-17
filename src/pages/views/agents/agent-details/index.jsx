import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRequest from "../../../../component/hook/use-request";
import AgentDetail from "./details";
import Icon from "../../../../assets/icon";
import Back from "../../../../component/back";

const AgentDetails = () => {
  const { _id } = useParams();
  const [data, setData] = useState([]);
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest("/admin/agents", "GET",{
    Authorization: `Bearer ${userToken}`,
  });

  const selectedAgent = data.find((agent) => agent._id === _id);

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await makeRequest();
      setData(response?.data?.data?.docs || []);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="bg-[#459BDA] h-[80px] flex justify-between px-10 py-7">
        <h3 className="text-[16px] font-semibold text-white">Agent</h3>
        <button>
          <Icon name="bellicon" />
        </button>
      </div>

      <div className="flex px-7 mt-3">
        <Back />
        <h2 className="text-[14px] hidden md:block mt-4">Back to projects</h2>
      </div>
      <AgentDetail agent={selectedAgent} />
    </>
  );
};

export default AgentDetails;
