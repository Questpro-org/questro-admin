import React, { useState } from "react";
import Icon from "../../../../assets/icon";
import Update1 from "./property-update";
import useRequest from "../../../../component/hook/use-request";
import { useForm } from "react-hook-form";
import { showToast } from "../../../../component/reusables/toast";
import Launch from "./launch";

function PropertyUpdates() {
  const [data, setData] = useState(null);
  const [showLaunch, setShowLaunch] = useState(false);
  const [image, setImage] = useState(null); 
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest(
    "/admin/create-update-notification",
    "POST",
    {
      Authorization: `Bearer ${userToken}`,
    }
  );

  const { handleSubmit, control, reset, register } = useForm();
  
  const UpdateProperty = handleSubmit(async (formData) => {
    try {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("body", formData.body);
      form.append("recipientType", formData.recipientType);
      form.append("location", formData.location);
      form.append("url", formData.url);
      form.append("type", "Property Updates");
      if (image) {
        form.append("image", image);
      }

      const [response] = await makeRequest(form);

      if (response) {
        showToast(response.message, true, {
          position: "top-center",
        });
        setData(response);
        setShowLaunch(true);
        reset();
        setImage(null);
        setTimeout(() => {
          window.location.reload()
        },2000 );
      } else {
        showToast("Failed to submit data.", false, {
          position: "top-center",
        });
      }
    } catch (error) {
      showToast("Error submitting data. Please try again later.", false, {
        position: "top-center",
      });
      console.error("Error submitting data:", error);
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
        />
      )}

      {showLaunch && <Launch data={data} />}
    </>
  );
}

export default PropertyUpdates;
