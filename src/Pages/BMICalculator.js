import React from 'react';
import Header from '../Components/Header';
import { Form } from '../Components/Form';
import './BMICalculator.css';
import InfoContainer from '../Components/InfoContainer';

export default function BMICalculator() {
    return (
        <div className='bmi-calculator-container'>
            <Header />
            <InfoContainer />
            <Form />
        </div>
    );
}
