import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

const UserSubscribingModal = ({ isSubscribingShow, hide, subscribing }) => {

    const mapSubscribing = () => {
        return subscribing.map(i => {
            return (
                <li key={subscribing.length}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p className='mb-0' style={{ fontWeight: 600 }}>{i.subscribing_username}</p>
                        <p>{i.subscribing_name}</p>
                    </div>
                </li >
            )
        })
    }

    return (
        isSubscribingShow ?
            < React.Fragment >
                <Modal
                    show={isSubscribingShow}
                    aria-labelledby="userSubscribingModal"
                    centered
                >
                    <Modal.Header>
                        <div style={{ fontWeight: 700 }}>Subscribing</div>
                        <button onClick={hide}>X</button>
                    </Modal.Header>
                    <div class="modal-content">

                        <ul className="list-group p-2" style={{ listStyle: 'none', maxHeight: 300, overflowY: 'auto' }}>
                            {mapSubscribing()}
                        </ul>

                    </div>
                </Modal>
            </React.Fragment >
            : null
    )
}

export default UserSubscribingModal
