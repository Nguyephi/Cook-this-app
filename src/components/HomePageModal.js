import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

const HomePageModal = ({ sendSubscription, handleViewPost, isFollowed, user, recipe, isShowing, hide, token, getOtherUserData }) => {


    return (
        isShowing ?
            // const { sendSubscription, handleViewPost, isFollowed, user, recipe } = props
            < React.Fragment >
                <Modal
                    show={isShowing}
                    aria-labelledby="homePageModal"
                    centered
                >
                    {/* <div class="modal-dialog modal-notify modal-danger" style={{ marginTop: '125px' }} > */}
                    <Modal.Body id='homePageModal' className='p-0'>
                        {/* <div class="modal-content" style={{ borderRadius: '50%' }}> */}
                        <ul className="list-group">
                            <li className="list-group-item red-text">Report inappropriate</li>
                            {user.id !== recipe.creator_id &&
                                <li className="list-group-item red-text">
                                    <a onClick={() => sendSubscription()} >
                                        {isFollowed ? 'Unsubscribe' : 'Subscribe'}
                                    </a>
                                </li>
                            }
                            <li className="list-group-item">
                                <Link to={"/recipe/" + recipe.post_id} onClick={() => handleViewPost(recipe.post_id)} style={{ color: '#212529' }}>
                                    Go to post
                        </Link>
                            </li>
                            {user.id === recipe.creator_id ?
                                <li className="list-group-item">
                                    <Link to='/userprofile' onClick={hide}>
                                        Go to {recipe.created_by} account
                                </Link>
                                </li> :
                                <li className="list-group-item">
                                    <Link to={'/user/' + recipe.creator_id} onClick={() => getOtherUserData(recipe.creator_id)}>
                                        Go to {recipe.created_by} account
                                </Link>
                                </li>
                            }
                            <li className="list-group-item">Share</li>
                            <li className="list-group-item"><a href='#' onClick={hide}>Cancel</a></li>
                        </ul>
                    </Modal.Body>
                    {/* <div className="modal-header">
                        <p className="heading lead">Modal Danger</p>

                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true" class="white-text">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="text-center">
                            <i class="fas fa-check fa-4x mb-3 animated rotateIn"></i>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit iusto nulla aperiam blanditiis
                              ad consequatur in dolores culpa, dignissimos, eius non possimus fugiat. Esse ratione fuga, enim,
            ab officiis totam.</p>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <a type="button" class="btn btn-danger">Get it now <i class="far fa-gem ml-1 text-white"></i></a>
                        <a type="button" class="btn btn-outline-danger waves-effect" data-dismiss="modal">No, thanks</a>
                    </div> */}
                    {/* </div> */}

                </Modal>
            </React.Fragment >
            : null
    )
}

export default HomePageModal
