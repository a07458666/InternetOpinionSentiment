import { useEffect, useState } from "react";
import { LineChart, Line,CartesianGrid, XAxis,YAxis,Tooltip,Legend} from 'recharts';
import axio_instance from '../axio_instance';

import { getRandomColor,dataToLineData,preprocess_data } from '../utils'

export default function Keyword(params) {
    const [data, setData] = useState([])
    const [lineData, setLineData] = useState([]) 
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    useEffect(()=>{
        setStartTime("2022-04-30")
        setEndTime("2022-07-02")
    },[])

    useEffect(()=>{
        if(startTime === null) return 
        axio_instance.get(`getkeyword/${startTime}/`).then(data=>{
            // console.log(data)
            let sortedData = preprocess_data(data);
            sortedData.sort(function (a, b) {
                return a.Timestamp.localeCompare(b.Timestamp);
            });
            // console.log(sortedData)
            setData(sortedData);
        })
      
    },[startTime])

    useEffect(()=>{
        if(data.length === 0) return       
        setLineData(dataToLineData(data))
    },[data])
    
    return (
        <div>
            <div style={{justifyContent:"center",paddingTop:10,marginBottom:20}}>
                <div><span>KEYWORD</span></div>
                <div><span>{`${startTime} - ${endTime}`}</span></div>

                <LineChart 
                    role="linechart"
                    data={lineData}
                    width={1000} 
                    height={350} 
                    margin={{ top: 10 , right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Timestamp" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {
                        (lineData.length!== 0)
                        && Object.keys(Object.values(lineData)[0])
                            .filter(kname=> kname!== 'Timestamp' && kname !== '')
                            .map((kname,idx)=><Line name={kname} key={kname} type="monotone" dataKey={kname} stroke={getRandomColor()} />)
                            
                    }
                    
                </LineChart>
            </div>
        </div>
    )
}