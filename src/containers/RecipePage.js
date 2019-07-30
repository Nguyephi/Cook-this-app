import React from "react"
// import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Recipe from '../components/RecipePage/Recipe'

const RecipePage = (props) => {
    return (
        <div>
            {/* <NavBar {...props} /> */}
            <Recipe {...props} />
            <div className='mt-5' >
                {/* <Footer  {...props} /> */}
            </div>
        </div>
    )
}

export default RecipePage