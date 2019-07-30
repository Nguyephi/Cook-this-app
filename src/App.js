import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar'
import LoginInSignUpPage from "./containers/LogInSignUpPage"
import HomePage from "./containers/HomePage"
import UserProfilePage from './containers/UserProfilePage'
import EditProfilePage from './containers/EditProfilePage'
import CreateRecipePage from './containers/CreateRecipePage'
import RecipePage from './containers/RecipePage'
import HomePageModal from './components/HomePageModal'
import UserSubscriberModal from './components/UserSubscriberModal'
import UserSubscribingModal from './components/UserSubscribingModal'
import OtherProfilePage from './containers/OtherProfilePage'

// import Test from './containers/Test'
import NotFound from './components/NotFound'
import { ProtectedRoute } from "./services/ProtectedRoute";
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/core'
// import NavBar from './components/NavBar'

function Index() {
  return <h2>Home</h2>;
}


const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
    content: url(${require('./assets/img/loading.jpeg')})
`;

const App = () => {
  const [token, setToken] = useState('')
  const [isLogged, setIsLogged] = useState(false)
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({})
  const [recipeData, setRecipeData] = useState([])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [comment, setComment] = useState('')
  const [recipe, setRecipe] = useState({})
  const [isFollowed, setIsFollowed] = useState(false)
  const [recipeIdx, setRecipeIdx] = useState()
  const [isShowing, setIsShowing] = useState(false);
  const [isSubscriberShow, setIsSubscriberShow] = useState(false);
  const [isSubscribingShow, setIsSubscribingShow] = useState(false);
  const [isOtherSubscriberShow, setIsOtherSubscriberShow] = useState(false);
  const [isOtherSubscribingShow, setIsOtherSubscribingShow] = useState(false);
  const [subscriber, setSubscriber] = useState([])
  const [subscribing, setSubscribing] = useState([])

  function toggle() {
    setIsShowing(!isShowing);
  }

  function toggleSubscriber() {
    setIsSubscriberShow(!isSubscriberShow)
  }
  function toggleSubscribing() {
    setIsSubscribingShow(!isSubscribingShow)
  }
  function toggleOtherSubscriber() {
    setIsOtherSubscriberShow(!isOtherSubscriberShow)
  }
  function toggleOtherSubscribing() {
    setIsOtherSubscribingShow(!isOtherSubscribingShow)
  }

  // function that post proof that user is logged in. has name and email of user.
  const getUserData = () => {
    fetch(`https://cook-this-by-phil.herokuapp.com/userdata`, {
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      })
    })
      .then(result => result.json())
      .then(jsonData => setUserData(jsonData))
    setLoading(true)
  }
  // console.log('fb login', userData)


  const getSubscription = async () => {
    const response = await fetch(`https://cook-this-by-phil.herokuapp.com/usersubscription`, {
      method: 'GET',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem('token')}`
      })
    })
    const result = await response.json()
    setSubscriber(result.user_subscription.subscriber)
    setSubscribing(result.user_subscription.subscribing)
  }

  const handleSignIn = async (email, password) => {
    let data = {
      'email': email,
      'password': password
    }
    let response = await fetch('https://cook-this-by-phil.herokuapp.com/signin', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        "content-Type": "application/json",
      }
    })
    let jsonData = await response.json()
    // console.log('what the fudge is this', jsonData)
    setUserData(jsonData)
    if (jsonData.success == 'true') {
      await sessionStorage.setItem('token', jsonData.token)
    }
    const token = await sessionStorage.getItem('token')
    if (token) {
      setToken(token)
      setIsLogged(true)
    }
  }

  const handleChangeSignIn = (name, value) => {
    if (name == 'email') {
      setEmail(value)
    } else if (name == 'password') {
      setPassword(value)
    }
  }


  const getRecipeData = async () => {
    await fetch(`https://cook-this-by-phil.herokuapp.com/recipedata`, {
      method: 'GET',
      // body:
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      })
    })
      .then(result => result.json())
      .then(jsonData => setRecipeData(jsonData.recipes))
  }
  console.log('recipe data', recipeData)

  useEffect(() => {
    const accessToken = (window.location.search.split("=")[0] === "?api_key") ? window.location.search.split("#_=_")[0] : null;
    if (accessToken) {
      sessionStorage.setItem("token", accessToken.replace('?api_key=', ''));
      setToken(accessToken.replace('?api_key=', ''));
      setIsLogged(true)
    }

    const existingToken = sessionStorage.getItem('token');
    if (existingToken) {
      setToken(existingToken.replace('?api_key=', ''))
      setIsLogged(true)
    };
  }, [])

  useEffect(() => {
    getUserData()
    getRecipeData()
    getSubscription()
  }, [token])
  // console.log('userdata', userData)

  // redirect to logout in BE and will delete token from db.
  const clearBEToken = async () => {
    const response = await fetch('https://cook-this-by-phil.herokuapp.com/logout', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      },
    })
    const result = await response.json()
    if (result.status === 'ok')
      window.location.replace("https://cook-this-by-phil.herokuapp.com/")
  }

  // removes token from sessionStorage.
  const clearToken = (e) => {
    e.preventDefault()
    clearBEToken()
    sessionStorage.clear('token')
  }

  const handleModal = async (recipeArg, idx) => {
    console.log('recipearfrgggg', recipeArg)
    setRecipe(recipeArg)
    setRecipeIdx(idx);
    // await localStorage.setItem('localrecipe', JSON.stringify(recipeArg))
    const response = await fetch('https://cook-this-by-phil.herokuapp.com/issubscribed', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }),
      body: JSON.stringify({
        'user_subscribed': recipeArg.creator_id,
      })
    })
    const jsonData = await response.json()
    setIsFollowed(jsonData.is_subscribed)
  }

  const sendSubscription = async () => {
    console.log('sendSubscription')
    await fetch('https://cook-this-by-phil.herokuapp.com/usersubscribe', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }),
      body: JSON.stringify({
        'user_subscribed': recipe.creator_id,
      })
    })
    setIsFollowed(!isFollowed)
  }

  const handleViewPost = async (id) => {
    toggle()
    recipeData.find(recipe => recipe.id == id)
    console.log('reciees of this id', id)
    const response = await fetch(`https://cook-this-by-phil.herokuapp.com/singlerecipedata/${id}`, {
      method: 'GET',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Token ${sessionStorage.getItem('token')}`
      })
    })
    const result = await response.json()
    console.log('see result', result)
    setRecipe(result)
    // setIsShowing(false)
  }

  const getOtherUserData = async (id) => {
    toggle()
    const response = await fetch(`https://cook-this-by-phil.herokuapp.com/getotheruserdata/${id}`, {
      method: 'GET',
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": `Token ${token}`
      })
    })
    const result = await response.json()
  }


  const handleComment = async (id, input) => {
    console.log('fireeeee', input)
    await fetch('https://cook-this-by-phil.herokuapp.com/postcomment', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }),
      body: JSON.stringify({
        'post_id': id,
        'comment': input,
      })
    })
  }

  if (!loading) {
    return (
      <div
        className='animated bounce infinite'
        style={{ marginTop: 200, display: 'flex' }}
      >
        <BeatLoader
          css={override}
          sizeUnit={'px'}
          size={20}
          color={'black'}
          loading={!loading}
        />
      </div>
    )
  }
  return (
    <div>
      <Router>
        {isLogged &&
          <Route path="/"
            component={() => <NavBar
              clearToken={clearToken}
            />} />}
        <Switch>
          <Route exact path='/'
            component={() => <LoginInSignUpPage
              isLogged={isLogged}
              token={token}
              clearToken={clearToken}
              handleSignIn={handleSignIn}
              handleChangeSignIn={handleChangeSignIn}
            />}
          />
          <ProtectedRoute exact path='/home'
            component={() => <HomePage
              isLogged={isLogged}
              user={userData}
              recipes={recipeData}
              clearToken={clearToken}
              token={token}
              handleModal={handleModal}
              recipe={recipe}
              toggle={toggle}
              handleComment={handleComment}
            />}
          />


          <ProtectedRoute exact path='/userprofile'
            component={() => <UserProfilePage
              isLogged={isLogged}
              user={userData}
              recipes={recipeData}
              clearToken={clearToken}
              token={token}
              toggleSubscriber={toggleSubscriber}
              toggleSubscribing={toggleSubscribing}
            />}
          />
          <ProtectedRoute exact path='/user/:id'
            component={() => {
              return (
                <OtherProfilePage
                  isLogged={isLogged}
                  user={userData}
                  clearToken={clearToken}
                  token={token}
                  toggleOtherSubscriber={toggleOtherSubscriber}
                  toggleOtherSubscribing={toggleOtherSubscribing}
                />)
            }}
          />
          <ProtectedRoute exact path='/editprofile'
            component={() => <EditProfilePage
              isLogged={isLogged}
              user={userData}
              clearToken={clearToken}
              token={token}
              user={userData}
            />}
          />
          <ProtectedRoute exact path='/createrecipe'
            component={() => <CreateRecipePage
              isLogged={isLogged}
              user={userData}
              clearToken={clearToken}
              token={token}
            />}
          />
          <ProtectedRoute exact path='/recipe/:id'
            component={() => {
              return (
                <RecipePage
                  isLogged={isLogged}
                  user={userData}
                  recipes={recipeData}
                  clearToken={clearToken}
                  token={token}
                  recipe={recipe}
                  handleComment={handleComment}
                />
              )
            }}
          />
          {/* <ProtectedRoute exact path='/test'
            component={() => <Test
              isLogged={isLogged}
              user={userData}
              recipes={recipeData}
              clearToken={clearToken}
              token={token}
            />}
          /> */}
          <Route component={NotFound} />
        </Switch>
        <HomePageModal
          token={token}
          sendSubscription={sendSubscription}
          handleViewPost={handleViewPost}
          isFollowed={isFollowed}
          user={userData}
          recipe={recipe}
          isShowing={isShowing}
          hide={toggle}
          getOtherUserData={getOtherUserData}
        />
        <UserSubscriberModal
          isSubscriberShow={isSubscriberShow}
          hide={toggleSubscriber}
          subscriber={subscriber}
        />
        <UserSubscribingModal
          isSubscribingShow={isSubscribingShow}
          hide={toggleSubscribing}
          subscribing={subscribing}
        />
      </Router>
    </div>
  );
}

export default App;
