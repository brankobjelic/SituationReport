import React from 'react'
import { useState } from 'react'
import classes from './ReadMore.module.css'

const ReadMore = ( {children} ) => {

    const [fullText, setFullText] = useState(false)

    const toggleButton = () => {
        setFullText(prevState => !prevState)
    }



  return (
    <p>
        {fullText ? children : children.substr(0,200)}
        {children.length < 200 ? '' : <button className={classes.btn} onClick={toggleButton}>{fullText ? '⯇⯇' : '...⯈⯈'}</button>}
    </p>
  )
}

export default ReadMore