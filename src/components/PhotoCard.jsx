import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpeg";
import img4 from "../assets/img4.jpeg";
import img5 from "../assets/img5.jpeg";
import img6 from "../assets/img6.jpeg";
import img7 from "../assets/img7.jpeg";
import img9 from "../assets/img9.jpeg";
import img10 from "../assets/img10.jpeg";
import img12 from "../assets/img12.jpeg";
import img13 from "../assets/img13.jpeg";
import img14 from "../assets/img14.jpeg";
import img15 from "../assets/img15.jpeg";
import img16 from "../assets/img16.jpeg";

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
              brightness-90 saturate-75 group-hover:brightness-100 
              group-hover:saturate-100 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-[#0E0A12]/5 
              group-hover:bg-[#0E0A12]/10 transition duration-500" />
          </div>
        ))}

      </div>
    </div>
  );
}
export default PhotoCard;