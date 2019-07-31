import React, { useState, useEffect } from 'react'
// import NavBar from '../components/NavBar'
import { RecipeCard } from '../components/HomePage/RecipeCard'
import { UserInfoCard } from '../components/HomePage/UserInfoCard'
import HomePageModal from '../components/HomePageModal'

const HomePage =
    ({
        isLogged, clearToken, user, recipes, token, handleModal, recipe, toggle, handleComment
    }) => {

        const [modal, setModal] = useState()

        return (
            <div>
                <div className='container pt-5'>
                    <div className='row' style={{ marginTop: 65 }}>
                        <div className="col-4">
                            <UserInfoCard user={user} recipes={recipes} />
                        </div>
                        <div className="col-8">
                            <RecipeCard
                                recipes={recipes}
                                token={token}
                                handleModal={handleModal}
                                toggle={toggle}
                                handleComment={handleComment}
                            />
                            { /* Add handleLikeClick */}
                        </div>
                    </div>
                </div>
                <a className="scrolltop" href="#"><span className="fa fa-angle-up"></span></a>
            </div >

        )
    }

export default HomePage