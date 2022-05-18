import { useEffect, useState } from "react";
import { LineChart, Line,CartesianGrid, XAxis,YAxis,Tooltip,Legend} from 'recharts';
//  yyyy-mm-dd
const TEST_DATA = [
    
    { value:"TSMC",count:50,time: "2022-07-01"},
    { value:"TSMC",count:190,time: "2022-06-30"},
    { value:"TSMC",count:120,time: "2022-07-02"},
    { value:"ASML",count:10,time: "2022-06-30"},
    { value:"ASML",count:60,time: "2022-07-01"},
    { value:"ASML",count:70,time: "2022-07-02"},
    { value:"Intel",count:20,time: "2022-06-30"},
    { value:"Intel",count:30,time: "2022-07-01"},
    { value:"Intel",count:40,time: "2022-07-02"},
]
function getRandomColor() {
    var letters = '3456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }
  
export default function Keyword(params) {
    const [data, setData] = useState([])
    const [lineData, setLineData] = useState([]) 
    const [startTime, setStartTime] = useState()
    const [endTime, setEndTime] = useState()
    const [queryTime, setQueryTime] = useState(null)
    useEffect(()=>{
        setStartTime("2022-06-30")
        setEndTime("2022-07-02")
        setQueryTime("2022-07-01")
    },[])

    useEffect(()=>{
        if(queryTime === null) return 
        // console.log("QueryTime updated, goto update Data")
        let sortedData = TEST_DATA;
        sortedData.sort(function (a, b) {
            return a.time.localeCompare(b.time);
        });
        // console.log(sortedData)
        setData(sortedData);
    },[queryTime])

    useEffect(()=>{
        if(data.length === 0) return
        // console.log("data updated, goto update LineData")
        const dataToLineData = (data)=>{
            const timeset = new Set(data.map(value => value.time))
            let lineData = []
            for (let etime of timeset) {
                let obj = {time:etime}
                for ( let el of data){
                    const {value, count, time} = el
                    if(time === etime)
                        obj[value] = count
                }
                lineData.push(obj)
                
            }
            
            return lineData    
        }
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
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    {
                        (lineData.length!== 0)
                        && Object.keys(Object.values(lineData)[0])
                            .filter(kname=> kname!== 'time' && kname !== '')
                            .map((kname,idx)=><Line name={kname} key={kname} type="monotone" dataKey={kname} stroke={getRandomColor()} />)
                            
                    }
                    
                </LineChart>
            </div>
        </div>
    )
}