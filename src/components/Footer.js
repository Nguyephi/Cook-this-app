import React from 'react'

function Footer() {
    return (
        <footer class="site-footer">
            <div class="bottom">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6 col-xs-12 text-lg-left text-center">
                            <p class="copyright-text"> © Cook this</p>
                            <div class="credits">
                                Designed with love by <a href="should put your git hub">Philip Nguyen</a>
                            </div>
                        </div>
                        <div class="col-lg-6 col-xs-12 text-lg-right text-center">
                            <ul class="list-inline">
                                <li class="list-inline-item">
                                    <a href="index.html">Home</a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="#about">About Us</a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="#features">Features</a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="#portfolio">Portfolio</a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="#team">Team</a>
                                </li>
                                <li class="list-inline-item">
                                    <a href="#contact">Contact</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer