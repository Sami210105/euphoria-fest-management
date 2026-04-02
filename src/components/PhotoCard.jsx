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
    img2,
    img3,
    img16,
    img4,
    img7,
    img9,
    img10,
    img12,
    img14,
    img6,
    img15,
    img5,
    img13,
    img2,
    img3,
    img16,
    img4,
    img7,
    img9,
    img10,
    img12,
    img14,
    img6,
    img15,
    img5,
    img13,
  ];

  return (
    <div className="relative overflow-hidden w-full py-6 bg-black">
      <div className="absolute opacity-80 top-1 left-0 w-full h-2 bg-[repeating-linear-gradient(90deg,transparent_0_6px,#1C0F0F_6px_14px)] z-10" />
      <div className="absolute opacity-80 bottom-1 left-0 w-full h-2 bg-[repeating-linear-gradient(90deg,transparent_0_6px,#1C0F0F_6px_14px)] z-10" />

      <div className="flex gap-6 animate-scroll">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative flex-shrink-0 group overflow-hidden"
          >
            <img
              src={img}
              className="h-72 transition duration-500 
          brightness-90 saturate-75 group-hover:brightness-100 
          group-hover:saturate-100 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10" />
          </div>
        ))}
      </div>
    </div>
  );
}
export default PhotoCard;
