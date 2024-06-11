import React from 'react'

export default function MenuItem() {
  return (
    <div className='flex justify-center items-center'>

      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
        <div className="px-3 py-2 h-20">
          <h2 className="text-base font-black">Shoes!</h2>
          <p className='text-xs'>If a dog chews shoes whose shoes does he choose?</p>

        </div>
      </div>
    </div>
  )
}
