import React, { Component } from 'react';

class ClassComponent extends Component {
    state = {
        name: 'J'
    }
    render() {
        const { name } = this.state;
        return (
            <React.Fragment>
                Hello {name}
                <input type="text" value={name}
                    onChange={(event) => this.setState({ name: event.target.value })} />
            </React.Fragment>
        );
    }
}

export default ClassComponent;