import moment from 'moment';

function getRandomColor() {
    var letters = '3456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}
function dataToLineData(data){
    const timeset = new Set(data.map(value => value.Timestamp))
    let lineData = []
    for (let etime of timeset) {
        let obj = {Timestamp:etime}
        for ( let el of data){
            const {Company, Count, Timestamp} = el
            if(Timestamp === etime)
                obj[Company] = Count
        }
        lineData.push(obj)
        
    }
    return lineData    
}

function preprocess_data(data){
    let preprocessed = {}  // {   `${Company}-${yyyymmdd}`:  {  Company: str, Timestamp: str/YYYY-MM-DD/, Count:int }   }
    data.forEach(obj=>{
        const {Company, Timestamp, Count} = obj
        const yyyymmdd = moment(Timestamp).format('YYYY-MM-DD')
        if(`${Company}-${yyyymmdd}` in preprocessed){
            preprocessed[`${Company}-${yyyymmdd}`].Count += Count
        }else{
            if(Count === 0) obj.Count++
            obj.Timestamp = yyyymmdd
            preprocessed[`${Company}-${yyyymmdd}`] = obj

        }

    })
    return Object.values(preprocessed)

}  
export {getRandomColor,dataToLineData,preprocess_data}