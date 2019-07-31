import React, { useState } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

const _ConfirmRecipe = ({ values, nextStep, prevStep, dispatchIngredients, dispatchInstructions, token }) => {

    const { title, ingredients, instructions, description, imgUrl } = values

    const continueForm = (e) => {
        e.preventDefault();
        postRecipe()
    };

    const postRecipe = async () => {
        const response = await fetch('https://cook-this-by-phil.herokuapp.com/createrecipe', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }),
            body: JSON.stringify({
                'title': `${values.title}`,
                'ingredients': values.ingredients,
                'instructions': values.instructions,
                'description': `${values.description}`,
                'imgUrl': `${values.imgUrl}`
            })
        })
        const result = await response.json()
        localStorage.removeItem('recipe')
        window.location.replace("https://cookthis.netlify.com")

    }

    const back = e => {
        e.preventDefault();
        prevStep();
    };

    return (
        <MuiThemeProvider>
            <div className='d-flex justify-content-center'>
                <div className='text-center w-50'>
                    <CardHeader id='recipeCardHeader' title="Confirm your recipe" style={{ backgroundColor: 'red', color: 'white' }} />
                    <Card>
                        <CardContent>
                            <div className='container mt-4'>
                                <div>
                                    <p className='h3 mb-3'>Recipe Title: </p>
                                    <p className='h3' style={{ color: 'lightGrey' }}>
                                        {title}
                                    </p>
                                </div>
                                <hr className='w-75 pb-4 mt-2' />
                                <div className='mb-4' style={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', border: "1px solid rgba(0, 0, 0, 0.23)", borderRadius: "4px" }}>
                                    <img
                                        width="50%"
                                        height="90%"
                                        src={imgUrl}
                                    />
                                </div>
                                {/* <hr className='w-75 pb-4 mt-2' /> */}
                                <p className='h5 pb-3 pb-0 mb-0'>Description: </p>
                                <p>
                                    {description}
                                </p>
                                <hr className='w-75 pb-4 mt-2' />
                                <p className='h5 pb-3'>Your recipe's ingredient: </p>
                                <ul className="list-group list-group-flush pb-4">
                                    {ingredients.map((ingredient, idx) => (
                                        <li className='list-group-item' key={ingredient.id} className='list-group-item'>
                                            {ingredient.quantity && <span>{ingredient.quantity} - </span>}
                                            <span>{ingredient.name}</span>
                                            <small style={{ color: 'crimson', float: 'right' }} onClick={() => dispatchIngredients({ type: 'remove', idx })}>remove</small></li>
                                    ))}
                                </ul>
                                <p className='h5 pb-3'>Here's how you make your recipe: </p>
                                <ul className="list-group list-group-flush pb-3">
                                    {instructions.map((instruction, idx) => (
                                        <li className='list-group-item' key={instruction.id} className='list-group-item'><span>{instruction.name}</span><small style={{ color: 'crimson', float: 'right' }} onClick={() => dispatchInstructions({ type: 'remove', idx })}>remove</small></li>
                                    ))}
                                </ul>
                                <br />
                                <RaisedButton
                                    label="Back"
                                    primary={false}
                                    onClick={back}
                                    style={{ marginRight: 15 }}
                                />
                                <RaisedButton
                                    label="Submit"
                                    primary={true}
                                    onClick={continueForm}
                                    style={{ marginLeft: 15 }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </MuiThemeProvider >
    )
}

export default _ConfirmRecipe