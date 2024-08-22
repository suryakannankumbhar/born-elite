// import React, { useState, useRef } from 'react';
// import emailjs from '@emailjs/browser';
// import './Form.css';

// const Modal = ({ isOpen, onClose, children }) => {
//     if (!isOpen) return null;

//     return (
//         <div className='modal-overlay'>
//             <div className='modal-content'>
//                 {children}
//                 <button onClick={onClose} className='modal-close-button'>
//                     Close
//                 </button>
//             </div>
//         </div>
//     );
// };

// export const Form = () => {
//     const form = useRef();
//     const [sex, setSex] = useState('');
//     const [activity, setActivity] = useState('');
//     const [goal, setGoal] = useState('');
//     const [sportsGoal, setSportsGoal] = useState('');
//     const [showModal, setShowModal] = useState(false);

//     const activityLevels = {
//         1.2: 'Little or no exercise',
//         1.375: 'Light exercise/sports 1-3 days/week',
//         1.55: 'Moderate exercise/sports 3-5 days/week',
//         1.725: 'Hard exercise/sports 6-7 days/week',
//         1.9: 'Very hard exercise/sports & physical job or training 2x per day',
//     };

//     const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
//     const formatGoal = goal => {
//         if (goal === 'maintain') return 'Maintain Weight';
//         if (goal === 'fat_loss') return 'Fat Loss';
//         if (goal === 'muscle_gain') return 'Muscle Gain';
//         if (goal === 'sports') return `Sports - ${capitalize(sportsGoal)}`;
//         return '';
//     };

//     const sendEmail = e => {
//         e.preventDefault();

//         const formData = new FormData(form.current);
//         const heightCm = parseFloat(formData.get('height'));
//         const weight = parseFloat(formData.get('weight'));
//         const sex = formData.get('sex');
//         const age = parseInt(formData.get('age'));
//         const activityFactor = formData.get('activity');
//         const goal = formData.get('goal');
//         const sportsGoal = formData.get('sports_goal');

//         const heightM = heightCm / 100;
//         const bmi = (weight / (heightM * heightM)).toFixed(2);

//         let ageGroup = 'adults';
//         if (age < 18) {
//             ageGroup = 'children';
//         } else if (age >= 65) {
//             ageGroup = 'seniors';
//         }

//         const bmiRanges = {
//             male: {
//                 children: {
//                     Underweight: [0, 18.5],
//                     Normal: [18.5, 24.9],
//                     Overweight: [25, 29.9],
//                     Obesity: [30, 100],
//                 },
//                 adults: {
//                     Underweight: [0, 18.5],
//                     Normal: [18.5, 24.9],
//                     Overweight: [25, 29.9],
//                     Obesity: [30, 100],
//                 },
//                 seniors: {
//                     Underweight: [0, 22],
//                     Normal: [22, 27],
//                     Overweight: [27, 30],
//                     Obesity: [30, 100],
//                 },
//             },
//             female: {
//                 children: {
//                     Underweight: [0, 18.5],
//                     Normal: [18.5, 24.9],
//                     Overweight: [25, 29.9],
//                     Obesity: [30, 100],
//                 },
//                 adults: {
//                     Underweight: [0, 18.5],
//                     Normal: [18.5, 24.9],
//                     Overweight: [25, 29.9],
//                     Obesity: [30, 100],
//                 },
//                 seniors: {
//                     Underweight: [0, 22],
//                     Normal: [22, 27],
//                     Overweight: [27, 30],
//                     Obesity: [30, 100],
//                 },
//             },
//         };

//         const bmiCategory = Object.keys(bmiRanges[sex][ageGroup]).find(
//             category =>
//                 bmi >= bmiRanges[sex][ageGroup][category][0] &&
//                 bmi < bmiRanges[sex][ageGroup][category][1]
//         );

//         let bmr;
//         if (sex === 'male') {
//             bmr = 66.5 + 13.75 * weight + 5.003 * heightCm - 6.75 * age;
//         } else {
//             bmr = 655.1 + 9.563 * weight + 1.85 * heightCm - 4.676 * age;
//         }

//         const tdee = (bmr * parseFloat(activityFactor)).toFixed(2);
//         const activityDescription = activityLevels[activityFactor];

//         const goalDescription = formatGoal(goal);

//         form.current.querySelector(
//             'input[name="message"]'
//         ).value = `Your target calories are ${tdee} calories per day\n
//         Body Mass Index (BMI): ${bmi}
//         BMI Classification: ${bmiCategory}
//         Basal Metabolic Rate (BMR): ${bmr}\n
//         Macros: \n
//         Your Parameters:
//         Sex: ${capitalize(sex)}
//         Age: ${age}
//         Height: ${heightCm}
//         Weight: ${weight}
//         Activity Level: ${activityLevels[activityFactor]}
//         Goal: ${goalDescription}`;

//         emailjs
//             .sendForm('service_gmzpblp', 'template_qthku2k', form.current, {
//                 publicKey: 'fChZaMwU22ZfE1Sqk',
//             })
//             .then(
//                 () => {
//                     console.log('SUCCESS!');
//                     // Clear all form fields
//                     form.current.reset();
//                     setSex('');
//                     setActivity('');
//                     setGoal('');
//                     setSportsGoal('');
//                     // Show the modal
//                     setShowModal(true);
//                 },
//                 error => {
//                     console.log('FAILED...', error.text);
//                 }
//             );
//     };

//     return (
//         <div className='form-container'>
//             <form ref={form} onSubmit={sendEmail} className='contact-form'>
//                 <div className='form-group'>
//                     <label>Name</label>
//                     <input
//                         type='text'
//                         name='user_name'
//                         className='input-field'
//                         required
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label>Email</label>
//                     <input
//                         type='email'
//                         name='user_email'
//                         className='input-field'
//                         required
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label>Sex</label>
//                     <div className='button-group'>
//                         <button
//                             type='button'
//                             className={`button-option ${
//                                 sex === 'male' ? 'selected' : ''
//                             }`}
//                             onClick={() => setSex('male')}
//                         >
//                             Male
//                         </button>
//                         <button
//                             type='button'
//                             className={`button-option ${
//                                 sex === 'female' ? 'selected' : ''
//                             }`}
//                             onClick={() => setSex('female')}
//                         >
//                             Female
//                         </button>
//                     </div>
//                 </div>
//                 <div className='form-group'>
//                     <label>Age</label>
//                     <input
//                         type='number'
//                         name='age'
//                         className='input-field'
//                         required
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label>Height (cm)</label>
//                     <input
//                         type='number'
//                         step='0.1'
//                         name='height'
//                         className='input-field'
//                         required
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label>Weight (kg)</label>
//                     <input
//                         type='number'
//                         step='0.1'
//                         name='weight'
//                         className='input-field'
//                         required
//                     />
//                 </div>
//                 <div className='form-group'>
//                     <label>Activity Level</label>
//                     <div className='button-group'>
//                         <button
//                             type='button'
//                             className={`button-option ${
//                                 activity === '1.2' ? 'selected' : ''
//                             }`}
//                             onClick={() => setActivity('1.2')}
//                         >
//                             Little or no exercise
//                         </button>
//                         <button
//                             type='button'
//                             className={`button-option ${
//                                 activity === '1.375' ? 'selected' : ''
//                             }`}
//                             onClick={() => setActivity('1.375')}
//                         >
//                             Light exercise
//                         </button>
//                         <button
//                             type='button'
//                             className={`button-option ${
//                                 activity === '1.55' ? 'selected' : ''
//                             }`}
//                             onClick={() => setActivity('1.55')}
//                         >
//                             Moderate exercise
//                         </button>
//                         <button
//                             type='button'
//                             className={`button-option ${
//                                 activity === '1.725' ? 'selected' : ''
//                             }`}
//                             onClick={() => setActivity('1.725')}
//                         >
//                             Hard exercise
//                         </button>
//                         <button
//                             type='button'
//                             className={`button-option ${
//                                 activity === '1.9' ? 'selected' : ''
//                             }`}
//                             onClick={() => setActivity('1.9')}
//                         >
//                             Very hard exercise
//                         </button>
//                     </div>
//                 </div>
//                 <div className='form-group'>
//                     <label>Goal</label>
//                     <div className='button-group'>
//                         <button
//                             type='button'
//                             className={`button-option ${
//                                 goal === 'maintain' ? 'selected' : ''
//                             }`}
//                             onClick={() => setGoal('maintain')}
//                         >
//                             Maintain Weight
//                         </button>
//                         <button
//                             type='button'
//                             className={`button-option ${
//                                 goal === 'fat_loss' ? 'selected' : ''
//                             }`}
//                             onClick={() => setGoal('fat_loss')}
//                         >
//                             Fat Loss
//                         </button>
//                         <button
//                             type='button'
//                             className={`button-option ${
//                                 goal === 'muscle_gain' ? 'selected' : ''
//                             }`}
//                             onClick={() => setGoal('muscle_gain')}
//                         >
//                             Muscle Gain
//                         </button>
//                         <button
//                             type='button'
//                             className={`button-option ${
//                                 goal === 'sports' ? 'selected' : ''
//                             }`}
//                             onClick={() => setGoal('sports')}
//                         >
//                             Sports
//                         </button>
//                     </div>
//                 </div>
//                 {goal === 'sports' && (
//                     <div className='form-group'>
//                         <label>Sports Goal</label>
//                         <div className='button-group'>
//                             <button
//                                 type='button'
//                                 className={`button-option ${
//                                     sportsGoal === 'endurance' ? 'selected' : ''
//                                 }`}
//                                 onClick={() => setSportsGoal('endurance')}
//                             >
//                                 Endurance
//                             </button>
//                             <button
//                                 type='button'
//                                 className={`button-option ${
//                                     sportsGoal === 'strength' ? 'selected' : ''
//                                 }`}
//                                 onClick={() => setSportsGoal('strength')}
//                             >
//                                 Strength
//                             </button>
//                         </div>
//                     </div>
//                 )}
//                 <input type='hidden' name='sex' value={sex} />
//                 <input type='hidden' name='activity' value={activity} />
//                 <input type='hidden' name='goal' value={goal} />
//                 <input type='hidden' name='sports_goal' value={sportsGoal} />
//                 <input type='hidden' name='message' value='' />
//                 <div className='form-group'>
//                     <input
//                         type='submit'
//                         value='Get Your Results'
//                         className='submit-button'
//                     />
//                 </div>
//             </form>
//             <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
//                 <h2>Data Collected</h2>
//                 <p>Check your mail.</p>
//             </Modal>
//         </div>
//     );
// };
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './Form.css';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                {children}
                <button onClick={onClose} className='modal-close-button'>
                    Close
                </button>
            </div>
        </div>
    );
};

export const Form = () => {
    const form = useRef();
    const [sex, setSex] = useState('');
    const [activity, setActivity] = useState('');
    const [goal, setGoal] = useState('');
    const [sportsGoal, setSportsGoal] = useState('');
    const [showModal, setShowModal] = useState(false);

    const activityLevels = {
        1.2: 'Little or no exercise',
        1.375: 'Light exercise/sports 1-3 days/week',
        1.55: 'Moderate exercise/sports 3-5 days/week',
        1.725: 'Hard exercise/sports 6-7 days/week',
        1.9: 'Very hard exercise/sports & physical job or training 2x per day',
    };

    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
    const formatGoal = goal => {
        if (goal === 'maintain') return 'Maintain Weight';
        if (goal === 'fat_loss') return 'Fat Loss';
        if (goal === 'muscle_gain') return 'Muscle Gain';
        if (goal === 'sports') return `Sports - ${capitalize(sportsGoal)}`;
        return '';
    };

    const calculateMacros = (
        sex,
        heightCm,
        weight,
        activityFactor,
        goal,
        sportsGoal,
        tdee
    ) => {
        const idealBodyWeight =
            sex === 'male' ? heightCm - 100 : heightCm - 105;
        let proteinGrams, fatGrams, carbsGrams;

        if (goal === 'sports') {
            if (sportsGoal === 'endurance') {
                proteinGrams = 2 * idealBodyWeight;
                fatGrams = 1.5 * idealBodyWeight;
                carbsGrams = 12 * idealBodyWeight;
            } else if (sportsGoal === 'strength') {
                proteinGrams = 1.8 * idealBodyWeight;
                fatGrams = 2 * idealBodyWeight;
                carbsGrams = 7 * idealBodyWeight;
            }
        } else {
            let proteinFactor;
            switch (goal) {
                case 'fat_loss':
                    if (activityFactor === '1.2') proteinFactor = 1.2;
                    else if (activityFactor === '1.375') proteinFactor = 1.3;
                    else if (activityFactor === '1.55') proteinFactor = 1.55;
                    else if (activityFactor === '1.725') proteinFactor = 1.75;
                    else if (activityFactor === '1.9') proteinFactor = 2;
                    break;
                case 'maintain':
                    if (activityFactor === '1.2') proteinFactor = 1.2;
                    else if (activityFactor === '1.375') proteinFactor = 1.35;
                    else if (activityFactor === '1.55') proteinFactor = 1.625;
                    else if (activityFactor === '1.725') proteinFactor = 1.825;
                    else if (activityFactor === '1.9') proteinFactor = 2.2;
                    break;
                case 'muscle_gain':
                    if (activityFactor === '1.2') proteinFactor = 1.2;
                    else if (activityFactor === '1.375') proteinFactor = 1.4;
                    else if (activityFactor === '1.55') proteinFactor = 1.7;
                    else if (activityFactor === '1.725') proteinFactor = 1.9;
                    else if (activityFactor === '1.9') proteinFactor = 2.4;
                    break;
                default:
                    proteinFactor = 1.2;
                    break;
            }

            proteinGrams = idealBodyWeight * proteinFactor;
            const proteinCalories = proteinGrams * 4;

            const fatPercentage =
                goal === 'fat_loss' ? 0.2 : goal === 'maintain' ? 0.3 : 0.4;
            const fatCalories = fatPercentage * tdee;

            const carbsCalories = tdee - (proteinCalories + fatCalories);
            carbsGrams = carbsCalories / 4;
            fatGrams = fatCalories / 9;
        }

        return { proteinGrams, fatGrams, carbsGrams };
    };

    const sendEmail = e => {
        e.preventDefault();

        const formData = new FormData(form.current);
        const heightCm = parseFloat(formData.get('height'));
        const weight = parseFloat(formData.get('weight'));
        const sex = formData.get('sex');
        const age = parseInt(formData.get('age'));
        const activityFactor = formData.get('activity');
        const goal = formData.get('goal');
        const sportsGoal = formData.get('sports_goal');

        const heightM = heightCm / 100;
        const bmi = (weight / (heightM * heightM)).toFixed(2);

        let ageGroup = 'adults';
        if (age < 18) {
            ageGroup = 'children';
        } else if (age >= 65) {
            ageGroup = 'seniors';
        }

        const bmiRanges = {
            male: {
                children: {
                    Underweight: [0, 18.5],
                    Normal: [18.5, 24.9],
                    Overweight: [25, 29.9],
                    Obesity: [30, 100],
                },
                adults: {
                    Underweight: [0, 18.5],
                    Normal: [18.5, 24.9],
                    Overweight: [25, 29.9],
                    Obesity: [30, 100],
                },
                seniors: {
                    Underweight: [0, 22],
                    Normal: [22, 27],
                    Overweight: [27, 30],
                    Obesity: [30, 100],
                },
            },
            female: {
                children: {
                    Underweight: [0, 18.5],
                    Normal: [18.5, 24.9],
                    Overweight: [25, 29.9],
                    Obesity: [30, 100],
                },
                adults: {
                    Underweight: [0, 18.5],
                    Normal: [18.5, 24.9],
                    Overweight: [25, 29.9],
                    Obesity: [30, 100],
                },
                seniors: {
                    Underweight: [0, 22],
                    Normal: [22, 27],
                    Overweight: [27, 30],
                    Obesity: [30, 100],
                },
            },
        };

        const bmiCategory = Object.keys(bmiRanges[sex][ageGroup]).find(
            category =>
                bmi >= bmiRanges[sex][ageGroup][category][0] &&
                bmi < bmiRanges[sex][ageGroup][category][1]
        );

        let bmr;
        if (sex === 'male') {
            bmr = 66.5 + 13.75 * weight + 5.003 * heightCm - 6.75 * age;
        } else {
            bmr = 655.1 + 9.563 * weight + 1.85 * heightCm - 4.676 * age;
        }

        const tdee = (bmr * parseFloat(activityFactor)).toFixed(2);
        const activityDescription = activityLevels[activityFactor];
        const goalDescription = formatGoal(goal);

        const { proteinGrams, fatGrams, carbsGrams } = calculateMacros(
            sex,
            heightCm,
            weight,
            activityFactor,
            goal,
            sportsGoal,
            tdee
        );

        form.current.querySelector(
            'input[name="message"]'
        ).value = `Your target calories are ${tdee} calories per day\n
        Body Mass Index (BMI): ${bmi}
        BMI Classification: ${bmiCategory}
        Basal Metabolic Rate (BMR): ${bmr}\n
        Macros: \n
        Protein: ${proteinGrams.toFixed(2)}g (${(proteinGrams * 4).toFixed(
            2
        )} calories)
        Fat: ${fatGrams.toFixed(2)}g (${(fatGrams * 9).toFixed(2)} calories)
        Carbs: ${carbsGrams.toFixed(2)}g (${(carbsGrams * 4).toFixed(
            2
        )} calories)
        \n
        Your Parameters:
        Sex: ${capitalize(sex)}
        Age: ${age}
        Height: ${heightCm}
        Weight: ${weight}
        Activity Level: ${activityLevels[activityFactor]}
        Goal: ${goalDescription}`;

        emailjs
            .sendForm('service_i8gecjg', 'template_0k4zbn9', form.current, {
                publicKey: 'AnuL5mA5GOkuA08Ku',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    // Clear all form fields
                    form.current.reset();
                    setSex('');
                    setActivity('');
                    setGoal('');
                    setSportsGoal('');
                    // Show the modal
                    setShowModal(true);
                },
                error => {
                    console.log('FAILED...', error.text);
                }
            );
    };

    return (
        <div className='form-container'>
            <form ref={form} onSubmit={sendEmail} className='contact-form'>
                <div className='form-group'>
                    <label>Name</label>
                    <input
                        type='text'
                        name='user_name'
                        className='input-field'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input
                        type='email'
                        name='user_email'
                        className='input-field'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Sex</label>
                    <div className='button-group'>
                        <button
                            type='button'
                            className={`button-option ${
                                sex === 'male' ? 'selected' : ''
                            }`}
                            onClick={() => setSex('male')}
                        >
                            Male
                        </button>
                        <button
                            type='button'
                            className={`button-option ${
                                sex === 'female' ? 'selected' : ''
                            }`}
                            onClick={() => setSex('female')}
                        >
                            Female
                        </button>
                    </div>
                </div>
                <div className='form-group'>
                    <label>Age</label>
                    <input
                        type='number'
                        name='age'
                        className='input-field'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Height (cm)</label>
                    <input
                        type='number'
                        step='0.1'
                        name='height'
                        className='input-field'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Weight (kg)</label>
                    <input
                        type='number'
                        step='0.1'
                        name='weight'
                        className='input-field'
                        required
                    />
                </div>
                <div className='form-group'>
                    <label>Activity Level</label>
                    <div className='button-group'>
                        <button
                            type='button'
                            className={`button-option ${
                                activity === '1.2' ? 'selected' : ''
                            }`}
                            onClick={() => setActivity('1.2')}
                        >
                            Little or no exercise
                        </button>
                        <button
                            type='button'
                            className={`button-option ${
                                activity === '1.375' ? 'selected' : ''
                            }`}
                            onClick={() => setActivity('1.375')}
                        >
                            Light exercise
                        </button>
                        <button
                            type='button'
                            className={`button-option ${
                                activity === '1.55' ? 'selected' : ''
                            }`}
                            onClick={() => setActivity('1.55')}
                        >
                            Moderate exercise
                        </button>
                        <button
                            type='button'
                            className={`button-option ${
                                activity === '1.725' ? 'selected' : ''
                            }`}
                            onClick={() => setActivity('1.725')}
                        >
                            Hard exercise
                        </button>
                        <button
                            type='button'
                            className={`button-option ${
                                activity === '1.9' ? 'selected' : ''
                            }`}
                            onClick={() => setActivity('1.9')}
                        >
                            Very hard exercise
                        </button>
                    </div>
                </div>
                <div className='form-group'>
                    <label>Goal</label>
                    <div className='button-group'>
                        <button
                            type='button'
                            className={`button-option ${
                                goal === 'maintain' ? 'selected' : ''
                            }`}
                            onClick={() => setGoal('maintain')}
                        >
                            Maintain Weight
                        </button>
                        <button
                            type='button'
                            className={`button-option ${
                                goal === 'fat_loss' ? 'selected' : ''
                            }`}
                            onClick={() => setGoal('fat_loss')}
                        >
                            Fat Loss
                        </button>
                        <button
                            type='button'
                            className={`button-option ${
                                goal === 'muscle_gain' ? 'selected' : ''
                            }`}
                            onClick={() => setGoal('muscle_gain')}
                        >
                            Muscle Gain
                        </button>
                        <button
                            type='button'
                            className={`button-option ${
                                goal === 'sports' ? 'selected' : ''
                            }`}
                            onClick={() => setGoal('sports')}
                        >
                            Sports
                        </button>
                    </div>
                </div>
                {goal === 'sports' && (
                    <div className='form-group'>
                        <label>Sport Type</label>
                        <div className='button-group'>
                            <button
                                type='button'
                                className={`button-option ${
                                    sportsGoal === 'endurance' ? 'selected' : ''
                                }`}
                                onClick={() => setSportsGoal('endurance')}
                            >
                                Endurance
                            </button>
                            <button
                                type='button'
                                className={`button-option ${
                                    sportsGoal === 'strength' ? 'selected' : ''
                                }`}
                                onClick={() => setSportsGoal('strength')}
                            >
                                Strength
                            </button>
                        </div>
                    </div>
                )}
                <input type='hidden' name='sex' value={sex} />
                <input type='hidden' name='activity' value={activity} />
                <input type='hidden' name='goal' value={goal} />
                <input type='hidden' name='sports_goal' value={sportsGoal} />
                <input type='hidden' name='message' value='' />
                <div className='form-group'>
                    <input
                        type='submit'
                        value='Get Your Results'
                        className='submit-button'
                    />
                </div>
            </form>
            <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <h2>Data Collected</h2>
                <p>Check your mail.</p>
            </Modal>
        </div>
    );
};
