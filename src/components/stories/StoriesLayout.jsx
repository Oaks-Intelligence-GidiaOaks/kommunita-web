import React from 'react'

const StoriesLayout = ({children}) => {
  return (
    <div className='h-screen bg-black flex justify-center items-center'>
     {/* <main className='flex justify-between items-center'> */}
     {children}
     {/* </main> */}
    </div>
  )
}

export default StoriesLayout
