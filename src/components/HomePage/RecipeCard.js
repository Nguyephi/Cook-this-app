import React, { useState, useEffect } from 'react'
import Home from '../HomePageModal'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment'


const defaultPP = require('../../assets/img/default.jpg')
// import CreateRecipePage from '../../containers/CreateRecipePage';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: '100%',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export const RecipeCard = ({ recipes, token, handleModal, toggle, handleComment }) => {
    const classes = useStyles()
    const [likeData, setlikeData] = useState(false);
    const [comment, setComment] = useState([])
    const [commentArr, setCommentArr] = useState([])


    const recipeExpandBooleanArr = () => {
        let booleanArr = []
        recipes.map((item, idx) => {
            booleanArr.push(false)
        })
        return booleanArr
    }
    const [expandBooleanArr, setExpandBooleanArr] = useState(recipeExpandBooleanArr())

    function handleExpandClick(recipeIndex) {
        let newArr = expandBooleanArr.slice(0)
        newArr[recipeIndex] = !newArr[recipeIndex]
        setExpandBooleanArr(newArr)
    }

    const isLikeBooleanArr = () => {
        let booleanArr = []
        recipes.map((item, idx) => {
            if (item.liked === false) {
                booleanArr.push(false)
            } else if (item.liked === true) {
                booleanArr.push(true)
            }
        })
        // console.log(booleanArr)
        return booleanArr
    }
    const [likesBooleanArr, setLikesBooleanArr] = useState(isLikeBooleanArr())

    function handleLikeClick(recipe, idx) {
        // console.log('what is recipe', recipe)
        let newArr = likesBooleanArr.slice(0)
        newArr[idx] = !newArr[idx]
        setLikesBooleanArr(newArr)
        postLikes(recipe.post_id, idx)
    }

    const postLikes = async (id, idx) => {
        let newArr = likesBooleanArr.slice(0)
        newArr[idx] = !newArr[idx]
        // console.log('uduud', id)
        const response = await fetch('https://cook-this-by-phil.herokuapp.com/postliked', {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }),
            body: JSON.stringify({
                'post_id': id,
                'is_liked': newArr[idx]
            })
        })
        const result = await response.json()
    }

    const handleInput = (e) => {
        setComment(e.target.value)
    }
    const handleSubmit = (e, id, value, comments) => {
        e.preventDefault()
        if (value.length > 0) {
            setCommentArr(commentArr.push([...comments]))
            // console.log('arrrrr', comments)
            handleComment(id, value)
            setComment('')
        }
    }
    
    const renderCardData = () => {
        if (recipes) {
            const renderCardData = recipes.map((i, idx) => {
                const ingredientList = i.ingredients.map(j => {
                    return (
                        <div>
                            <li key={i.ingredients.id} >
                                {j.quantity && <span className='mr-1'>{j.quantity}</span>}
                                <span>{j.ingredient}</span>
                            </li>
                        </div>
                    )
                }
                )
                const instructionList = i.instructions.map(k => {
                    return (
                        <div>
                            <li key={i.instructions.id}>{k}</li>
                        </div>
                    )
                })
                const commentList = i.comments.map(l => {
                    return (
                        <div>
                            <li className='d-flex' key={i.comments.length}>
                                <div className='mr-2' style={{ fontWeight: 600 }}>{l.user}</div>
                                <div>{l.comment}</div>
                            </li>
                        </div>
                    )
                })

                return (
                    <li key={idx} className="pb-4" style={{ listStyle: 'none' }}>
                        <Card className={classes.card}>
                            <CardHeader
                                avatar={
                                    i.creator_avatar ?
                                        <img src={i.creator_avatar} style={{ height: '45px', width: '45px', borderRadius: '50%' }} />
                                        :
                                        <img src={defaultPP} style={{ height: '45px', width: '45px', borderRadius: '50%' }} />
                                }

                                title={i.title}
                                subheader={`Created by: ${i.created_by} on ${moment(i.date_created).format('LL')}`}

                                action={
                                    <IconButton id='homepageModalbtn' aria-label="Settings">
                                        <a onClick={toggle}><MoreVertIcon onClick={() => { handleModal(i, idx); }}
                                            data-toggle="modal" data-target="#homePageModal"
                                        /></a>
                                    </IconButton>
                                }
                            />
                            <img src={i.imgUrl ? `${i.imgUrl}` : `${default}`} style={{ width: '100%', height: '525px', objectFit: 'cover' }} />
                            <CardContent>
                                <Typography className="pt-3" variant="body2" color="textSecondary" component="p">
                                    {i.description}
                                </Typography>
                            </CardContent>
                            <CardActions style={{ height: 30 }}>
                                <IconButton
                                    onClick={() => handleLikeClick(i, idx)}
                                    aria-label="Add to favorites"

                                >
                                    {!likesBooleanArr[idx] && <FavoriteIcon />}
                                    {likesBooleanArr[idx] && <FavoriteIcon style={{ color: 'red' }} />}

                                </IconButton>
                                <IconButton aria-label="Share">
                                    <ShareIcon />
                                </IconButton>

                                <IconButton
                                    className={clsx(classes.expand, {
                                        [classes.expandOpen]: expandBooleanArr[idx],
                                    })}
                                    onClick={() => handleExpandClick(idx)}
                                    aria-expanded={expandBooleanArr[idx]}
                                    aria-label="Show more"
                                >
                                    <ExpandMoreIcon />
                                </IconButton>
                            </CardActions>
                            <Collapse

                                in={expandBooleanArr[idx]}
                                timeout="auto"
                                unmountOnExit
                            >
                                <CardContent id='cardContent' style={{ maxHeight: '20em', overflowY: "auto" }} >
                                    <Typography paragraph>Ingredients:</Typography>
                                    <ul style={{ listStyleType: 'disc' }}>
                                        {ingredientList}
                                    </ul>
                                    <hr />
                                    <Typography paragraph>How it's made:</Typography>
                                    <ol>
                                        {instructionList}
                                    </ol>
                                </CardContent>
                            </Collapse>
                            {i.comments.length > 0 &&
                                <div>
                                    <hr className='mb-3' />
                                    <ul className='ml-3 mt-2' style={{ listStyle: ' none', padding: 0, maxHeight: 75, overflowY: 'auto' }}>
                                        {commentList}
                                    </ul>
                                </div>
                            }
                            <hr className='pb-0 mb-0' />
                            <form
                                style={{ display: 'flex', justifyContent: 'space-between' }}
                                onSubmit={(e) => handleSubmit(e, i.post_id, comment, i.comments)}
                            >
                                <div className='w-100'>
                                    <input
                                        value={comment}
                                        placeholder='Add a comment...'
                                        className='w-100 ml-3 recipeCardInput'
                                        style={{ height: '3em', WebkitAppearance: ' none', border: 'none' }}
                                        type='text'
                                        name='comment'
                                        onChange={(e) => handleInput(e, i.comments)}
                                    />
                                </div>
                                <div style={{ margin: '10px' }}>
                                    <button type="submit"
                                        className='commentButton'
                                        onClick={(e) => handleSubmit(e, i.post_id, comment, i.comments)}
                                    >
                                        Post
                                </button>
                                </div>
                            </form>
                        </Card>
                    </li >
                )
            })
            return <ul className='pl-0'>{renderCardData}</ul>
        }

    }




    return (
        <div>
            {renderCardData()}
        </div>
    )
}