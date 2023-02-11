import React, { Fragment } from 'react'
import FAQComponent from './FAQComponent'
import data from './assets/faqData'

function FAQContainer() {
  return (
    <Fragment>
        <section className="mx-4 mt-20 md:mx-12 md:mt-32 lg:mt-24 faq ">
        <div className="text-2xl mx-2 mb-6">FAQs</div>
        <div className='card'>
        {data.map((item) => {
            return <FAQComponent key={item.id} item={item} />
        })}
        </div>
      </section>
    </Fragment>
  )
}

export default FAQContainer