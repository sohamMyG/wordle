import { useEffect, useState } from 'react'
import './App.css'

const Grid = ({tries,guess})=> {
  
  let grid= []
  for(let i=0;i<6;i++){
    if(i<tries.length){
      grid.push(<Row
          key={i} 
          word={tries[i]} 
          style={{backgroundColor:'white'}}  
          tried={true} //tried shows if tries includes word
        />
      )
    }
    else if(i===tries.length){
      grid.push(
        <Row key={i} word={guess} tried={false}/>
      )
    }
    else{
      grid.push(
        <Row key={i} word=""/>
      )
    }
  }
  
  return <div>{grid}</div>
}

const Row = ({word,tried}) => {
  let row=[]
  for(let i=0;i<5;i++){
    if((i<word.length)){
      if(tried){
       
        row.push(
          <div 
            className='cell' 
            key={i} 
            style={{backgroundColor:getBgColor(word,i),color:'white'}}
          >
            {word[i].toUpperCase()}
          </div>
        )
      }
      else{
        row.push(<div className='cell' key={i}>{word[i].toUpperCase()}</div>)
      }
    }
    else{
      row.push(<div className='cell' key={i}></div>)
    }  
  } 
  return <div className='row' >{row}</div>
}

const App= ()=> {
  const [guess, setGuess] = useState("")
  const [tries, setTries] = useState([
    'golum'
  ])
  const [colors,setColors] = useState({})
  

  useEffect(()=>{  
    window.addEventListener('keydown' ,handleKeydown)

    return () => {
      window.removeEventListener('keydown',handleKeydown)
    }
  },[guess])

  //update colors whenever tries updates
  useEffect(()=>{
    setColors(getBgColor(tries))
    
  },[tries])

  const handleKeydown = (e)=> {
    
    const key=e.key.toLowerCase()
    if(key==='enter'){
      if(guess.length<5){return}
      if(tries.length>=6){return}
      
      setTries([...tries,guess])
      setGuess('')
            
    }
    else if(key==='backspace'){
      console.log(key)
      setGuess(guess.slice(0,-1))
    }
    else if(key.match(/[a-z]/i)){
      if(guess.length<5){
        
        const newguess = guess.concat(key)
        setGuess(newguess)
      }
    }
  }
  
  return (
    <div className="App">
      <header>
        <div className='header-title'>Wordle</div>
      </header>
      <Grid tries={tries} guess={guess} colors={colors}/>
    </div>
  )
}

let words=['lotus']
const answer = words[Math.floor(Math.random()*words.length)]

const getBgColor= (word,i) => {
  let color
  if(answer[i]===word[i]){
    color='#6aaa64'
  }
  else if(answer.includes(word[i])){
    color='#c9b458'
  }
  else{
    color='#787c7e'
  }
  return color
}

const getKBColor = (tries) =>{

  let colors = []
  for(let word of tries){
    let color={}
    for(let i=0;i<word.length;i++){
      if(answer[i]===word[i]){
        color[word[i]]='#6aaa64'
      }
      else if(answer.includes(word[i])){
        color[word[i]]='#c9b458'
      }
      else{
        color[word[i]]='#787c7e'
      }
    }
    colors.push(color)
  }
  return colors
}



export default App
