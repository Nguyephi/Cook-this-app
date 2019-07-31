import React, { useState, useEffect } from 'react'
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
import { async } from 'q';

const defaultPP = require('../../assets.img.default.png')

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

const Recipe = ({ recipe, handleComment }) => {
    const classes = useStyles()
    const [thisRecipe, setThisRecipe] = useState({})
    const [ingredients, setIngredients] = useState([])
    const [instructions, setInstructions] = useState([])
    const [comments, setComments] = useState([])
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [submitComment, setSubmitComment] = useState([])

    const getPostData = async () => {
        const recipeId = (window.location.pathname.replace('/recipe/', ''))
        const response = await fetch(`https://cook-this-by-phil.herokuapp.com/singlerecipedata/${recipeId}`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "Authorization": `Token ${sessionStorage.getItem('token')}`
            })
        })
        const result = await response.json()
        setThisRecipe(result)
        setIngredients(result.ingredients)
        setInstructions(result.instructions)
        setComments(result.comments)
        setTitle(result.title)
        setDescription(result.description)
        setCreatedBy(result.created_by)
    }

    const [expanded, setExpanded] = React.useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    const handleInput = (e) => {
        e.preventDefault()
        setSubmitComment((e.target.value))
    }
    const handleSubmit = (e, id, value) => {
        e.preventDefault()
        handleComment(id, value)
        setSubmitComment('')
        console.log('is this function defined', value)
    }
    console.log('is this fu', submitComment)

    const mapIngredients = () => {
        if (ingredients !== null) {
            const ingredient = ingredients.map((i, idx) => {
                return (
                    <li key={idx}>
                        <div className='d-flex mb-0' >
                            {i.quantity !== null && <p className="mr-1 mb-1">{i.quantity}</p>}
                            {i.ingredient !== null && <p className='mb-1'>{i.ingredient}</p>}
                        </div>
                    </li>
                )
            })
            return ingredient
        }
    }


    const mapInstructions = () => {
        if (instructions !== null) {
            const instruction = instructions.map((i, idx) => {
                return (
                    <li key={idx}>
                        <div>{i}</div>
                    </li>
                )
            })
            return instruction
        }
    }

    const mapComment = () => {
        if (comments !== null) {
            return comments.map(i => {
                return (
                    <div>
                        <li className='d-flex' key={comments.length}>
                            <div className='mr-2' style={{ fontWeight: 600 }}>{i.user}</div>
                            <div>{i.comment}</div>
                        </li>
                    </div>
                )
            })
        }
    }

    useEffect(() => {
        getPostData()
        // setLocalRecipe()
    }, [])

    if (recipe !== null) {
        return (
            < div style={{ marginTop: 65 }
            } className='d-flex justify-content-center' >
                <div className="container mt-5 w-75 mx-5">
                    <Card className={classes.card}>
                        <div className='d-flex' style={{ maxHeight: '500px', justifyContent: 'space-between' }}>
                            <div style={{ width: '750px' }} >
                                {/* <CardMedia
                                    className={classes.media}
                                    src={test}
                                    title="Paella dish"
                                /> */}
                                <img src={recipe.imgUrl ? `${recipe.imgUrl}` : null style={{ width: '100%', height: '525px', objectFit: 'cover' }} />
                            </div>
                            <div style={{ maxWidth: '30%', borderLeft: '1px solid lightgrey' }}>
                                <CardHeader
                                    avatar={
                                        i.creator_avatar ?
                                            <img src={i.creator_avatar} style={{ height: '45px', width: '45px', borderRadius: '50%' }} />
                                            :
                                            <img src={defaultPP} style={{ height: '45px', width: '45px', borderRadius: '50%' }} />
                                    }
                                    action={
                                        <IconButton aria-label="Settings">
                                            {/* <MoreVertIcon onClick={() => handleModal(i, idx)}
                                                data-toggle="modal" data-target="#centralModalDanger"
                                            /> */}
                                        </IconButton>
                                    }
                                    title={title}
                                    subheader={`Created by: ${createdBy} on ${moment(recipe.date_created).format('LL')}`}
                                />
                                <CardContent className='px-0 pl-3' style={{ overflowY: 'auto' }}>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {description ? <div style={{ overflowY: 'auto', height: '4em' }} className='mb-0'>{description}</div> : null}
                                    </Typography>
                                </CardContent>

                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent style={{ height: '13em', overflowY: 'auto' }}>
                                        <Typography paragraph>Ingredients:</Typography>

                                        <ul className='pl-3' style={{ listStyle: 'none' }}>
                                            {mapIngredients()}

                                        </ul>
                                        <hr />
                                        <Typography paragraph>How it's made:</Typography>
                                        <ol>
                                            {mapInstructions()}
                                        </ol>
                                    </CardContent>
                                </Collapse>

                                {expanded === false && recipe.comments !== null &&
                                    <div>
                                        <hr className='m-0' />
                                        <ul className='ml-3 mt-2' style={{ height: '11em', listStyle: ' none', padding: 0, overflowY: 'auto' }}>
                                            {mapComment()}
                                        </ul>
                                    </div>
                                }
                                {/* <hr className='pb-0 mb-0' /> */}
                                <CardActions disableSpacing>
                                    <IconButton
                                        // onClick={() => handleLikeClick(i, idx)}
                                        aria-label="Add to favorites"
                                    >
                                        {/* {!likesBooleanArr[idx] && <FavoriteIcon />}
                    {likesBooleanArr[idx] && <FavoriteIcon style={{ color: 'red' }} />} */}

                                    </IconButton>
                                    <IconButton aria-label="Share">
                                        <ShareIcon />
                                    </IconButton>

                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <hr className='m-0' />
                                <form
                                    style={{ display: 'flex', justifyContent: 'space-between' }}
                                    onSubmit={(e) => handleSubmit(e, recipe.post_id, submitComment)}
                                >
                                    <div className='w-100'>
                                        <input
                                            value={submitComment}
                                            placeholder='Add a comment...'
                                            className='w-100 ml-3 recipeCardInput'
                                            style={{ height: '3em', WebkitAppearance: ' none', border: 'none' }}
                                            type='text'
                                            name='comment'
                                            onChange={(e) => handleInput(e)}
                                        />
                                    </div>
                                    <div style={{ margin: '10px' }}>
                                        <button
                                            className='commentButton'
                                            onClick={(e) => handleSubmit(e, recipe.post_id, submitComment)}
                                        >
                                            Post
                                </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Card >
                </div>
            </div >
        )
    }
}

export default Recipe