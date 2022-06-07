import { useEffect, useRef, useState } from "react";
import { LineChart, Line,CartesianGrid, XAxis,YAxis,Tooltip,Legend } from 'recharts';
import axio_instance from '../axio_instance';
import WordCloud from "../library/worldcloud2"


import { getRandomColor,DataAdapter} from '../utils'
import moment from 'moment'

import 'antd/dist/antd.css';
import { DatePicker,Switch } from 'antd';
const { RangePicker } = DatePicker;


export default function Keyword() {
    const TIME_FORMAT = "YYYY-MM-DD"

    const [keywordData, setKeyWordData] = useState([])
    const [lineData, setLineData] = useState([]) 
    const [cloudData, setCloudData] = useState([]) 
    const [startTime, setStartTime] = useState(moment(new Date()).format(TIME_FORMAT))
    const [endTime, setEndTime] = useState(moment(new Date()).format(TIME_FORMAT))
    const [isLineChartDisplay,setIsLineChartDisplay] = useState(true)
    


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
    
    useEffect(()=>{
        if(keywordData.length === 0)return setCloudData([])
        const data = DataAdapter.keywordDataToWorldCloudData(keywordData)
        setCloudData(data);
        return () => {
            setCloudData([])  
        }
    },[keywordData])
    

   
    return (
        <>
            <div style={{justifyContent:"center",paddingTop:10,marginBottom:20}}>
                <div><span>KEYWORD</span></div>
                
                <div >
                        
                        <RangePicker format={TIME_FORMAT}  value={[moment(startTime),moment(endTime)]} onChange={onDatePickerChange} style={{margin:"1em"}}/>
                        <Switch  onChange={()=>setIsLineChartDisplay(!isLineChartDisplay)} />
                </div>
                <>
                {
                    isLineChartDisplay
                    ?<LineChartSpace lineData={lineData} />
                    :<TextCloud cloudData={cloudData}  />                
                }
                </>
                
               
            </div>
        </>
    )
}
function TextCloud({cloudData}){
    const cloudRef = useRef()
    
    useEffect(()=>{
        if(cloudData.length === 0)return 
        const wordCloudConfig={
            gridSize: Math.round(16 * cloudRef.current.width / 1024),
            weightFactor: function (size) {
                return Math.pow(size, 2.3) * cloudRef.current.width / 1024;
            },
            fontFamily: 'Times, serif',
            color: function (word, weight) {
              return (weight >= 10) ? '#f02222' : '#c09292';
            },
            minSize:20,
            rotateRatio: 0.5,
            rotationSteps: 2,
            backgroundColor: '#282c34', //'#ffe0e0'
            click: function(item) {
            },
        }
        WordCloud(cloudRef.current, { list: cloudData,...wordCloudConfig } );
        return () => {
            WordCloud.stop();
        };
    },[cloudData,cloudRef])
    return <canvas width="1800" height="700" style={{width:900,height:400}} ref={cloudRef}></canvas>
}
function LineChartSpace({lineData}) {
    return (lineData.length !== 0)
        ?
        <LineChart
            width={900}
            height={400}
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

