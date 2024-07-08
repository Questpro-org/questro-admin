import React from "react";
import { Link } from "react-router-dom";
import Bed from "../../../../assets/images/bed 1.svg";
import Bath from "../../../../assets/images/bath-tub 1.svg";
import Avatar from "../../../../assets/images/an_avatar_image_of_a_house.jpeg"

function ActiveListing({ activeListing, _id }) {
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
          {activeListing.slice(0, 3).map((item, index) => (
            <div key={index} className="border rounded-lg shadow-lg overflow-hidden">
              <img
                src={item.propertyImage?.image || Avatar}
                alt={item.propertyDescription}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 bg-[#3F90CB]">
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-[28px] font-semibold">#{(item.price.rent)}</h2>
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
