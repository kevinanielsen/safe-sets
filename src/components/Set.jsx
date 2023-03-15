import { Check } from 'phosphor-react';

export function Set(props) {
  const { actualSets, set, KG, reps } = props

  const index = actualSets.findIndex((s) => s == set);
  const even = index % 2 === 0;
  let bgColor = even && 'bg-gray-100'

  return(
    <tr key={set.id} className={`${bgColor}`}>
      <td className="w-1/6">{index}</td>
      <td className="w-1/6">{KG}</td>
      <td className="w-1/6">{reps}</td>
      <td className="w-full flex justify-end my-1"><Check weight="bold" size={24} color="#ffffff" className="bg-transBlack rounded-lg" /></td>
    </tr>
  )
}