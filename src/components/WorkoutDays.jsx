import { useEffect, useRef } from 'react';

export default function WorkoutDays() {
  const today = new Date().toDateString();
  // console.log(today.split(' ')[0])

  const MON = useRef(null)
  const TUE = useRef(null)
  const WED = useRef(null)
  const THU = useRef(null)
  const FRI = useRef(null)
  const SAT = useRef(null)
  const SUN = useRef(null)

  const days = [MON, TUE, WED, THU, FRI, SAT, SUN];
  const workedOut = ['TUE', 'THU', 'FRI'];

  useEffect(() => {
    for(let i = 0; i < days.length; i++) {
      if(workedOut.includes(days[i].current.childNodes[0].innerHTML)) {
        days[i].current.classList.add('bg-main')
      };
    }
  }, [])

  return(
    <section className='mb-2'>
      <h2>Workouts this week</h2>
      <div className='pt-2 pb-6 bg-light rounded-main flex justify-evenly items-center'>
        <div ref={MON} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>MON</p>
        </div>
        <div ref={TUE} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>TUE</p>
        </div>
        <div ref={WED} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>WED</p>
        </div>
        <div ref={THU} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>THU</p>
        </div>
        <div ref={FRI} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>FRI</p>
        </div>
        <div ref={SAT} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>SAT</p>
        </div>
        <div ref={SUN} className={`flex justify-center items-center rounded-full bg-gray-300 w-9 h-9`}>
          <p className='absolute mt-14'>SUN</p>
        </div>  
      </div>
    </section>
  )
}