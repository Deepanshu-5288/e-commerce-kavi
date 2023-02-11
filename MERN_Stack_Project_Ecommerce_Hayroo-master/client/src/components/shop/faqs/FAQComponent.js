import React, { Fragment, useState } from 'react'

function FAQComponent({item}) {
    // console.log(item);
    const [isClicked, setIsClicked] = useState(false);
    const handleClick = () =>{
        
        setIsClicked(!isClicked);
    }
  return (
    <Fragment>
        
        <div className='qANDa'>
        <div className='question' onClick={() => handleClick()}>
        <p className="">{item.question}</p>
        <svg className={isClicked ? "arrow up-arrow" : "arrow"} width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 .799l4 4 4-4" stroke="#F47B56" strokeWidth="2" fill="none" fillRule="evenodd"/></svg>
        </div>
        <p className={isClicked ? "show-answer" : "show-answer hide-answer"}>{item.answer}</p>
        <hr />
        </div>
    </Fragment>
  )
}

export default FAQComponent