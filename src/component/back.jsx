import { useNavigate } from "react-router-dom";
import Icon from "../assets/icon";

const Back = () => {
  const navigate = useNavigate();
  return (
    <div className='mt-3'>
      {/* GO BACK FUNCTIONALITY */}
      <div className='flex justify-start'>
        <div
          className='flex p-2 cursor-pointer items-center gap-2'
          onClick={() => navigate(-1)}>
          <Icon name="backIcon" />
        </div>
      </div>

      {/* GO BACK FUNCTIONALITY */}
    </div>
  );
};

export default Back;
