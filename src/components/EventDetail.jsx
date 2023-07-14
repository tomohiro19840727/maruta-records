import React from 'react'

const EventDetail = ({  selectedTitle,
  selectedPostText2,
  selectedSingleImage1 }) => {

  return (
   <>
   <div class="bg-white py-6 sm:py-8 lg:py-12">
  <div class="mx-auto max-w-screen-xl px-4 md:px-8">
    <div class="grid gap-8 md:grid-cols-2">
      
      <div class="grid gap-4 lg:grid-cols-5">
        <div class="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
          <img src={selectedSingleImage1} loading="lazy" alt="Photo by Himanshu Dewangan" class="h-full w-full object-cover object-center" />
        </div>
      </div>
          
      <div class="md:py-8">
        <div class="mb-2 md:mb-3">
          <h2 class="text-2xl font-bold text-gray-800 lg:text-3xl">{}{ selectedTitle}</h2>
        </div>
        <p className='text-xl font-bold'>
        <div dangerouslySetInnerHTML={{ __html: selectedPostText2 }} />
          </p>  
      </div>
    </div>
  </div>
</div>
   </>
  )}

export default EventDetail