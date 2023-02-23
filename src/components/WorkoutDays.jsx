export default function WorkoutDays() {
  return(
    <section className='mb-2'>
      <h2>Workouts this week</h2>
      <div className='pt-2 pb-6 bg-light rounded-main flex justify-evenly items-center'>
        <div className="flex justify-center items-center rounded-full bg-gray-300 w-9 h-9">
          <p className='absolute mt-14'>MON</p>
        </div>
        <div className="flex justify-center items-center rounded-full bg-main w-9 h-9">
          <p className='absolute mt-14'>TUE</p>
        </div>
        <div className="flex justify-center items-center rounded-full bg-main w-9 h-9">
          <p className='absolute mt-14'>WED</p>
        </div>
        <div className="flex justify-center items-center rounded-full bg-gray-300 w-9 h-9">
          <p className='absolute mt-14'>THU</p>
        </div>
        <div className="flex justify-center items-center rounded-full bg-gray-300 w-9 h-9">
          <p className='absolute mt-14'>FRI</p>
        </div>
        <div className="flex justify-center items-center rounded-full bg-main w-9 h-9">
          <p className='absolute mt-14'>SAT</p>
        </div>
        <div className="flex justify-center items-center rounded-full bg-gray-300 w-9 h-9">
          <p className='absolute mt-14'>SUN</p>
        </div>  
      </div>
    </section>
  )
}