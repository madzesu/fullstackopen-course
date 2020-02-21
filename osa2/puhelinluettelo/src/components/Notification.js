import React from 'react'

const Notification = props => {
    const classNames = ['notification'];
    if (props.type) {
        classNames.push(props.type);
    }

    return props.message && (
        <div className={classNames.join(' ')}>
            {props.message}
        </div>
    );
};

export default Notification;
