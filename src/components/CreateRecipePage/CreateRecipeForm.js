import React, { Component } from 'react'
import request from "superagent";
import _TitleAndIngredients from './_TitleAndIngredients'
import _HowToMake from './_HowToMake'
import _ConfirmRecipe from './_ConfirmRecipe'
import _SubmitRecipe from './_SubmitRecipe'


class CreateRecipeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 1,
            title: '',
            ingredients: [],
            instructions: [],
            description: '',
            localRecipe: [],
            imgUrl: '',
            uploadedFile: []
        };
    }

    componentDidMount() {
        this.listLocalStorage()
    }


    listLocalStorage = async () => {
        let localRecipe = localStorage.getItem('recipe')
        localRecipe = JSON.parse(localRecipe)
        if (localRecipe == null) {
            localStorage.setItem('recipe', JSON.stringify({
                'title': this.state.title,
                'ingredients': this.state.ingredients,
                'instructions': this.state.instructions,
                'description': this.state.description,
                'imgUrl': this.state.imgUrl,
            }))
            this.setState({
                localRecipe: localRecipe
            })
        } else {
            this.setState({
                title: localRecipe.title || '',
                description: localRecipe.description || '',
                ingredients: localRecipe.ingredients || [],
                instructions: localRecipe.instructions || [],
                imgUrl: localRecipe.imgUrl || '',
            })
        }
    }


    handleImgDrop = files => {
        this.setState({
            uploadedFile: files[0]
        })
        this.handleImgUpload(files[0])
    }
    handleImgUpload = async file => {
        let upload = request
            .post('https://api.cloudinary.com/v1_1/dotopzhu8/image/upload')
            .field("upload_preset", 'z1rftnj3')
            .field("file", file);

        upload.end((err, response) => {
            if (err) console.error(err)
            this.setState({
                imgUrl: response.body.secure_url,
            })
            let localRecipe = localStorage.getItem('recipe')
            localRecipe = JSON.parse(localRecipe)
            const newRecipe = {
                'title': localRecipe.title,
                'description': localRecipe.description,
                'ingredients': localRecipe.ingredients,
                'instructions': localRecipe.instructions,
                'imgUrl': response.body.secure_url
            }
            localStorage.setItem('recipe', JSON.stringify(newRecipe))
        })
    }

    nextStep = () => {
        const { step } = this.state;
        this.setState({
            step: step + 1
        });
    };

    // Go back to prev step
    prevStep = () => {
        const { step } = this.state
        this.setState({
            step: step - 1
        });
    };

    // Handle fields change
    handleChange = input => e => {
        if ([input] == 'title') {
            let localRecipe = localStorage.getItem('recipe')
            localRecipe = JSON.parse(localRecipe)
            const newRecipe = {
                'title': e.target.value,
                'description': localRecipe.description,
                'ingredients': localRecipe.ingredients,
                'instructions': localRecipe.instructions,
                'imgUrl': localRecipe.imgUrl
            }
            localStorage.setItem('recipe', JSON.stringify(newRecipe))
        }
        if ([input] == 'description') {
            let localRecipe = localStorage.getItem('recipe')
            localRecipe = JSON.parse(localRecipe)
            const newRecipe = {
                'title': localRecipe.title,
                'description': e.target.value,
                'ingredients': localRecipe.ingredients,
                'instructions': localRecipe.instructions,
                'imgUrl': localRecipe.imgUrl
            }
            localStorage.setItem('recipe', JSON.stringify(newRecipe))
        }
        this.setState({ [input]: e.target.value })
    };

    dispatchIngredients = async (action) => {
        let localRecipe = await localStorage.getItem('recipe')
        localRecipe = await JSON.parse(localRecipe)
        let recipe = {
            'title': localRecipe.title,
            'description': localRecipe.description,
            'ingredients': localRecipe.ingredients || [],
            'instructions': localRecipe.instructions,
            'imgUrl': localRecipe.imgUrl
        }
        switch (action.type) {
            case 'add':
                const newIngredient = {
                    id: localRecipe.ingredients.length,
                    name: action.name,
                    quantity: action.quantity
                }
                recipe.ingredients.push(newIngredient)
                localStorage.setItem('recipe', JSON.stringify(recipe))
                this.setState({
                    ingredients: localRecipe.ingredients,
                })
                return
            case 'remove':
                return this.setState({
                    ingredients: localRecipe.ingredients.filter((_, index) => index !== action.idx)
                }),
                    recipe = {
                        'title': localRecipe.title,
                        'description': localRecipe.description,
                        'ingredients': localRecipe.ingredients.filter((_, index) => index !== action.idx) || [],
                        'instructions': localRecipe.instructions,
                        'imgUrl': localRecipe.imgUrl
                    },
                    localStorage.setItem('recipe', JSON.stringify(recipe))
            case 'clear':
                return this.setState({
                    ingredients: []
                }),
                    recipe = {
                        'title': localRecipe.title,
                        'description': localRecipe.description,
                        'ingredients': [],
                        'instructions': localRecipe.instructions,
                        'imgUrl': localRecipe.imgUrl
                    },
                    localStorage.setItem('recipe', JSON.stringify(recipe))
            default:
                return this.state.ingredients
        }
    }

    handleAddIngredient = (ingredient, quantity) => {

        console.log('ingredient', ingredient)
        console.log('quantity', quantity)

        this.dispatchIngredients({
            type: 'add',
            name: ingredient,
            quantity: quantity
        })
        this.setState({
            ingredient: ''
        })
    }

    // handleAddQuantity = (e, quantity) => {
    //     e.preventDefault()
    //     console.log('quantity', quantity)

    //     this.dispatchQuantity({
    //         type: 'add',
    //         name: quantity
    //     })
    // }

    dispatchInstructions = async (action) => {
        let localRecipe = await localStorage.getItem('recipe')
        localRecipe = await JSON.parse(localRecipe)
        let recipe = {
            'title': localRecipe.title,
            'description': localRecipe.description,
            'ingredients': localRecipe.ingredients,
            'instructions': localRecipe.instructions || [],
            'imgUrl': localRecipe.imgUrl
        }
        switch (action.type) {
            case 'add':
                const newInstruction = {
                    id: localRecipe.instructions.length,
                    name: action.name
                }
                recipe.instructions.push(newInstruction)
                localStorage.setItem('recipe', JSON.stringify(recipe))
                this.setState({
                    instructions: [...this.state.instructions, newInstruction]
                })
                return
            case 'remove':
                return this.setState({
                    instructions: localRecipe.instructions.filter((_, index) => index !== action.idx)
                }),
                    recipe = {
                        'title': localRecipe.title,
                        'description': localRecipe.description,
                        'ingredients': localRecipe.ingredients,
                        'instructions': localRecipe.ingredients.filter((_, index) => index !== action.idx) || [],
                        'imgUrl': localRecipe.imgUrl
                    },
                    localStorage.setItem('recipe', JSON.stringify(recipe))
            case 'clear':
                return this.setState({
                    instructions: []
                }),
                    recipe = {
                        'title': localRecipe.title,
                        'description': localRecipe.description,
                        'ingredients': localRecipe.ingredients,
                        'instructions': [],
                        'imgUrl': localRecipe.imgUrl
                    },
                    localStorage.setItem('recipe', JSON.stringify(recipe))
            default:
                return this.state.instructions
        }
    }

    handleAddInstruction = (e, instruction) => {
        e.preventDefault()
        this.dispatchInstructions({
            type: 'add',
            name: instruction
        })
    }

    render() {
        const { step } = this.state
        const { title, description, ingredients, instructions, localRecipe, imgUrl } = this.state
        const values = { title, ingredients, instructions, description, imgUrl }
        console.log('ingredientsssss', ingredients)
        switch (step) {
            case 1:
                return (
                    <_TitleAndIngredients
                        values={values}
                        localRecipe={localRecipe}
                        nextStep={this.nextStep}
                        handleChange={this.handleChange}
                        dispatchIngredients={this.dispatchIngredients}
                        handleAddIngredient={this.handleAddIngredient}
                        handleAddQuantity={this.handleAddQuantity}
                        handleImgDrop={this.handleImgDrop}
                    // imgUrl={this.state.imgUrl}
                    />
                );
            case 2:
                return (
                    <_HowToMake
                        values={values}
                        localRecipe={localRecipe}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        handleChange={this.handleChange}
                        dispatchInstructions={this.dispatchInstructions}
                        handleAddInstruction={this.handleAddInstruction}
                    />
                );
            case 3:
                return (
                    <_ConfirmRecipe
                        values={values}
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        dispatchIngredients={this.dispatchIngredients}
                        dispatchInstructions={this.dispatchInstructions}
                        token={this.props.token}
                    />
                );
            case 4:
                return <_SubmitRecipe />;
        }
    }
}

export default CreateRecipeForm


