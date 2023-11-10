const FooterFeedback = (props) => {
  return (
    <div className="post flex flex-col items-center gap-[20px]">
      <div className="wrapper-image flex flex-col items-center justify-center gap-[10px]">
        <img src={props.image} alt="" />
        <p className="text-[#000000] tracking-[1px] dark:text-[#929292]">
          {props.title}
        </p>
      </div>
      <div className="wrapper-text">
        <a href="" className="text-[#6C6C6C] dark:text-[#929292]">
          {props.desc}
        </a>
      </div>
    </div>
  );
};

export default FooterFeedback;
