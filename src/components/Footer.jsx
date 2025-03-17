import React from 'react'

const Footer = () => {
  return (
    <footer class="text-gray-600 body-font bg-purple-500 absolute bottom-0 w-full footer"> 
      <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-around">
        <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <lord-icon
            src="https://cdn.lordicon.com/maltvyiw.json"
            trigger="hover"
          >
          </lord-icon>
          <div>
          <span class="ml-3 text-3xl">pAsS</span> <span className='text-gray-800'>MaNgA</span>
          </div>
        </a>
        <div className='flex gap-10 text-gray-900 font-bold'>
        <h4>Created by FME © 2025</h4>
        <h6 className='font-normal'>Icons Made by Loardicon</h6>
        </div>
      </div>
    </footer>
  )
}

export default Footer
