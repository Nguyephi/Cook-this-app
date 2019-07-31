import React, { useState, useEffect } from 'react'
import Dropzone from "react-dropzone";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CardHeader from '@material-ui/core/CardHeader';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import CreateRecipeForm from './CreateRecipeForm';

const _TitleAndIngredients = ({ values, handleChange, nextStep, dispatchIngredients, handleAddIngredient, handleAddQuantity, handleImgDrop, imgUrl }) => {
    const [ingredient, setIngredient] = useState('')
    const [quantity, setQuantity] = useState('')

    const continueForm = (e) => {
        e.preventDefault();
        if (values.title.length > 0 && values.ingredients.length > 0 && values.imgUrl.length > 0) {
            nextStep();
        } else alert("Please include a title and an image to your recipe and have at least one ingredient (don't forget to hit enter to add your ingredient).")
    };

    const clearIngredientInput = (e) => {
        e.preventDefault()
        setIngredient('')
    }

    const clearQuantityInput = (e) => {
        e.preventDefault()
        setQuantity('')
    }

    const handleSubmit = () => {
        handleAddIngredient(ingredient, quantity)
        setIngredient('')
        setQuantity('')
    }


    return (
        <MuiThemeProvider>
            <div className='d-flex justify-content-center'>
                <div className='text-center w-50'>
                    <CardHeader id='recipeCardHeader' title="Recipe info" style={{ backgroundColor: '#7C0B2B', color: 'white' }} />
                    <div className='container mt-4'>
                        <input
                            type="text"
                            id="addTitle"
                            className="form-control mb-0"
                            placeholder="Recipe Title"
                            value={values.title}
                            onChange={handleChange('title')}
                        />
                    </div>
                    <div className='container mt-4'>
                        <Dropzone
                            onDrop={handleImgDrop}
                            accept="image/*"
                            multiple={false}
                        >
                            {({ getRootProps, getInputProps }) => {
                                return (
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {values.imgUrl
                                            ?
                                            (
                                                <div style={{ height: 300, display: 'flex', justifyContent: 'center', alignItems: 'center', border: "1px solid rgba(0, 0, 0, 0.23)", borderRadius: "4px" }}>
                                                    <img
                                                        width="50%"
                                                        height="90%"
                                                        src={values.imgUrl}
                                                    />
                                                </div>
                                            )
                                            :
                                            <div style={{ width: "100%", height: 300, justifyContent: "center", alignItems: "center", display: "flex", border: "1px solid rgba(0, 0, 0, 0.23)", borderRadius: "4px" }}>
                                                <a style={{ color: 'lightgrey', textAlign: 'center' }}>
                                                    <i className="fas fa-camera-retro" />
                                                    &nbsp;
                                                    <strong>Drag or click here to upload you image</strong>
                                                </a>
                                            </div>}
                                    </div>
                                );
                            }}
                        </Dropzone>
                    </div>
                    <br />
                    <div className='container mt-4'>
                        <textarea
                            rows={3}
                            placeholder="Add Description"
                            onChange={handleChange('description')}
                            value={values.description}
                            className="form-control mb-0"
                        />
                        <br />
                        <form onSubmit={handleSubmit}>
                            <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                <div className='w-100'>
                                    <form onSubmit={(e) => clearIngredientInput(e)} >
                                        <input
                                            type="text"
                                            id="addIngredient"
                                            className="form-control mb-0"
                                            placeholder="Add Ingredients"
                                            value={ingredient}
                                            onChange={(e) => setIngredient(e.target.value)}
                                        />
                                    </form>
                                </div>
                                {ingredient &&
                                    <form onSubmit={(e) => clearQuantityInput(e)} className='d-flex'>
                                        <div style={{ width: '7em' }} className='pl-2'>
                                            <input
                                                type="text"
                                                id="include quantity"
                                                className="form-control mb-0"
                                                placeholder="Quantity"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                            />
                                        </div>
                                    </form>}
                            </div>
                        </form>
                        <div className='mb-3 mt-1 container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <small className='pull-left grey-text'><i>type and press enter to add ingredient to list.</i></small>{values.ingredients.length > 0 && <small style={{ color: 'crimson' }} onClick={() => dispatchIngredients({ type: 'clear' })}>clear list</small>}
                        </div>
                        <ul className="list-group mb-4">
                            {values.ingredients.map((ingredient, idx) => (
                                <li key={ingredient.id} className='list-group-item'>
                                    <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                        <div>
                                            {ingredient.quantity &&
                                                <span style={{ fontWeight: 500 }} className='h5 mb-0 pr-2'>{ingredient.quantity} -</span>}
                                            <span style={{ fontWeight: 500 }} className='h5 mb-0'>{ingredient.name}</span>
                                        </div>
                                        <small style={{ color: 'crimson', float: 'right' }} onClick={() => dispatchIngredients({ type: 'remove', idx })}>
                                            remove
                                        </small>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <br />
                    <RaisedButton
                        label="Continue"
                        primary={true}
                        onClick={continueForm}
                    />
                </div>
            </div>
        </MuiThemeProvider>
    )
}


export default _TitleAndIngredients