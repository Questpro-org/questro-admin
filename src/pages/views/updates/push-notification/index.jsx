import React, { useState } from "react";
import Icon from "../../../../assets/icon";
import Push1 from "./push";
import useRequest from "../../../../component/hook/use-request";
import { useForm } from "react-hook-form";
import { showToast } from "../../../../component/reusables/toast";
import Launch from "./launch";

function PushNotification() {
  const [data, setData] = useState(null);
  const [showLaunch, setShowLaunch] = useState(false);
  const [image, setImage] = useState(null); 
  const userToken = localStorage.getItem("token");
  const { makeRequest } = useRequest("/admin/create-update-notification", "POST", {
    Authorization: `Bearer ${userToken}`,
  });

  const { handleSubmit, control, reset, setValue } = useForm();

  const UpdateProperty = handleSubmit(async (formData) => {
      const form = new FormData();
      form.append("title", formData.title);
      form.append("body", formData.body);
      form.append("country", formData.country);
      form.append("state", formData.state);
      form.append("url", formData.url);
      form.append("type", "property updates");

      const [response] = await makeRequest(form);

      if (response) {
        setData(response);
        setShowLaunch(true);
        reset();
      } else {
        showToast("Failed to submit data.", false, {
          position: "top-center",
        });
      }
  });
  return (
    <>
      <div className="bg-[#459BDA] h-[80px] flex justify-between px-10 py-7">
        <h3 className="text-[16px] font-semibold text-white">Agents</h3>
        <button>
          <Icon name="bellicon" />
        </button>
      </div>

      <div className="flex justify-between w-full px-10 py-14">
        <h1 className="text-[16px] font-semibold text-[#28292C]">Message details</h1> 
      </div>

       {!showLaunch &&  <Push1 UpdateProperty={UpdateProperty} control={control} setValue={setValue} />}

       {showLaunch && <Launch data={data} />}
    </>
  );
}

export default PushNotification;
