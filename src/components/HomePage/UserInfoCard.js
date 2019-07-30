import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { directive } from '@babel/types';

export const UserInfoCard = ({ user }) => {
    return (
        <div >
            <Card className='py-2 text-center'>
                <div className='d-flex' style={{ justifyContent: 'space-evenly' }}>
                    <div>
                        <Link to='/userprofile'>{user.avatar ?
                            <img src={user.avatar} style={{ height: '50px', width: '50px', borderRadius: '50%', marginTop: '.25em' }} />
                            : null
                        }
                        </Link>
                    </div>
                    <div>
                        <Card.Title className='mb-0'>{user.username}</Card.Title>
                        <Card.Text>{user.name}</Card.Text>
                    </div>
                </div>
            </Card>
            {/* <Card className='mt-3 text-center'>
                <Card.Title className='pt-3 mb-0'>Recommended Recipe</Card.Title>
                <div className='text-center'>
                    <hr className='mt-2 w-75' />

                </div>
            </Card> */}
        </div>
    )
}