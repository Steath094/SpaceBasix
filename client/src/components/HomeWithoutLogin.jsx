import React from 'react'
import FaqSection from './FaqSection'
import { useRecoilValue } from 'recoil'
import { userStatusAtom } from '../store/userStatusAtom'

function HomeWithoutLogin() {
    const userStatus = useRecoilValue(userStatusAtom)
    
  return (
    <div>
        <div className='bg-[#F8F8F8] flex px-6 md:px-24 py-10 flex-col md:flex-row'>
            <div className='w-full md:w-1/2'>
                <div className='flex flex-col gap-5'>
                    <h1 className='font-sans font-bold text-3xl sm:text-4xl md:text-6xl leading-[140%] tracking-tighter'>
                        Manage Your Hostel Effortlessly, Anytime, and Anywhere.
                    </h1>
                    <p className='font-sans text-base sm:text-lg md:text-xl'>
                        <span className='font-bold'>Smart Hostel Management</span> made simple. Seamlessly manage rooms, student data, fees, and complaints — all in one place. Empower wardens and students with a smooth, hassle-free experience.
                    </p>
                    {userStatus.islogin === false && 
                        <button className='border-2 border-[#2489D3] text-lg sm:text-xl font-sans bg-[#2489D3] text-white rounded-[50px] px-8 py-3 sm:px-10 sm:py-4 cursor-pointer hover:bg-[#1d6ea9] hover:outline-[3px] w-full sm:w-80'>
                            Register Your Hostel
                        </button>
                    }
                </div>
                <div className="flex justify-around py-8 bg-gray-50">
                    <div className="text-center">
                        <h2 className="text-yellow-500 text-2xl sm:text-3xl md:text-4xl font-bold">50+</h2>
                        <p className="text-black font-medium">Hostels Managed</p>
                    </div>

                    <div className="text-center">
                        <h2 className="text-blue-500 text-2xl sm:text-3xl md:text-4xl font-bold">2000+</h2>
                        <p className="text-black font-medium">Students Registered</p>
                    </div>

                    <div className="text-center">
                        <h2 className="text-orange-500 text-2xl sm:text-3xl md:text-4xl font-bold">500+</h2>
                        <p className="text-black font-medium">Complaints Resolved</p>
                    </div>
                </div>
            </div>
            <div className='w-full md:w-1/2 flex justify-center items-center rounded-2xl mt-6 md:mt-0'>
                <img className='w-full md:w-auto' src="/Images/hostel.png" alt="hostel" />
            </div>
        </div>

        <div className='bg-[#F8F8F8] w-full pb-16'>
            <FaqSection/>
        </div>
    </div>
  )
}

export default HomeWithoutLogin
