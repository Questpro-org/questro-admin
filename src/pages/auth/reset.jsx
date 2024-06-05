import { useNavigate } from "react-router";
import Button from "../../component/button";

const Reset = () => {
  const navigate = useNavigate();
const handleNext = () => {
  navigate('/reset-password')
}
  return (
    <div className="flex flex-col mt-20 w-[40%] mx-auto ">
      <p className="font-semibold text-md md:text-[26px] text-center mt-3">
        Reset Link Sent
      </p>
      <span className="text-[14px] font-light text-center">
        A password reset link has been sent to your email address
      </span>

      <div className="flex justify-center items-center mt-10">
        <Button size="md" variant="primary" type="submit" onClick={handleNext}>
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Reset;
