import React from 'react';

import './backdrop.css';

const backdrop = (props) => {
    const cssClasses = ['backdrop', props.show ? 'backdropOpen' : 'backdropClosed'];

    return <div className={cssClasses.join(' ')}></div>;
};

export default backdrop;