import React from 'react'
import { Link } from 'react-router-dom';
const notFound = require('../../src/assets/img/Cook_this_logo1.png')

const NotFound = () => {

    return (
        <div style={{ backgroundColor: '#BD1E1E', height: "100vh", textAlign: "center" }} >
            <div className='d-flex justify-content-center pt-5'>
                <div style={{ fontSize: '200px', fontFamily: 'monospace', color: 'white' }}>4</div>
                <img src={notFound} style={{ height: '9em', marginTop: "5em" }} className='animated pulse slow infinite' />
                <div style={{ fontSize: '200px', fontFamily: 'monospace', color: 'white' }}>4</div>
            </div>
            <div className="text-center">
                <span className='h3 white-text' style={{ fontFamily: 'monospace', position: 'relative', bottom: '40px' }}>Oops! Page was not found.</span>
            </div>
            <div className="text-center">
                <button type="button" className="btn btn-outline-light waves-effect"><Link to='/' className='white-text' >Home</Link></button>
            </div>
        </div>
    )
};

export default NotFound