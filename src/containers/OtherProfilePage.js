import React, { useState, useEffect } from 'react'
// import NavBar from '../components/NavBar'


const OtherProfilePage = props => {
    const { isLogged, clearToken, user, toggleOtherSubscriber, toggleOtherSubscribing } = props
    const [userData, setUserData] = useState({})
    const [localRecipes, setLocalRecipes] = useState([])

    const getOtherUserData = async () => {

        const userId = (window.location.pathname.replace('/user/', ''))
        const response = await fetch(`https://cook-this-by-phil.herokuapp.com/getotheruserdata/${userId}`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            })
        })
        const result = await response.json()
        console.log('user datataaaaa', result);
        setUserData(result)
        setLocalRecipes(result.recipes)
    }

    useEffect(() => {
        getOtherUserData()
    }, [])

    const postImgMap = () => {
        return localRecipes.map(i => {
            if (localRecipes.length > 0) {
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

    if (userData) {
        return (
            <div>
                {/* <NavBar
                    isLogged={isLogged}
                    clearToken={clearToken}
                    user={user}
                /> */}
                <div style={{ marginTop: '70px', minHeight: '100vh' }} className='container w-75 pt-5'>
                    <div className='row'>
                        <div className='col-4 text-center'>
                            {userData.avatar ?
                                <img src={userData.avatar} style={{ height: '9.6em', width: '9.6em', borderRadius: '50%' }} />
                                : null
                            }

                        </div>
                        <div className='col-8 d-flex'>
                            <div>
                                <p className='h4 mr-5 pt-1'>{userData.username}</p><br />
                                <ul style={{ listStyle: 'none', padding: 0, display: 'flex' }} >
                                    <li className='mr-4'><span style={{ fontWeight: 600, paddingRight: 1 }}>{userData.total_post}</span> post</li>
                                    <li className='mx-4'><a onClick={toggleOtherSubscriber}><span style={{ fontWeight: 600, paddingRight: 1 }}>{userData.total_follower}</span> subscribers</a></li>
                                    <li className='mx-4'><a onClick={toggleOtherSubscribing}><span style={{ fontWeight: 600, paddingRight: 1 }}>{userData.total_following}</span> subscribing</a></li>
                                </ul>

                                <p className='h6' style={{ fontWeight: 700 }}>{userData.name}</p>
                            </div>
                            <div>
                                <a href="#" className="editButton">Subscribe</a>
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
}

export default OtherProfilePage
