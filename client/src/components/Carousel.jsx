const Carousel = ({ data, current, setCurrent }) => {
  return (
    <div className="lg:w-full flex justify-center items-center flex-col">
      <div className="relative  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-3  flex justify-center items-center">
        <img
          src={`data:image/jpeg;base64,${current}`}
          alt={"1"}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex justify-center gap-2 mt-2 ">
        {data?.map((item, i) => (
          <div
            key={i}
            className=" bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1"
          >
            <img
              src={`data:image/jpeg;base64,${item.b64_json}`}
              alt={"1"}
              className="w-[56px] h-[56px] object-contain cursor-pointer"
              onClick={() => setCurrent(item.b64_json)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
