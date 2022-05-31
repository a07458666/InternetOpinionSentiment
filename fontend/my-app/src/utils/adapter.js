import {KeywordData} from '../model'
import moment from 'moment'

export default class DataAdapter{
    
    // Adapte to KeyWordDataList for Keyword Page
    static rawDataToKeyWordData(rawDataList){
        let keyWordDataDict = {}  // {   `${Company}-${yyyymmdd}`:  {  Company: str, Timestamp: str/YYYY-MM-DD/, Count:int }   }
        rawDataList.forEach(obj=>{
            const {Company, Timestamp, Count} = obj
            const yyyymmdd = moment(Timestamp).format('YYYY-MM-DD')
            if(`${Company}-${yyyymmdd}` in keyWordDataDict){
                keyWordDataDict[`${Company}-${yyyymmdd}`].count += Count
            }else{
                obj.Timestamp = yyyymmdd
                keyWordDataDict[`${Company}-${yyyymmdd}`] = new KeywordData(Company, Count, yyyymmdd)
            }
    
        })
        let keyWordDataList = Object.values(keyWordDataDict)
        return keyWordDataList
    }  

    // Adapte to LineDataList for LineChart 
    static keywordDataToLineData(keywordDataList){
        const timeset = new Set(keywordDataList.map(value => value.date))
        let lineDataList = []
        for (let etime of timeset) {
            let obj = {date:etime}
            for ( let el of keywordDataList){
                const {company, count, date} = el
                if(date === etime)
                    obj[company] = count
            }
            lineDataList.push(obj)
            
        }
        return lineDataList    
    }
}
