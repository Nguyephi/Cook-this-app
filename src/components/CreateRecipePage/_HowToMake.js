import React, { useState } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import CardHeader from '@material-ui/core/CardHeader';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

const _HowToMake = ({ values, nextStep, prevStep, dispatchInstructions, handleAddInstruction, localRecipe }) => {
    const [instruction, setInstruction] = useState('')


    const continueForm = (e) => {
        e.preventDefault();
        if (values.instructions.length > 0) {
            nextStep();
        } else alert('Please include instructions to make your recipe.')
    };

    const back = e => {
        e.preventDefault();
        prevStep();
    };

    // let localRecipe = localStorage.getItem('recipe')
    // localRecipe = JSON.parse(localRecipe)

    const clearInput = (e) => {
        handleAddInstruction(e, instruction)
        setInstruction('')
    }

    return (
        <MuiThemeProvider>
            <div className='d-flex justify-content-center'>
                <div className='text-center w-50'>
                    <CardHeader id='recipeCardHeader' title="How is it made?" style={{ backgroundColor: '#7C0B2B', color: 'white' }} />
                    <div className='container mt-4'>
                        <form onSubmit={(e) => clearInput(e)}>
                            <input
                                type="text"
                                id="addInstruction"
                                className="form-control mb-0"
                                placeholder="Add Instructions"
                                value={instruction}
                                onChange={(e) => setInstruction(e.target.value)}
                            />
                        </form>
                        <div className='mb-3 mt-1 container' style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <small className='pull-left grey-text'><i>type and press enter to add instruction to list.</i></small>{values.instructions.length > 0 && <small style={{ color: 'crimson' }} onClick={() => dispatchInstructions({ type: 'clear' })}>clear list</small>}
                        </div>
                        <ul className="list-group list-group-horizontal-xl mb-4" style={{ flexDirection: 'column'}}>
                            {values.instructions.map((instruction, idx) => (
                                <li key={instruction.id} className='list-group-item w-100'>
                                    <div className='d-flex' style={{ justifyContent: 'space-between' }}>
                                        <span>{instruction.name}</span>
                                        <small style={{ color: 'crimson', float: 'right' }} onClick={() => dispatchInstructions({ type: 'remove', idx })}>
                                            remove
                                        </small>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <br />
                    <RaisedButton
                        label="Back"
                        primary={false}
                        onClick={back}
                        style={{ marginRight: 15 }}
                    />
                    <RaisedButton
                        label="Continue"
                        primary={true}
                        onClick={continueForm}
                        style={{ marginLeft: 15 }}
                    />
                </div>
            </div>
        </MuiThemeProvider>
    )
}

export default _HowToMake