import React, { Component } from 'react';
import MyButton from './myButton';

class EventTest extends Component {

    state = { 
        data: null
    }

    changeData = (newData) => {
        this.setState({data: newData});
    }

    render() {
        return (
            <div>
                <MyButton change={this.changeData}/>
                <h1>this is the data: {this.state.data}</h1>
            </div>
        );
    }
}

export default EventTest;