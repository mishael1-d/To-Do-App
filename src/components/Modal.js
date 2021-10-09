import React, { useEffect } from 'react'

function Modal({modalContent, closeModal, type}) {
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            closeModal()
        }, 2000)
        return () =>clearTimeout(timeout)
    })
    return (
        <div className={`modal modal-${type}`}>
            <p>{modalContent}</p>
        </div>
    )
}

export default Modal
