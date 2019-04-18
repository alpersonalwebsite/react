import React, { Component } from 'react';

class Child extends Component {

    componentWillReceiveProps(props) {
        console.log('Child > componentWillReceiveProps()');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('Child  > shouldComponentUpdate()');
        return true;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('Child > getSnapshotBeforeUpdate()')
        return { friend: 'Peter' }
    }

    componentWillUpdate() {
        console.log('Child > componentWillUpdate()')
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Child > componentDidUpdate()')
        console.log(snapshot)
    }

    render() {

        const { name } = this.props;

        console.log('Child > render()')
        return (
            <React.Fragment>I'm a Child! And my name is {name}</React.Fragment>
        );
    }

}

export default Child;