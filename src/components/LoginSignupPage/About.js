import React, { useState, useEffect } from 'react';

const About = ({ isLogged, clearToken }) => {
    const [totalUsers, setTotalUsers] = useState()
    const [totalRecipes, setTotalRecipes] = useState()

    const getTotal = () => {
        const response = await fetch(`https://cook-this-by-phil.herokuapp.com/gettotal`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            })
        })
        const result = await response.json()
        setTotalUsers(result.total_users)
        setTotalRecipes(result.total_recipes)
    }

    useEffect(() => {
        getTotal()
    }, [])

    return (
        <section className="about" id="about">
            <div className="container text-center">
                <h2>About Cook this</h2>
                <p>Connect to a world full of amazing recipes of foods. You can now create, and save your recipes as well as any others you find.
                </p>
                <div className="row stats-row d-flex" style={{ justifyContent: 'space-evenly' }}>
                    <div className="stats-col text-center col-md-3 col-sm-6">
                        <div className="circle">
                            <span className="stats-no" data-toggle="counter-up">{totalUsers}</span> Satisfied Users
                        </div>
                    </div>
                    <div className="stats-col text-center col-md-3 col-sm-6">
                        <div className="circle">
                            <span className="stats-no" data-toggle="counter-up">{totalRecipes}</span> Recipes
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default About