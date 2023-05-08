import React from 'react';
import './Header.css';
import Logo from './imgs/img_login.png';

interface IHeader {
    black:boolean;
}

const Header:React.FC<IHeader> = (props) => {
    return(
        <header className={props.black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Logo da Netflix" />
                </a>  
            </div>
            <div className='header--user'>
                <a href="/">
                    <img src={Logo} alt="Usuário" />
                </a>
            </div>
        </header>
    )
}

export default Header;