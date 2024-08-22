import {useState} from 'react'
export default function TodoNew(props) {
    const  {setValueData}= props
    const [valueInput, setValueInput] = useState('');
    const key=Math.floor(Math.random() * 100)
    const handGetValue = (name) =>{
      setValueInput(name)
     }
     const handClick = () =>{
      setValueData((pre)=>[...pre,{id:key , value:valueInput}])
      setValueInput('')
     }
  return (
    <div className="todo-info">
      <input className="todo-input" type="text" placeholder="Enter your task" value={valueInput}  onChange={(e) => handGetValue(e.target.value)}/>
      <button className="todo-button"  onClick={handClick}>Add</button>
    </div>
  );
}
