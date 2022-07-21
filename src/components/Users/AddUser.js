import React, {useState, Fragment} from 'react';

import Card from '../UI/Card.js'
import Button from '../UI/Button.js';

import classes from './AddUser.module.css'
import ErrorModal from '../UI/ErrorModal.js';

const AddUser = props => {
    const [enteredUserName, setEnteredUserName] = useState('');
    const [enteredAge, setEnteredAge] = useState('');
    const [error, setError] = useState();
    const addUserHandler = (event) =>{
        event.preventDefault();
        if(enteredUserName.trim().length === 0 || enteredAge.trim().length === 0) {
            setError({
                title: 'Invalid input', 
                message: "Please enter a valid name and age (non-empty values)."
            });
            return;
        };
        if(+enteredAge < 1) {
            setError({
                title: 'Invalid age', 
                message: "Please enter a valid age (> 0)."
            });
            return;
        };
        props.onAddUser(enteredUserName, enteredAge);
        setEnteredUserName('');
        setEnteredAge('');
        
    }

    const userNameChangeHandler = (event) => {
        setEnteredUserName(event.target.value);
    }

    const ageChangeHandler = (event) => {
        setEnteredAge(event.target.value);
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <Fragment>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}/>}
            <Card className={classes.input}>
                <form onSubmit={addUserHandler}> 
                    <label htmlFor="username">Username</label>
                    <input id="username" value={enteredUserName} type="text" onChange={userNameChangeHandler}/>
                    <label htmlFor="age">Age (Years)</label>
                    <input id="age" value={enteredAge} type="number" onChange={ageChangeHandler}/>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Fragment>
        
    );
}

export default AddUser;