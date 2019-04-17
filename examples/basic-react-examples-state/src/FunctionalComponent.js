import React, { useState } from 'react';

const FunctionalComponent = props => {
    const [nameState, setNameState] = useState('J');
    return <React.Fragment>
        Hello {nameState}
        <input type="text" value={nameState}
            onChange={(event) => setNameState(event.target.value)} />
    </React.Fragment>
}

export default FunctionalComponent;