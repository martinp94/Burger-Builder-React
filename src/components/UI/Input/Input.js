import React from 'react'

import classes from './Input.css'

const input = (props) => {
    let inputElement = null;

    const validationClasses = props.isValid ? [classes.InputFeedback, classes.ValidInput].join(' ') : [classes.InputFeedback, classes.InvalidInput].join(' ')

    switch( props.elementType ) {
        case ( 'input' ):
            inputElement =  <React.Fragment> <input 
                                className={classes.InputElement} 
                                {...props.attributes} 
                                value={props.value}
                                onChange={props.changed}
                                onBlur={props.blur} />

                                {<div className={validationClasses}>{props.validationMessage}</div>}
                            </React.Fragment>
            break
        case ( 'textarea' ):
            inputElement =  <React.Fragment> <textarea 
                                className={classes.InputElement} 
                                {...props.attributes} 
                                value={props.value}
                                onChange={props.changed}
                                onBlur={props.blur} />

                                <div className={validationClasses}>{props.validationMessage}</div>
                            </React.Fragment>
            break
        case ( 'select' ):
            inputElement = (<React.Fragment><select 
                                    className={classes.InputElement} 
                                    value={props.value}
                                    onChange={props.changed}
                                    name={props.attributes.name}>  
                                        {props.attributes.options.map(option => {
                                            return <option
                                                key={option.value} 
                                                value={option.value}> {option.displayValue} </option>
                                        })}
                                </select>

                            </React.Fragment>)
            break
        default:
            inputElement = <React.Fragment> <input 
                                className={classes.InputElement} 
                                {...props.attributes} 
                                value={props.value}
                                onChange={props.changed}
                                onBlur={props.blur} />

                                <div className={validationClasses}>{props.validationMessage}</div>
                            </React.Fragment>
            break
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )

};

export default input