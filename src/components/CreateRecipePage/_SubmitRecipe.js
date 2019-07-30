import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import CardHeader from '@material-ui/core/CardHeader';

const _SubmitRecipe = () => {

    return (
        <MuiThemeProvider>
            <div className='d-flex justify-content-center'>
                <div className='text-center w-50'>
                    <CardHeader id='recipeCardHeader' title="You submitted your recipe!" style={{ backgroundColor: 'red', color: 'white' }} />
                </div>
            </div>
        </MuiThemeProvider>
    )
}

export default _SubmitRecipe