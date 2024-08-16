import PropTypes from "prop-types";


const StoriesLayout = ({children}) => {
  return (
    <div className='h-screen bg-black flex justify-center items-center'>
     {/* <main className='flex justify-between items-center'> */}
     {children}
     {/* </main> */}
    </div>
  )
}

StoriesLayout.propTypes ={
  children: PropTypes.node.isRequired,
}



export default StoriesLayout
