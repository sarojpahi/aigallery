const Carousel = ({ data, current, setCurrent }) => {
  return (
    <div className="w-[450px] flex justify-center items-center flex-col">
      <div className=" mx-auto">
        <img src={current} alt={"1"} className="w-full h-full object-contain" />
      </div>
      <div className="flex justify-center h-16 mt-2 ">
        {data?.map((item, i) => (
          <div
            key={i}
            className=" bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 p-1 flex gap-4  items-center"
          >
            <img
              src={item.url}
              alt={"1"}
              className="w-full h-full object-contain cursor-pointer"
              onClick={() => setCurrent(item.url)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
