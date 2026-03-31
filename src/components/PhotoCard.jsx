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
  return (
    <div className="overflow-hidden w-full py-4 bg-black">
      <div className="flex gap-4 animate-scroll">

        <img src={img2} className="h-70" />
        <img src={img3} className="h-70" />
        <img src={img16} className="h-70" />
        <img src={img4} className="h-70" />        
        <img src={img7} className="h-70" />
        <img src={img9} className="h-70" />
        <img src={img10} className="h-70" />
        <img src={img12} className="h-70" />        
        <img src={img14} className="h-70" />
        <img src={img6} className="h-70" />
        <img src={img15} className="h-70" />
        <img src={img5} className="h-70" />
        <img src={img13} className="h-70" />        

        {/* duplicate */}
        <img src={img2} className="h-70" />
        <img src={img3} className="h-70" />
        <img src={img16} className="h-70" />
        <img src={img4} className="h-70" />        
        <img src={img7} className="h-70" />
        <img src={img9} className="h-70" />
        <img src={img10} className="h-70" />
        <img src={img12} className="h-70" />        
        <img src={img14} className="h-70" />
        <img src={img6} className="h-70" />
        <img src={img15} className="h-70" />
        <img src={img5} className="h-70" />
        <img src={img13} className="h-70" />
      </div>
    </div>
  );
}

export default PhotoCard;