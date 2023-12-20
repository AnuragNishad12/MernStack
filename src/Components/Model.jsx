import React, { useRef } from 'react'
import '../App.css'

function Model({onclose,data}) {
    // const [data, setData] = useState([]);
    const modelref = useRef();
    const closeModel =(e)=>{
      if(modelref.current === e.target){
          onclose();
      }
  
  }


  return (
    <>
    <div className='pa' ref={modelref} onClick={closeModel}>
    <div className='details' >
      <h1>{data.StartupName}</h1>
      <p><b>Industry Vertical: </b>{data.IndustryVertical}</p>
      <p><b>SubVertical: </b>{data.SubVertical}</p>
      <p><b>City Location: </b>{data.CityLocation}</p>
      <p><b>Investor Name: </b>{data.InvestorsName}</p>
      <p><b>Investment Type: </b>{data.InvestmentType}</p>
      <p><b>Amount In USD: </b>{data.AmountInUSD}</p>
    </div>
    </div>
    
    </>
  )
}

export default Model
