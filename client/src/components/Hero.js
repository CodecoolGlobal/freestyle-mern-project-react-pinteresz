import React , {useState} from 'react';



function Hero (){

    return(
        <div className='HeroComponent'>
            <div>  
            </div>
            <div className='introduction'>
                We have created a quiz game of the best movies of all time, your task is to guess the movie based on the provided hints.
                Once you guess the movie, you will recieve some points that will give you a rank on our leaderboard.
                In the future you will also be able to spend these points on perks, that will make your job easier.
                Have fun playing our quiz.
            </div>
        </div>
    )
}

export default Hero;