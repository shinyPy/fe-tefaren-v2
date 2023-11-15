const Preload = () => {
  return (
    <div className=" fixed w-full h-full bg-white">
      <div className="loader2">
        <div className="shadow2"></div>
        <div className="box2"></div>
      </div>
      <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2">
        <div className="m-5 font-thin text-4xl">LOADING</div>
      </div>
    </div>
  );
};

export default Preload;
