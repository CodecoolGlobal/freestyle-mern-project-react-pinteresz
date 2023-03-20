import React, { useState, useEffect } from 'react';

function PopUp({ text, hasOk, handleOk, handleYes, handleNo }) {

    return (
        <div className='PopUp'>
            <div className='PopUpText'>
                <p>{text}</p>
            </div>
            <div className='PopUpButton'>
                {hasOk ?
                    <button onClick={handleOk}>Ok</button> :
                    <>
                        <button onClick={handleYes}>Yes</button>
                        <button onClick={handleNo}>No</button>
                    </>
                }
            </div>
        </div>
    )
}




export default PopUp;