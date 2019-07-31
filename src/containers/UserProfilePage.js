import React, { useState, useEffect } from 'react'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

const defaultPP = require('../assets/img/default.png')

const UserProfilePage = ({ isLogged, clearToken, user, token, toggleSubscriber, toggleSubscribing, recipes }) => {
 
    const postImgMap = () => {
        let myRecipe = []
        recipes.map(i => {
            if (user.id === i.creator_id) {
                myRecipe.push(i)
            }
        })
        return myRecipe.map(i => {
            if (myRecipe.length > 0) {
                return (<div className='m-3 d-flex'>
                    <img src={i.imgUrl} style={{ width: 250, height: 250 }} />
                </div>)
            } else {
                return (<div className='d-flex justify-content-center'>
                    <p className="h3">No post</p>
                </div>)
            }
        })
    }

    return (
        <div>
            <Navbar
                isLogged={isLogged}
                clearToken={clearToken}
                user={user}
            />
            <div style={{ marginTop: '70px', minHeight: '100vh' }} className='container w-75 pt-5'>
                <div className='row'>
                    <div className='col-4 text-center'>
                        {user.avatar ?
                            <img src={user.avatar} style={{ height: '9.6em', width: '9.6em', borderRadius: '50%' }} />
                            : <img src={defaultPP} style={{ height: '9.6em', width: '9.6em', borderRadius: '50%' }} />
                        }

                    </div>
                    <div className='col-8 d-flex'>
                        <div>
                            <p className='h4 mr-5 pt-1'>{user.username}</p><br />
                            <ul style={{ listStyle: 'none', padding: 0, display: 'flex' }} >
                                <li className='mr-4'><span style={{ fontWeight: 600, paddingRight: 1 }}>{user.total_post}</span> post</li>
                                <li className='mx-4'><a onClick={toggleSubscriber}><span style={{ fontWeight: 600, paddingRight: 1 }}>{user.total_follower}</span> subscribers</a></li>
                                <li className='mx-4'><a onClick={toggleSubscribing}><span style={{ fontWeight: 600, paddingRight: 1 }}>{user.total_following}</span> subscribing</a></li>
                            </ul>

                            <p className='h6' style={{ fontWeight: 700 }}>{user.name}</p>
                        </div>
                        <div>
                            <a href="/editprofile" className="editButton">Edit Profile</a>
                        </div>
                    </div>
                </div>
                <hr className='mt-5' />
                <div className='row d-flex justify-content-center'>
                    {postImgMap()}
                </div>
            </div>
            {/* <Footer /> */}
        </div>
    )
}

export default UserProfilePage