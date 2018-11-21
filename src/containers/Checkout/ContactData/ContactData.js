import React, { Component } from 'react'
import axios from '../../../axios-orders'
import { connect } from 'react-redux'
import withErrorHandler from '../../../containers/withErrorHandler/withErrorHandler'

import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import * as orderActions from '../../../store/actions/order' 

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                attributes: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                value: '',
                validation: {
                    required: true,
                    min: 3,
                    max: 25,
                    message: ''
                },
                valid: false
            },
            street: {
                elementType: 'input',
                attributes: {
                    type: 'text',
                    placeholder: 'Your street'
                },
                value: '',
                validation: {
                    required: true,
                    min: 3,
                    max: 64,
                    message: ''
                },
                valid: false
            },
            zipCode: {
                elementType: 'input',
                attributes: {
                    type: 'number',
                    placeholder: 'Zip code'
                },
                value: '',
                validation: {
                    required: true,
                    min: 5,
                    max: 5,
                    message: ''
                },
                valid: false
            },
            country: {
                elementType: 'input',
                attributes: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true,
                    min: 4,
                    max: 25,
                    message: ''
                },
                valid: false
            },
            email: {
                elementType: 'input',
                attributes: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    min: 6,
                    max: 50,
                    message: ''
                },
                valid: false
            },
            deliveryMethod: {
                elementType: 'select',
                attributes: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ]
                },
                value: 'Select delivery method'
            }
        },
        formIsValid: false
    }

    checkValidity(value, rules, inputName) {
        let message = ''
        let isValid = false

        if(rules.required) {
            isValid = value !== undefined && value !== null && (value.trim() != '')
            
            if(!isValid) {
                return {
                    isValid: false,
                    message: `${inputName} is required`
                }
            }
        }

        if(rules.min) {
            isValid = value.length >= rules.min

            if(!isValid) {
                return {
                    isValid: false,
                    message: `${inputName} must be at least ${rules.min} characters long`
                }
            }
        }

        if(rules.max) {
            isValid = value.length <= rules.max

            if(!isValid) {
                return {
                    isValid: false,
                    message: `${inputName} must be max ${rules.max} characters long`
                }
            }
        }

        return { isValid: true, message: 'OK' }
    }

    orderHandler = event => {
        event.preventDefault()
        this.setState( { loading: true } )

        const formData = {}

        for(let formElIdentifier in this.state.orderForm) {
            formData[formElIdentifier] = this.state.orderForm[formElIdentifier].value
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice.toFixed(2),
            orderData: formData,
        }

        this.props.onPurchase(order)

    }

    componentDidUpdate() {
        if(this.props.purchased) {
            this.props.history.replace('/orders')
        }
    }

    inputChangedHandler = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        const stateOrderFormJSON = JSON.stringify(this.state.orderForm)

        const orderForm = JSON.parse(stateOrderFormJSON)

        orderForm[inputName].value = inputValue

        const validation = this.checkValidity(orderForm[inputName].value, orderForm[inputName].validation, inputName)
        orderForm[inputName].valid = validation.isValid
        orderForm[inputName].validation.message = validation.message

        const formIsValid = Object.values(this.state.orderForm).filter(el => el.valid).length === Object.values(this.state.orderForm).filter(el => el.validation).length

        this.setState({ orderForm, formIsValid })
    }

    render() {
        const formInputs = Object.keys(this.state.orderForm).map(key => {
            const input = this.state.orderForm[key]
            return <Input 
                        key={key}
                        elementType={input.elementType} 
                        attributes={{...input.attributes, name: key}}
                        value={input.value}
                        changed={this.inputChangedHandler}
                        blur={this.inputChangedHandler}
                        isValid={input.valid}
                        validationMessage={input.validation ? input.validation.message : null} />
        })

        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>

                {this.props.loading ? <Spinner /> : <form onSubmit={this.orderHandler} method="POST">
                    {formInputs}
                    <Button 
                        type="success"
                        enabled={this.state.formIsValid}> Place order </Button>
                </form>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        purchased: state.order.purchased
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPurchase: order => dispatch(orderActions.tryPurchase(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios)) 