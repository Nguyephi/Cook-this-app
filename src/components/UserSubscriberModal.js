import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'react-bootstrap'

const UserSubscriberModal = ({ isSubscriberShow, hide, subscriber }) => {

    const mapSubscriber = () => {
        return subscriber.map(i => {
            return (
                <li key={subscriber.length}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <p className='mb-0' style={{ fontWeight: 600 }}>{i.subscriber_username}</p>
                        <p>{i.subscriber_name}</p>
                    </div>
                </li >
            )
        })
    }

    return (
        isSubscriberShow ?
            < React.Fragment >
                <Modal
                    show={isSubscriberShow}
                    aria-labelledby="userSubscriberModal"
                    centered
                >
                    <Modal.Header>
                        <div style={{ fontWeight: 700 }}>Subscriber</div>
                        <button onClick={hide}>X</button>
                    </Modal.Header>
                    <div class="modal-content">

                        <ul className="list-group p-2" style={{ listStyle: 'none', maxHeight: 300, overflowY: 'auto' }}>
                            {mapSubscriber()}
                        </ul>

                    </div>
                </Modal>
            </React.Fragment >
            : null
    )
}

export default UserSubscriberModal
