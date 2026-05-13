import React from 'react'

export default function AssessmentSummaryCard({ type = '', total = '', title = '' }) {
  return (
    <div className={`card w-ful
            ${type === 'primary' ? 'bg-primary'
        : type === 'secondary' ? 'bg-secondary'
          : type === 'accent' ? 'bg-accent' : 'bg-neutral'}`}>
      <div className='card-body flex flex-col justify-center items-center gap-1'>
        <h3 className='font-bold text-3xl text-white'>{total}</h3>
        <p className='font-semibold text-white'>{title}</p>
      </div>
    </div>
  )
}
