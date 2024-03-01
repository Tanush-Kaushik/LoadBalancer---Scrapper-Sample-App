import './App.css'; 
import { useRef } from 'react';
import axios from 'axios';

function App() {
  let nameRef = useRef();
  let emailRef = useRef();

  const handleSubmit =async (e) => {
    e.preventDefault()

    let response = await axios.post('http://localhost:5000/dataConsole', {
      name: nameRef.current.value,
      email: emailRef.current.value,
    })

    console.log(response.data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" ref={nameRef} />
        <br />
        <input type="email" placeholder="email" ref={emailRef} />
        <br />
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default App;
