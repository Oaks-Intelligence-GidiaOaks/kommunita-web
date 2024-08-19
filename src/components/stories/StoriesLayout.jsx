import PropTypes from "prop-types";
import StoryBtn from "./StoryBtn";


const StoriesLayout = ({children}) => {
  return (
    <div className='h-screen bg-black flex justify-center items-center relative'>
     {/* <main className='flex justify-between items-center'> */}
     {children}
     <StoryBtn />
    </div>
  )
}

StoriesLayout.propTypes ={
  children: PropTypes.node.isRequired,
}



export default StoriesLayout
