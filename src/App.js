import React, {useEffect, useState} from 'react'
import './App.css';

function App() {
  const [data, setData] = useState({
    path: "",
    files: [],
  });
  const [parent, setParent] = useState('')
  
  useEffect(()=>{
    fetch("http://localhost:8000")
    .then(res => res.json())
    .then(result => {
      setParent('')
      setData(result)
    }, (error) =>{
      console.log(error);
    })
  }, []);

  const clickHandler = event =>{
    event.preventDefault();
    // console.log(event.target.attributes.href.value); 
    fetch("http://localhost:8000/?path="+event.target.attributes.href.value)
    .then(res => res.json())
    .then(result =>{
      let linkArr = result.path.split('/');
      linkArr.pop();
      setParent(linkArr.join('/'));
      setData(result);
    })
  }

  return (
    <div className="file-manager">
      <div className='current-level'>
        current: {data.path === "" ? "/" : data.path}
      </div>
      <div>
        <a href={parent} onClick={clickHandler}>
          Level up <span className="material-symbols-outlined">expand_less</span>
        </a>
      </div>
      <ul className="folder-list">
        {data.files.map((item, idx) => {

          if(item.dir){
            return <li key={idx} className="folder">
                    <span className='material-icons'>folder</span>
                    <a href={data.path+'/'+item.name} onClick={clickHandler}>
                      {item.name.toUpperCase()}
                    </a>
                  </li>
          }else{
            return <li key={idx} className="file">
                      <span className="material-symbols-outlined">docs</span>
                      {item.name}
                    </li>
          }

        })}
      </ul>
    </div>
  );
}

export default App;
