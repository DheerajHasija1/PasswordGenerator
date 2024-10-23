import './App.css';
import '../index.css';
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [specialCharAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState('')

  const generatePassword = useCallback(() =>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed)   str +="0123456789"
    if(specialCharAllowed) str +="!@#$%^&*()_+"

    for(let i=1;i<=length;i++){
      const char = Math.floor(Math.random() * str.length )
      pass +=str.charAt(char)
    }
    setPassword(pass)
  }
  ,[length,numberAllowed,specialCharAllowed,setPassword]) 

  const passwordRef =useRef(null)
  const copyPasswordToClipborad = useCallback(() =>{
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,10)  //if you want any range to be highlight
  },[password])

  useEffect(() =>{
    generatePassword()
  },[length, numberAllowed, specialCharAllowed])
  return (
    <div className="container">
      <div id="myDiv">
        <h1 id="title">Password Generator</h1>
        <input type="text" placeholder='Password' readOnly value={password} ref={passwordRef} />
        <button id ="copy" onClick={copyPasswordToClipborad}>copy</button>


        <div style={{ display: 'flex'}}>
          <input type="range" min={6} max={40} value={length} style={{ width: '23%' }} 
          onChange={(event) => { setLength(Number(event.target.value)) }}/>
          <label style={{ marginLeft: '10px',marginRight:'20px',fontSize:'25px'}}>Length: {length}</label>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input type="checkbox" defaultChecked={numberAllowed} onChange={() => { setNumberAllowed((prev) => !prev)}} style={{ width: '24px', height: '24px' }}  />
            <label htmlFor="numberInput" style={{ fontSize: '24px' }}>Number</label>

            <input type="checkbox" defaultChecked={specialCharAllowed} onChange={() => { setCharAllowed((prev) => !prev) }} style={{ width: '24px', height: '24px' }} />
            <label htmlFor="charInput" style={{ fontSize: '24px' }}>Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
