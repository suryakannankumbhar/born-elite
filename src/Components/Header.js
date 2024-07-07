import React from 'react';
import logo from '../Assets/logo.png';

export default function Header() {
    return (
        <div style={styles.headerContainer}>
            <img src={logo} alt='Logo' style={styles.logo} />
            <div style={styles.companyInfo}>
                <h1 style={styles.title}>Born Elite</h1>
                <p style={styles.tagline}>From Potential To Peak</p>
            </div>
            <div style={styles.placeholder}></div>
        </div>
    );
}

const styles = {
    headerContainer: {
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#105A63',
    },
    logo: {
        height: '50px',
        marginRight: '15px',
    },
    companyInfo: {
        flex: 1,
        textAlign: 'center',
    },
    title: {
        fontSize: '35px',
        margin: '0',
        color: '#ffffff',
        fontFamily: 'Playfair Display, Serif',
    },
    tagline: {
        fontSize: '20px',
        margin: '0',
        color: '#ffffff',
        fontFamily: 'Playfair Display, Serif',
    },
    placeholder: {
        width: '65px',
    },
};
