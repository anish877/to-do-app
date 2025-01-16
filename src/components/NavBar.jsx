import { Circle, Grid2x2, LayoutGrid, Menu, MoonStar, Search } from 'lucide-react'
import React from 'react'

const NavBar = () => {
  return (
        <div className='flex justify-between w-full items-center'>
        <div className='flex gap-7 items-center'>
            <Menu />
            <div className='flex gap-1 text-2xl items-center text-[#3f9143] font-semibold'>
                <Circle size={30} />
                <p>DoIt</p>
            </div>
        </div>
        <div className='flex gap-7 items-center'>
            <Search />
            <LayoutGrid />
            <MoonStar />
        </div>
    </div>
  )
}

export default NavBar
