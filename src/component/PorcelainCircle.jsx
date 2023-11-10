const PorcelainCircle = ({ bg1, bg2, image, title }) => {
  return (
    <div
      className={`post w-[240px] h-[240px] ${bg1} flex justify-center items-center rounded-[120px] cursor-pointer hover:scale-[1.025] transition-all duration-300`}
    >
      <div
        className={`content flex flex-col justify-center items-center gap-[10px] ${bg2} h-[180px] w-[180px] rounded-[90px] `}
      >
        <img src={image} alt="" />
        <p className="text-[14px] leading-[38px] text-center text-[#fff] tracking-[2px] uppercase">
          {title}
        </p>
      </div>
    </div>
  );
};

export default PorcelainCircle;
