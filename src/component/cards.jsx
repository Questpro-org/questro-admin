import React from "react";
import Icon from "../assets/icon";
import Meme from "../assets/images/frame.svg"

const Card = (props) => {
  const { classNames, sx, children, showCard, style } = props;

  return (
    <div className=" bg-image min-h-screen p-14">
      <Icon name="questIcon"/>
      <div
        style={style}
        className="rounded w-full md:w-[40%] mx-auto bg-white shadow-sm border mt-10 p-4 md:px-12"
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
