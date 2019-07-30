import React from 'react';

const About = ({ isLogged, clearToken }) => {
    return (
        <section className="about" id="about">
            <div className="container text-center">
                <h2>About Cook this</h2>
                <p>Voluptua scripserit per ad, laudem viderer sit ex. Ex alia corrumpit voluptatibus usu, sed unum convenire id. Ut
                    cum nisl moderatius, per nihil dicant commodo an. Eum tacimates erroribus ad. Atqui feugiat euripidis ea pri,
                    sed veniam tacimates ex. Menandri
                    temporibus an duo.
                </p>
                <div className="row stats-row d-flex" style={{ justifyContent: 'space-evenly' }}>
                    <div className="stats-col text-center col-md-3 col-sm-6">
                        <div className="circle">
                            <span className="stats-no" data-toggle="counter-up">232</span> Satisfied Customers
                        </div>
                    </div>
                    <div className="stats-col text-center col-md-3 col-sm-6">
                        <div className="circle">
                            <span className="stats-no" data-toggle="counter-up">79</span> Released Projects
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default About