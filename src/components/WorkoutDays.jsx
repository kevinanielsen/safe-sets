import { useEffect, useRef } from 'react';

export default function WorkoutDays() {
  const today = new Date().toDateString();
  // console.log(today.split(' ')[0])

  const mon = useRef(null)
  const tue = useRef(null)
  const wed = useRef(null)
  const thu = useRef(null)
  const fri = useRef(null)
  const sat = useRef(null)
  const sun = useRef(null)

  const days = [mon, tue, wed, thu, fri, sat, sun];
  const workedOut = [1, 3, 4];

  return(
    <section className='mb-2'>
      <h2>Workouts this week</h2>
      <div className='pt-2 pb-6 bg-light rounded-main flex justify-evenly items-center'>
        <div ref={mon} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>MON</p>
        </div>
        <div ref={tue} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>TUE</p>
        </div>
        <div ref={wed} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>WED</p>
        </div>
        <div ref={thu} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>THU</p>
        </div>
        <div ref={fri} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>FRI</p>
        </div>
        <div ref={sat} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>SAT</p>
        </div>
        <div ref={sun} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>SUN</p>
        </div>  
      </div>
    </section>
  )
}