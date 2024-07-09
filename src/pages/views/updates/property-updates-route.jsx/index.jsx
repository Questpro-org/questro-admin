import React, { useEffect, useState } from "react";
import Icon from "../../../../assets/icon";
import Update1 from "./property-update";
import useRequest from "../../../../component/hook/use-request";
import { useForm } from "react-hook-form";
import { showToast } from "../../../../component/reusables/toast";
import Launch from "./launch";
import { useParams } from "react-router-dom";


function PropertyUpdatesRoute() {
  const { _id } = useParams();
  const [updates, setUpdates] = useState([]);
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [showLaunch, setShowLaunch] = useState(false);
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest(
    "/admin/create-update-notification",
    "POST",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  const { makeRequest: getUpdate } = useRequest("/admin/update-notifications", "GET", {
    Authorization: `Bearer ${userToken}`,
  });

  const selectedUpdates = updates.find((update) => update._id === _id);

  useEffect(() => {
    const fetchData = async () => {
      const [response] = await getUpdate();
      setUpdates(response?.data?.data?.docs || []);
    };
    fetchData();
  }, []);

  const { handleSubmit, control, reset, register } = useForm();

  const UpdateProperty = handleSubmit(async (formData) => {
    const updatedAgent = {
      title: formData?.title,
      body: formData.body,
      recipientType: formData.recipientType,
      location: formData.location,
      url: formData.url,
      type: "property updates",
    };
    const [response] = await makeRequest(updatedAgent);
    if (response) {
      showToast(response.message, true, {
        position: "top-center",
      });
      setData(response);
      setShowLaunch(true);
      reset();
      
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  });

  return (
    <>
      <div className="bg-[#459BDA] h-[80px] flex justify-between px-10 py-7">
        <h3 className="text-[16px] font-semibold text-white">Updates</h3>
        <button>
          <Icon name="bellicon" />
        </button>
      </div>

      <div className="flex justify-between w-full px-10 py-14">
        <h1 className="text-[16px] font-semibold text-[#28292C]">
          {" "}
          Message details
        </h1>
      </div>

      {!showLaunch && (
        <Update1
          UpdateProperty={UpdateProperty}
          control={control}
          register={register}
          image={image}
          setImage={setImage}
          update={selectedUpdates}
        />
      )}

      {showLaunch && <Launch data={data} />}
    </>
  );
}

export default PropertyUpdatesRoute;
