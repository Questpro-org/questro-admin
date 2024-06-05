import React from "react";
import Icon from "../assets/icon";
import Meme from "../assets/images/frame.svg"

const Card = (props) => {
  const { classNames, sx, children, showCard, style } = props;

  return (
    <div className=" bg-image h-screen p-14">
      <Icon name="questIcon" className="" />
      <div
        style={style}
        className="rounded-xl w-1/2 mx-auto bg-white shadow-sm border mt-10 p-4 md:px-12"
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
