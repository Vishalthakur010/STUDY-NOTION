import React, { useEffect } from 'react'


// this hook detects the click outside of the specied component and calls the provided handler function
export const useOnclickOutside = (ref, handler) => {

    useEffect(() => {

        //Define the listener function to be called  on click/touch event
        const listener = (event) =>{
            //Check if the click/touch happened inside the ref component
            if(!ref.current || ref.current.contains(event.target)){
                return
            }
            handler(event)
        }

        //Add the event listener for mouseDown and touchStart event on the document
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)

        //Return the cleanup function to remove the event listener when the component unmounts or when the ref or handler dependencies change
        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    },[ref,handler]) // only run this when the ref or handler changes
}
