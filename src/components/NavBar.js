import React from 'react';

function NavBar() {
    return (
        <header id="header">
            <div class="container">
                <div id="logo" class="pull-left">
                    <a href="/"><img src="img/Cook_this_logo.png" alt="" title="" /></a>
                </div>

                <nav id="nav-menu-container">
                    <ul class="nav-menu">
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#portfolio">Portfolio</a></li>
                        <li><a href="#team">Team</a></li>
                        <li class="menu-has-children"><a href="">Drop Down</a>
                            <ul>
                                <li><a href="#">Drop Down 1</a></li>
                                <li class="menu-has-children"><a href="#">Drop Down 2</a>
                                    <ul>
                                        <li><a href="#">Deep Drop Down 1</a></li>
                                        <li><a href="#">Deep Drop Down 2</a></li>
                                        <li><a href="#">Deep Drop Down 3</a></li>
                                        <li><a href="#">Deep Drop Down 4</a></li>
                                        <li><a href="#">Deep Drop Down 5</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Drop Down 3</a></li>
                                <li><a href="#">Drop Down 4</a></li>
                                <li><a href="#">Drop Down 5</a></li>
                            </ul>
                        </li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </nav>

                <nav class="nav social-nav pull-right d-none d-lg-inline">
                    <a href="#"><i class="fa fa-twitter"></i></a> <a href="#"><i class="fa fa-facebook"></i></a> <a href="#"><i
                        class="fa fa-linkedin"></i></a> <a href="#"><i class="fa fa-envelope"></i></a>
                </nav>
            </div>
        </header>
    )
}

export default NavBar