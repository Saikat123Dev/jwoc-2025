import { useEffect,useState } from "react";
import "./Card.css";
export default function Card(){
    const [style, setStyle] = useState({});

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
  
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
  
      const xPercent = (x / rect.width - 0.5) * 2; // -1 to 1
      const yPercent = (y / rect.height - 0.5) * 2; // -1 to 1
  
      setStyle({
        transform: `rotateY(${xPercent * 15}deg) rotateX(${-yPercent * 15}deg)`,
      });
    };
  
    const handleMouseLeave = () => {
      setStyle({
        transform: "rotateY(0deg) rotateX(0deg)",
        transition: "transform 0.3s ease",
      });
    };
  
    return (
      <div className="card  m-4 " style={style} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <div className="card-content ">
            <h1>3D Card</h1>
            <p>Hover over me!</p>
          </div>
       
      </div>
    );
}