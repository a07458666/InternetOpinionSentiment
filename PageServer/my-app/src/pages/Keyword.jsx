import { useEffect, useState } from "react";
import { LineChart, Line,CartesianGrid, XAxis,YAxis,Tooltip,Legend } from 'recharts';
import axio_instance from '../axio_instance';


import { getRandomColor,DataAdapter} from '../utils'
import moment from 'moment'

import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;


export default function Keyword() {
    const TIME_FORMAT = "YYYY-MM-DD"

    const [keywordData, setKeyWordData] = useState([])
    const [lineData, setLineData] = useState([]) 
    const [startTime, setStartTime] = useState(moment(new Date()).format(TIME_FORMAT))
    const [endTime, setEndTime] = useState(moment(new Date()).format(TIME_FORMAT))

    const onDatePickerChange = (dates)=>{
        setStartTime(dates[0].format(TIME_FORMAT))
        setEndTime(dates[1].format(TIME_FORMAT))   
    }

    useEffect(()=>{
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
        return () => {
            setKeyWordData([])
        }
    
    },[startTime,endTime])
 
    useEffect(()=>{
        if(keywordData.length === 0)return setLineData([])
        const data =  DataAdapter.keywordDataToLineData(keywordData,startTime,endTime)
        setLineData(data);
        return () => {
            setLineData([])  
        }
    },[keywordData,startTime,endTime])
    
    return (
        <>
            <div style={{justifyContent:"center",paddingTop:10,marginBottom:20}}>
                <div><span>KEYWORD</span></div>
                <Space direction="vertical" size={'large'}>
                    <RangePicker format={TIME_FORMAT}  value={[moment(startTime),moment(endTime)]} onChange={onDatePickerChange}/>
                </Space>
               
                { renderLineChart(lineData) }
               
            </div>
        </>
    )
}

function renderLineChart(lineData) {
    return (lineData.length !== 0)
        ?
        <LineChart
            width={900}
            height={350}
            role="linechart"
            data={lineData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis padding={{ left: 50, right: 50 }} dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            {Object.keys(Object.values(lineData)[0])
                .filter(kname => kname !== 'date' && kname !== '')
                .map((kname, idx) => <Line name={kname} key={kname} type="monotone" dataKey={kname} stroke={getRandomColor()} />)}

        </LineChart>
        : <div style={{ display: 'flex', alignItems: 'center', justifyContent: "center", width: '900px', height: '350px', border: 'whitesmoke 1px dashed', marginTop: '20px' }}>
            <h1 style={{ color: "white" }}>No Data</h1>
        </div>;
}

