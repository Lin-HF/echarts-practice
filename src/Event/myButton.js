import React, {useState} from 'react';

const myButton = (props) => {
    const [input, changeState] = useState("");
    
    const namechange = (event) => {
        changeState(event.target.value);
        // props.change(input)
    }
    const clearInput = () => {
        props.change(input)
        changeState("");
    }
    return <div>
        <input type="text" onChange={namechange} value={input}></input>
        <button onClick={clearInput}>Click me</button>
    </div>
}

export default myButton;