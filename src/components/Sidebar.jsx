import { Calendar, Handshake, Info, Map, NotebookText, Plus, Star } from 'lucide-react'
import React from 'react'

const Sidebar = () => {
  return (
    <div className='col-span-3'>
        <div className='grid grid-rows-12 h-full bg-[#EFF6EF] px-8 justify-center items-center'>
            <div className='flex flex-col items-center justify-center gap-3 row-span-3 -translate-y-24'>
                <div className='rounded-full bg-green-300 h-10 w-10 p-16'></div>
                <p className='flex'>Hey, ABCD</p>
            </div>
            <div className='row-span-4 bg-white flex flex-col justify-start gap-5 -translate-y-24 p-10 pt-7 pb-7 px-20'>
                <p className='flex gap-5 -translate-x-16 items-center tracking-wider'><NotebookText size={25}/>All Tasks</p>
                <p className='flex gap-5 -translate-x-16 items-center tracking-wider'><Calendar size={25}/>Today</p>
                <p className='flex gap-5 -translate-x-16 items-center tracking-wider'><Star size={25}/>Important</p>
                <p className='flex gap-5 -translate-x-16 items-center tracking-wider'><Map size={25}/>Planned</p>
                <p className='flex gap-5 -translate-x-16 items-center tracking-wider'><Handshake size={25}/>Assigned to me</p>
            </div>
            <div className='row-span-2 -translate-y-36 mt-2' >
                <div className='flex gap-3 bg-white py-7 px-5 items-center'>
                    <Plus size={35}/>
                    <p>Add List</p>
                </div>
            </div>
            <div className='row-span-3 bg-white -translate-y-52 p-10'>
                <div className='flex gap-1 justify-between'>
                    <p>Today Task</p>
                    <Info/>
                </div>
                <p>11</p>
            </div>
        </div>
      </div>
  )
}

export default Sidebar
