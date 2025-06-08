import React from 'react'
import "./card.css"
const Card = ({setShow}) => {

    const handleStarted = () => {
        sessionStorage.setItem("started", "false");
        setShow(false);
    }

    return (
        <>
      <div className="card-container">
        <div className="upper-container">
          <div className="image-container">
            <img
              onClick={() => window.open("https://www.linkedin.com/in/iampavan/", "_blank")} 
              src="profilePic.jpeg"
              alt="profile"
            />
          </div>
        </div>

        <div className="lower-container">
          <div>
            <h3>Pavan Jadhav</h3>
            <h4>FullStack Developer</h4>
          </div>
          <div>
            <p>
              Enjoy being a code reviewer — enhance quality, share knowledge, and grow with every review.
            </p>
          </div>
          <div>
            <button className="btn" onClick={handleStarted}>
              Get Started{"->"}
            </button>
          </div>
        </div>
      </div>
    </>
    )
}

export default Card
