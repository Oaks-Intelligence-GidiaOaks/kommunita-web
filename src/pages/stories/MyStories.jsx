import { placeholder_logo } from '../../assets/images';
import { FaTimes } from 'react-icons/fa';
// import Stories from 'react-insta-stories';


const MyStories = () => {
  return (
    <div className='text-white'>
      <div className="sm:hidden md:flex rounded-lg p-4 flex-1"></div>
      <div className="sm:hidden md:flex rounded-lg p-4 flex-1">
        <div className="flex flex-col">
          <div className="flex justify-between items-center">
            <div className='w-4 h-4 rounded-full'>
                <img src={placeholder_logo} alt="" className='w-4 h-4 rounded-full'/>
                <div>
                  <p>justify-between</p>
                  <p>@poluuurn</p>
                </div>
            </div>
            <div>
                <FaTimes />
            </div>
          </div>
          <div>
            <img src="" alt="" />
          </div>
        </div>
      </div>
      <div className="sm:hidden md:flex rounded-lg p-4 flex-1">
       Add a new story
      </div>
    </div>
  )
}

export default MyStories
