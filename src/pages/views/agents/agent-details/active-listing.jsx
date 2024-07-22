import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Bed from "../../../../assets/images/bed 1.svg";
import Bath from "../../../../assets/images/bath-tub 1.svg";
import useRequest from "../../../../component/hook/use-request";
import Back from "../../../../component/reusables/back";
import Icon from "../../../../assets/icon";
import { showToast } from "../../../../component/reusables/toast";
import { capitalizeFirstLetter } from "../../../../utilities/function";

function ActiveListings() {
  const { _id } = useParams();
  const [activeListing, setActiveListing] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest(`/admin/agent/${_id}/listings`, "GET", {
    Authorization: `Bearer ${userToken}`,
  });
  const { makeRequest: updateBoostPackage, loading } = useRequest(
    `/admin/property/${_id}`,
    "PATCH",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );


  useEffect(() => {
    const fetchData = async () => {
      const [response] = await makeRequest();
      setActiveListing(response?.data?.payload || []);
    };
    fetchData();
         // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id]);

  const handleBoostPackage = async (packageType) => {
    const updatedAgent = {
      boostPackage: packageType,
    };
    const [response] = await updateBoostPackage(updatedAgent);
    if (response.status === 200) {
      showToast(response.message, true, {
        position: "top-center",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      showToast(response.message, false, {
        position: "top-center",
      });
    }
  };

  const toggleDropdown = (index) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  return (
    <div className="px-10">
      <div className="flex mt-3">
        <Back />
        <h2 className="text-[14px] hidden md:block mt-4">Back to details</h2>
      </div>

      <div className="border-[2px] w-[30%] rounded-md solid pl-5 bg-transparent h-[35px] flex gap-3 mt-7">
        <Icon name="searchIcon" className="mt-2 rounded" />
        <input
          className="outline-none border-none bg-transparent"
          id="input-placeholder"
          placeholder="Search listings"
        />
      </div>

      <div className="flex justify-between w-full  mt-6">
        <h4 className="text-[#28292C] text-[16px] font-bold">Active Listing</h4>
        <section className="flex gap-4">
          <select
            className=" custom-select border px-3 py-1 bg-[#fff] text-[#459BDA] h-10 text-[14px] font-semibold rounded-full border-[#459BDA]"
          >
            <option value="">All</option>
            <option value="active">Month</option>
            <option value="pending">Year</option>
            <option value="suspended">Week</option>
            <option value="deactivated">Days</option>
          </select>
        </section>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white mt-5">
        {activeListing?.map((item, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-lg overflow-hidden relative"
          >
            {item.propertyImage && Array.isArray(item.propertyImage) && (
              <div className="w-full relative h-48 flex">
                {item.propertyImage.map((image, imgIndex) => (
                  <img
                    key={imgIndex}
                    src={image}
                    alt={item.propertyDescription}
                    className="object-cover w-full h-full"
                  />
                ))}
                <span onClick={() => toggleDropdown(index)}>
                  <Icon
                    name="dotIcon"
                    className="absolute top-2 right-3 cursor-pointer"
                  />
                </span>
              </div>
            )}
            <div className="p-4 bg-[#3F90CB]">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-[28px] font-semibold">
                  #{item.price.rent}
                </h2>
              </div>
              <div className="flex  gap-5 text-sm mb-2">
                <p className="flex gap-3">
                  <img src={Bed} alt="bed" />
                  {item.description.bedroom} beds
                </p>
                <p className="flex gap-2">
                  <img src={Bath} alt="bath" />
                  {item.description.bathroom} baths
                </p>
              </div>
              <h2 className="text-[14px] ">{item.propertyDescription}</h2>
            </div>
            {dropdownVisible === index && (
              <div className="absolute top-8 right-3 bg-white text-black shadow-lg rounded-md w-40 px-3 z-10">
                <ul className="text-[#1A1B1E] text-[14px]">
                  {["basic", "standard", "premium", "featured"].map((packageType) => (
                    <li
                      key={packageType}
                      className="cursor-pointer hover:bg-gray-200 p-1"
                      onClick={() => handleBoostPackage(packageType)}
                    >
                      {capitalizeFirstLetter(packageType)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActiveListings;
