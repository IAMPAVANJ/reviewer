import React from 'react'
import "./InstructionCard.css";
const InstructionCard = () => {
    return (
        <main className="l-card">
            <section className="l-card__user">
                <div className="l-card__userImage">
                    <img onClick={() => window.open("https://www.linkedin.com/in/iampavan/", "_blank")} src="reviewer.png" alt="Pavan" />
                </div>
                <div className="l-card__userInfo">
                    <span onClick={() => window.open("https://www.linkedin.com/in/iampavan/", "_blank")}>Code Reviewer</span>
                    <span onClick={() => window.open("https://www.linkedin.com/in/iampavan/", "_blank")}>Review Code using AI</span>
                </div>
            </section>
            <section className="l-card__text">
                <p>
                    Paste Your code in the left editor and click on the "Review Code" button to get a review of your code.
                </p>
            </section>
        </main>
    )
}

export default InstructionCard;
