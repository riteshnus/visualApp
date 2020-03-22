import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const FailLoading = () => {
    return (
        <div className={'loader-wrapper'}>
            <FontAwesomeIcon size="8x" icon={faTimes} />
            <h4>An error occured, try to upload different image</h4>
            <style jsx>{`
            .loader-wrapper{
                position: absolute;
                right:50%;
                top: 20%;
            }
            `}</style>
        </div>)
}

export default FailLoading;
