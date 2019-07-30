import React from 'react';
import { Link } from 'react-router-dom'
import Icon from '@material-ui/core/Icon'

const NavBar = ({ clearToken }) => {

    return (
        <header style={{ position: 'fixed', top: 0, width: '100%', zIndex: '999', height: '60px' }} id="header">
            <div className="container">
                <div id="logo" className="pull-left">
                    <a href="/"><img src="img/Cook_this_logo.png" alt="" title="" /></a>
                </div>
                <nav className="nav social-nav pull-right">
                    <Link to='/createrecipe'><Icon>add</Icon></Link>
                    <Link to='/userprofile'><Icon>person</Icon></Link>
                    <a onClick={clearToken} style={{ fontSize: '17px', marginTop: '4px' }}>Log out</a>

                </nav>
            </div>
        </header>
    )
    // } else {
    //     return (
    //         <header id="header">
    //             <div className="container">
    //                 <div id="logo" className="pull-left">
    //                     <a href="/"><img src="img/Cook_this_logo.png" alt="" title="" /></a>
    //                 </div>

    //                 {!isLogged && <nav className="nav social-nav pull-right d-none d-lg-inline">
    //                     <a href="#"><i className="fa fa-twitter"></i></a> <a href='https://127.0.0.1:5000/login/facebook'><i className="fa fa-facebook"></i></a> <a href="#"><i
    //                         className="fa fa-linkedin"></i></a> <a href="#"><i className="fa fa-envelope"></i></a>
    //                 </nav>}
    //                 {isLogged && <nav className="nav social-nav pull-right d-none d-lg-inline"><a onClick={clearToken}>Log out</a>
    //                     <a href='/createrecipe'><i className="far fa-plus-square"></i></a>
    //                     <Link to='/userprofile'><i className="fas fa-user-circle"></i>{user.name}</Link>

    //                 </nav>}
    //             </div>
    //         </header>
    //     )
    // }
}
export default NavBar