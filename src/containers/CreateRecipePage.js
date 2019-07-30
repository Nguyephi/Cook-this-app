import React from 'react'
import NavBar from '../components/NavBar'
import CreateRecipeForm from '../components/CreateRecipePage/CreateRecipeForm'

const CreateRecipePage = (props) => {
    return (
        <div>
            <NavBar {...props} />
            <div style={{ marginTop: '70px' }} className='container pt-5'>
                <CreateRecipeForm {...props} />
            </div>
        </div>
    )
}

export default CreateRecipePage
