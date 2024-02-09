import React from 'react';
import illustration from 'assets/Illustration.svg'
import {Typography} from "@mui/material";
import BoardList from 'component/modules/board-list';

function Home() {
    return (
        <div className='container h-center'>
            <BoardList/>
        </div>
    );
}

export default Home;