import React from 'react';
import './InfoContainer.css';

const InfoContainer = () => {
    return (
        <div className='info-container'>
            <h2>Macronutrient Calculator</h2>
            <p>
                Welcome to my free macro calculator! My macro calculator uses
                what I believe to be the most accurate formula for calculating
                your caloric intake. Simply enter your details below and receive
                your results.
            </p>
            <p>
                Keep in mind, this is simply an estimate and your exact
                requirements will most likely vary depending on some additional
                details which are unique to you.
            </p>
            <p>
                If you're looking to eliminate the uncertainty and get a
                custom-tailored meal plan that aligns perfectly with your macro
                goals, fill up the form and let us design one specifically for
                you.
            </p>
        </div>
    );
};

export default InfoContainer;
