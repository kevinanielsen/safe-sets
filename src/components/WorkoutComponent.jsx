export default function WorkoutComponent(props) {
  const { id, name, created } = props.workout;

  return (
  <div key={id} className='flex'>
    <h2>{name}</h2>
    <p>{new Date(created).toDateString()}</p>
  </div>
  );
}