import { useEffect, useState } from "react";
import { LineChart, Line,CartesianGrid, XAxis,YAxis,Tooltip,Legend} from 'recharts';
import axio_instance from '../axio_instance';

import { getRandomColor,DataAdapter} from '../utils'
import moment from 'moment'

export default function Keyword(params) {
    const [keywordData, setKeyWordData] = useState([])
    const [lineData, setLineData] = useState([]) 
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    useEffect(()=>{
        setStartTime("2022-04-30")
        setEndTime(moment(new Date()).format('YYYY-MM-DD'))
    },[])

    useEffect(()=>{
        if(startTime === null) return 
        const dataRequest = { 
            params: {
                startTime: startTime, 
                endTime: endTime
            }
        }
        axio_instance.get(`getkeyword`,dataRequest).then(rawData=>{
            
            let sortedData = DataAdapter.rawDataToKeyWordData(rawData);
            sortedData.sort((a, b) => a.date.localeCompare(b.date));
            
            setKeyWordData(sortedData);
        })
      
    },[startTime,endTime])

    useEffect(()=>{
        if(keywordData.length === 0) return       
        const data =  DataAdapter.keywordDataToLineData(keywordData)
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