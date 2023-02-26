import { useEffect, useRef, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { db } from '../db';

export default function WorkoutDays(props) {
  const [loading, setLoading] = useState(true);

  const MON = useRef(null)
  const TUE = useRef(null)
  const WED = useRef(null)
  const THU = useRef(null)
  const FRI = useRef(null)
  const SAT = useRef(null)
  const SUN = useRef(null)

  const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const days = [MON, TUE, WED, THU, FRI, SAT, SUN];
  const worked = []

  const today = new Date();
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  // Fetch workouts in the past 7 days
  useEffect(() => {
    db.collection('workout').getList(1, 7, {
      filter: `created >= "${weekAgo.toISOString()}" && user = "${props.user}"`
    })
      .then((response) => {
        if(response.items) {
          return response.items
        } else {
          console.log(response);
        }
      })
      .then((data) => {
        for(let j = 0; j < data.length; j++) {
          const day = new Date(data[j].created)
          worked.push(week[day.getDay()].toUpperCase());
        }

        for(let i = 0; i < days.length; i++) {
          if(worked.includes(days[i].current.childNodes[0].innerHTML)) {
            days[i].current.classList.add('bg-main')
          };
        }

        setLoading(false);
      })      
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