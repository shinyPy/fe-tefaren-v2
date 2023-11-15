import LogoTelkom from "../Assets/Image/kisspng-telkom-vocational-school-smk-telekomunikasi-sandhy-smk-telkom-jakarta-google-play-soft-5b814c0ea2f783.6562540715352002706675(2).png";

const Homepreload = () => {
  return (
    <div className=" fixed w-full h-full bg-white">
      <div className="hero_area">
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center justify-center mr-6">
            <img
              src={LogoTelkom}
              alt="logoTelkom"
              className="w-4/12 h-4/6 mx-auto"
            />
            <span className="mt-4 text-animation text-2xl">
              Innovative School Center
            </span>
          </div>
          <div className="splash"></div>
          <div className="splash2">
            <div className="loader">
              <div className="shadow"></div>
              <div className="box"></div>
            </div>
          </div>
          <div className="absolute m-5 font-thin opacity-0 bottom-0 text-4xl animate-slide-up">
            LOADING
          </div>
        </div>

        <svg
          className="waves z-20"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className="parallax">
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="0"
              fill="rgba(185,28, 28, 0.7)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="3"
              fill="rgba(185,28, 28, 0.5)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="5"
              fill="rgba(185,28, 28, 0.3)"
            />
            <use
              xlinkHref="#gentle-wave"
              x="48"
              y="7"
              fill="rgba(185,28, 28, 1)"
            />
          </g>
        </svg>
        <div className="wavesHolder"></div>
      </div>
    </div>
  );
};

export default Homepreload;
