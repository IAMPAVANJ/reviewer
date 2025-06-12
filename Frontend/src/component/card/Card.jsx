import React from 'react'
import "./card.css"
import Loader from '../Loader/loader';
const Card = ({serverConnection, maxTry, setShow}) => {

    const handleStarted = () => {
      if(maxTry){
        window.location.reload();
      }
      if(serverConnection){
        sessionStorage.setItem("started", "false");
        setShow(false);
      }
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
                {maxTry
                  ? "Connection Failed ⟲"
                  : serverConnection
                    ? "Get Started →"
                    : (
                      <span>
                        Connecting Server...<Loader/>
                      </span>
                    )
                }
              </button>
          </div>
        </div>
      </div>
    </>
    )
}

export default Card
