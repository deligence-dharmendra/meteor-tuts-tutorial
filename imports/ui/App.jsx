// Import package
import React from 'react';
import PropTypes from 'prop-types';

const Component = function (props) {
    return  <div className="app-container" id="app-container">{props.children}</div>
}


export default Component;

// Define children propsType validation
Component.propTypes = {
    children: PropTypes.array,
};