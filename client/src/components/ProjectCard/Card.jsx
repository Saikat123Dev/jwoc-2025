import { useState } from "react";
import "./Card.css";

export default function Card({data}){
    const [style, setStyle] = useState({});

    const handleMouseMove = (e) => {
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
 
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
 
      const xPercent = (x / rect.width - 0.5) * 2; 
      const yPercent = (y / rect.height - 0.5) * 2; 
 
      setStyle({
        transform: `rotateY(${xPercent * 15}deg) rotateX(${-yPercent * 15}deg)`,
        backgroundColor: 'rgba(27, 51, 95, 1)'
      });
    };
 
    const handleMouseLeave = () => {
      setStyle({
       
        transform: "rotateY(0deg) rotateX(0deg)",
        transition: "transform 0.3s ease",
        backgroundColor: 'rgba(27, 51, 95, 0.8)'
      });
    };
 
    return (
      <div 
        className="card m-4" 
     
        style={style} 
        onMouseMove={handleMouseMove} 
        onMouseLeave={handleMouseLeave}
      >
        <div className="card-content">
          <h2 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '12px',
            color: '#ffffff',
          }}>
            {data.projectName}
          </h2>
          <p style={{
            color: '#b0d0ff',
            marginBottom: '15px',
            lineHeight: '1.5',
            fontSize: '14px',
            height: '60px',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {data.projectDescription}
          </p>
          <div style={{
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center'
          }}>
            <span style={{
              fontWeight: '600',
              marginRight: '8px',
              color: '#7FB3D5',
              fontSize: '14px'
            }}>
              Type:
            </span>
            <span style={{
              color: '#A9CCE3',
              fontSize: '14px'
            }}>
              {data.projectTypes}
            </span>
          </div>

          {/* Project Link */}
          <div style={{
            marginBottom: '10px'
          }}>
            <a 
              href={data.projectLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{
                color: '#5DADE2',
                textDecoration: 'none',
                fontSize: '14px',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#85C1E9'}
              onMouseOut={(e) => e.target.style.color = '#5DADE2'}
            >
              View Project
            </a>
          </div>
          <div style={{ marginTop: '10px' }}>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px'
            }}>
              {data.projectTags.map((tag, index) => (
                <span 
                  key={index} 
                  style={{
                    backgroundColor: 'rgba(41, 128, 185, 0.3)',
                    color: '#AED6F1',
                    padding: '3px 8px',
                    borderRadius: '12px',
                    fontSize: '10px',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
}