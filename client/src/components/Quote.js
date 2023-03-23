import React, { useState, useEffect } from 'react';

function Quote({ text, handleOk,author }) {

    return (
        <div className='PopUp'>
            <div className='PopUpText'>
                <p className='NiceLetters'>{text}</p>
                <br></br>
                <p className='NiceLetters'>{author}</p>
            </div>
            <div className='PopUpButton'>
                    <button className='NiceLetters' onClick={handleOk}>Ok</button>
            </div>
        </div>
    )
}




export default Quote;