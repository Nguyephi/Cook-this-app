import React, { useState } from 'react'
import NavBar from '../components/NavBar'
import EditProfileForm from '../components/EditProfilePage/EditProfileForm'
import Dropzone from "react-dropzone";
import request from "superagent";

const defaultPP = require('../assets/img/default.png')

const EditProfilePage = ({ isLogged, clearToken, token, user }) => {
    const [uploadedFile, setUploadedFile] = useState([])
    const [imgUrl, setImgUrl] = useState('')

    const handleImgDrop = files => {
        setUploadedFile(files[0])
        handleImgUpload(files[0])
    }
    const handleImgUpload = async file => {
        let upload = request
            .post('https://api.cloudinary.com/v1_1/dotopzhu8/image/upload')
            .field("upload_preset", 'z1rftnj3')
            .field("file", file);

        upload.end((err, response) => {
            if (err) console.error(err)
            setImgUrl(response.body.secure_url)
            postImgUrl(response.body.secure_url)
        })
    }


    const postImgUrl = async (imgUrl) => {
        console.log('what is the imgurl', imgUrl)
        await fetch('https://cook-this-by-phil.herokuapp.com/postuserphoto', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }),
            body: JSON.stringify({
                'provider_pic': `${imgUrl}`
            })
        })
    }

    const userImg = () => {
        if (user.avatar) {
            return (<div className='d-flex mr-3'>
                <img src={user.avatar} style={{ width: 60, height: 60, borderRadius: '50%' }} />
            </div>)
        } else {
            return (<div className='d-flex mr-3'>
                <img src={defaultPP} style={{ width: 60, height: 60, borderRadius: '50%' }} />
            </div>)
        }
    }

    return (
        <div>
            <NavBar
                user={user}
                isLogged={isLogged}
                clearToken={clearToken}

            />
            <div style={{ marginTop: '70px', width: '65%' }} className='container pt-5'>
                <form class="border border-light pr-5">
                    <div className='row'>
                        <div className='col-3 text-center pr-0' style={{ borderRight: '1px solid lightgrey' }}>
                            <div className='py-3' style={{ fontWeight: '500' }}>
                                Edit Profile
                            </div>
                            <div className='py-3' style={{ fontWeight: '500' }}>
                                Change Password
                            </div>
                            <div className='py-3' style={{ fontWeight: '500' }}>
                                Email and SMS
                            </div>
                            <div className='py-3' style={{ fontWeight: '500' }}>
                                Privacy and Security
                            </div>


                        </div>
                        <div className='col-9 text-center pt-5'>
                            <div style={{ display: '-webkit-inline-box', width: '75%', padding: '0 65px' }}>
                                {userImg()}
                                <div style={{ height: '70px' }}>
                                    <div className='h4 pull-left'>
                                        {user.username}
                                    </div>
                                    <Dropzone
                                        onDrop={handleImgDrop}
                                        accept="image/*"
                                        multiple={false}
                                    >
                                        {({ getRootProps, getInputProps }) => {
                                            return (
                                                <div {...getRootProps()}>
                                                    <input {...getInputProps()} />
                                                    <div className='mb-3' style={{ clear:'left', justifyContent: "center", alignItems: "center", display: "flex" }}>
                                                        <a>
                                                            <strong className='blue-text'>Change Profile Photo</strong>
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        }}
                                    </Dropzone>
                                </div>
                            </div>
                            <EditProfileForm token={token} user={user} />
                        </div>
                    </div>
                </form>
            </div >
        </div >
    )
}

export default EditProfilePage
