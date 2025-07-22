import { useEffect, useState } from "react"
import axios from "axios"

function Сonsumption() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [data, setData] = useState([])
  
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    axios.get("http://localhost:8080/api/consumption")
    .then((success) => {
      setData(success.data)
    }).catch(err => (
      console.log(err)
    ))
  },[])
  
  console.log(data);
  
  
  return (
    <div>
      {data.map((item, idx) => (
        <div key={idx}>
          <h2>{item.title}</h2>
        </div>
      ))}
    </div>
  )
}

export default Сonsumption