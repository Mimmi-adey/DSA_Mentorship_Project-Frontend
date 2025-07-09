import { Link } from 'react-router-dom'
import mentor from '../assets/mentor.jpg'
import { featuredMentors } from '../data/mentors'

function Home() {
  return (
    <>
      {/* Header */}
      <div className='bg-emerald-600 px-6 py-4 flex items-center justify-between'>
        <h1 className='text-white font-bold text-5xl md:text-5xl'>
          Mentor Match
        </h1>
        <div className='space-x-4'>
          <Link
            to='/logout'
            className='text-white hover:text-emerald-200 transition-colors duration-200'
          >
            Logout
          </Link>
          <Link
            to='/profile'
            className='bg-white text-emerald-800 px-4 py-2 rounded-lg hover:bg-emerald-100 transition duration-200'
          >
            My Profile
          </Link>
        </div>
      </div>

        {/* Hero Section */}
        <div className='relative'>
         <img
            src={mentor}
            alt='Mentorship Banner'
            className='w-full h-[500px] object-cover brightness-90'
        />
        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
            <h1>Empowering Connections</h1>
        </div>
        </div>


      {/* Call to Action */}
      <div className='text-center mt-12 px-4'>
        <p className='text-gray-700 text-lg md:text-xl mb-6 max-w-xl mx-auto'>
          "Every successful person had a mentor who believed in them before they believed in themselves."
        </p>
        <Link
          to='/mentors'
          className='inline-block bg-emerald-600 text-white px-6 py-3 text-lg rounded-full shadow-md hover:bg-emerald-700 transition duration-300'
        >
          Find a Mentor
        </Link>
      </div>

      {/* Featured Mentors */}
      <div className='mt-16 px-6 md:px-12'>
        <h2 className='text-2xl md:text-3xl font-bold text-center text-emerald-700 mb-10'>
          Featured Mentors
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
          {featuredMentors.map((mentor, index) => (
            <div
              key={index}
              className='bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition duration-300'
            >
              <img
                src={mentor.img}
                alt={mentor.name}
                className='w-24 h-24 rounded-full mx-auto mb-4 object-cover'
              />
              <h3 className='text-lg font-semibold text-emerald-800'>{mentor.name}</h3>
              <p className='text-gray-600'>{mentor.field}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className='mt-20 py-6 text-center text-sm text-gray-500'>
        © {new Date().getFullYear()} Mentor Match. All rights reserved.
      </div>
    </>
  )
}

export default Home