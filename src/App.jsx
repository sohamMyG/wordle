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
  
  return <div style={{marginBottom:'30px'}}>{grid}</div>
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

const DarkModeToggler = ({darkmode,setDarkmode}) => {
  
  const style = {
    position:'absolute',
    right:'30px',
    top: '5px'
  }

  const handleChange = () => {
    if(darkmode){
      setDarkmode(false)
    }
    else{
      setDarkmode(true)
    }
  }

  return (
    <div style={style}>
      <input checked={darkmode} onChange={handleChange} type="checkbox" id="darkmode-toggle"/>
      <label htmlFor="darkmode-toggle"></label>
    </div>
    
  )
}

const Keyboard = ({kbColors,darkmode}) => {
  const keyboard = []
  const Row = ({cells})=>{
    
    const row=[]
    let bgColor
    for(let char in cells){
      if(cells[char] in kbColors){
        bgColor = kbColors[cells[char]]
      }
      else{
        bgColor = '#d6d6d6'
      }
      const style={
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        height:'60px',
        width:'40px',
        borderRadius:'5px',
        backgroundColor:bgColor,
        margin:'3px',
        padding:'0 10px',
        color:'#111'
      }
      // console.log(bgColor, kbColors)
      row.push(
        <div key={char} style={style}>
          {cells[char].toUpperCase()}
        </div>
      )
    }
    return <div style={{display:'flex',justifyContent:'center'}}>{row}</div>
  }

  keyboard.push(<Row key={1} cells={['q','w','e','r','t','y','u','i','o','p']}/>)
  keyboard.push(<Row key={2} cells={['a','s','d','f','g','h','j','k','l']}/>)
  keyboard.push(<Row key={3} cells={['enter','z','x','c','v','b','n','m','bksp']}/>)

  return <div>{keyboard}</div>

}

const App= ()=> {
  const [guess, setGuess] = useState("")
  const [tries, setTries] = useState([
    
  ])
  const [colors,setColors] = useState({})
  const [darkmode,setDarkmode] = useState(false)

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
    if (e.ctrlKey || e.shiftKey || e.altKey) {
      return
    }
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
    <div className={ 'appContainer ' +(darkmode ? 'darkmode':'')}>
      <header>
        <div className='header-title'>Wordle</div>
        <DarkModeToggler darkmode={darkmode} setDarkmode={setDarkmode}/>
      </header>
      <Grid tries={tries} guess={guess} colors={colors}/>
      <Keyboard kbColors={getKBColor(tries)} darkmode={darkmode}/>
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

  let colors = {}
  for(let word of tries){
    for(let i=0;i<word.length;i++){
      if(answer[i]===word[i]){
        colors[word[i]]='#6aaa64'
      }
      else if(answer.includes(word[i])){
        colors[word[i]]='#c9b458'
      }
      else{
        colors[word[i]]='#888888'
      }
    }
    
  }
  return colors
}



export default App
