const Card = (props: any) => {
    const { classNames, sx, children, showCard, style } = props;
  
    return (
      <div
        style={style}
        className={
          showCard ? `rounded-xl rounded-tr-[90px] bg-white p-4 md:mx-0 mx-5 md:px-12 ${classNames}` : classNames
        }
      >
        {children}
      </div>
    );
  };
  
  export default Card;