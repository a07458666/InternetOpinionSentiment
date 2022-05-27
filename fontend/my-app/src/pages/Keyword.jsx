import { useEffect, useState } from "react";
import { LineChart, Line,CartesianGrid, XAxis,YAxis,Tooltip,Legend} from 'recharts';
import axio_instance from '../axio_instance';

import { getRandomColor,DataAdapter} from '../utils'

export default function Keyword(params) {
    const [keywordData, setKeyWordData] = useState([])
    const [lineData, setLineData] = useState([]) 
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    useEffect(()=>{
        setStartTime("2022-04-30")
        setEndTime("2022-07-02")
    },[])

    useEffect(()=>{
        if(startTime === null) return 
        axio_instance.get(`getkeyword/${startTime}/`).then(rawData=>{
            // console.log(rawData)
            let sortedData = DataAdapter.rawDataToKeyWordData(rawData);
            sortedData.sort((a, b) => a.date.localeCompare(b.date));
            
            // console.log(sortedData)
            setKeyWordData(sortedData);
        })
      
    },[startTime])

    useEffect(()=>{
        if(keywordData.length === 0) return       
        const data =  DataAdapter.keywordDataToLineData(keywordData)
        // console.log(data)
        setLineData(data);
    },[keywordData])
    
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
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {
                        (lineData.length!== 0)
                        && Object.keys(Object.values(lineData)[0])
                            .filter(kname=> kname!== 'date' && kname !== '')
                            .map((kname,idx)=><Line name={kname} key={kname} type="monotone" dataKey={kname} stroke={getRandomColor()} />)
                            
                    }
                    
                </LineChart>
            </div>
        </div>
    )
}