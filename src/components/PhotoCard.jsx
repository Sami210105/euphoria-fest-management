function PhotoCard() {
  const images = [
    img2,img3,img16,img4,img7,img9,img10,img12,img14,img6,img15,img5,img13,
    img2,img3,img16,img4,img7,img9,img10,img12,img14,img6,img15,img5,img13
  ];

  return (
    <div className="overflow-hidden w-full py-6 bg-[#0E0A12]">
      <div className="flex gap-6 animate-scroll">

        {images.map((img, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 group rounded-xl overflow-hidden"
          >
            <img
              src={img}
              className="h-72 object-cover transition duration-500 
              brightness-75 saturate-75 group-hover:brightness-100 
              group-hover:saturate-100 group-hover:scale-105"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-[#0E0A12]/50 
              group-hover:bg-[#0E0A12]/10 transition duration-500" />
          </div>
        ))}

      </div>
    </div>
  );
}
export default PhotoCard;