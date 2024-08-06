import React, { useState } from "react";
import { Link } from "react-router-dom";
import Bed from "../../../../assets/images/bed 1.svg";
import Bath from "../../../../assets/images/bath-tub 1.svg";
import Icon from "../../../../assets/icon";
import { capitalizeFirstLetter, formatCurrency } from "../../../../utilities/function";
import { showToast } from "../../../../component/reusables/toast";
import useRequest from "../../../../component/hook/use-request";

function ActiveListing({ activeListing, _id }) {
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const userToken = localStorage.getItem("token");
  const { makeRequest: updateBoostPackage } = useRequest(
    `/admin/property/${_id}`,
    "PATCH",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

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
    setDropdownVisible(null);
  };

  const toggleDropdown = (index) => {
    setDropdownVisible(dropdownVisible === index ? null : index);
  };

  return (
    <div>
      <section className="flex justify-between mb-4">
        <h4 className="text-[#28292C] text-[16px] font-bold">Active Listing</h4>
        <Link to={`/properties/${_id}`} className="text-[#459BDA]">
          See more
        </Link>
      </section>

      {activeListing && activeListing.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white">
          {activeListing?.slice(0, 3).map((item, index) => (
            <div
              key={index}
              className="border rounded-lg shadow-lg overflow-x-scroll relative"
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
                  #{formatCurrency(item.price.rent)}
                  </h2>
                </div>
                <div className="flex gap-5 text-sm mb-2">
                  <p className="flex gap-3">
                    <img src={Bed} alt="bed" />
                    {item.description.bedroom} beds
                  </p>
                  <p className="flex gap-2">
                    <img src={Bath} alt="bath" />
                    {item.description.bathroom} baths
                  </p>
                </div>
                <h2 className="text-[14px]">{item.propertyDescription}</h2>
              </div>

              {dropdownVisible === index && (
                <div className="absolute top-8 right-3 bg-white text-black shadow-lg rounded-md w-40 px-3 z-10">
                  <ul className="text-[#1A1B1E] text-[14px]">
                    {["basic", "standard", "premium", "featured"].map(
                      (packageType) => (
                        <li
                          key={packageType}
                          className="cursor-pointer hover:bg-gray-200 p-1"
                          onClick={() => handleBoostPackage(packageType)}
                        >
                          {capitalizeFirstLetter(packageType)}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 text-[16px] font-bold">
          No properties available
        </div>
      )}
    </div>
  );
}

export default ActiveListing;
