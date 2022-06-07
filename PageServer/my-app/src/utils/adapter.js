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
    static keywordDataToLineData(keywordDataList,startTime,endTime){
        const timeset = new Set(keywordDataList.map(value => value.date))
        const companyset = new Set(keywordDataList.map(value => value.company))
        let lineDataList = []
    
        if(startTime && !timeset.has(startTime)){
            let obj = {date:moment(startTime).format('MM-DD')}
            companyset.forEach(company=>{obj[company] = 0})
            lineDataList.push(obj)
        }
        
        for (let etime of timeset) {
            let obj = {date:moment(etime).format('MM-DD')}
            for ( let el of keywordDataList){
                const {company, count, date} = el
                if(date === etime)
                    obj[company] = count
            }
            lineDataList.push(obj)   
        }

        if(endTime && !timeset.has(endTime)){
            let obj = {date:moment(endTime).format('MM-DD')}
            companyset.forEach(company=>{obj[company] = 0})
            lineDataList.push(obj)
        }
        return lineDataList    
    }

    static keywordDataToWorldCloudData(keywordDataList){

        const companyset = new Set(keywordDataList.map(value => value.company))
        let max_cnt = null
        let min_cnt = null

        const tmp_list = Array.from(companyset).map(cmp=>{
            let total_count = 0
            keywordDataList
                .filter(({company})=> company === cmp)
                .forEach(({count})=>{total_count+=count})
        
            if(max_cnt === null || total_count > max_cnt) max_cnt = total_count
            if(min_cnt === null || total_count < min_cnt) min_cnt = total_count

            return {company:cmp,count:total_count}
        })

        return tmp_list.map(({company, count})=>{
            let weight =  Math.round( (count - min_cnt) / (max_cnt - min_cnt) * 7 + 3)
            weight = parseInt(weight / 2) * 2 
            if(weight <= 2) weight += 2
            console.log(`${company} - ${weight}`)
            const value = company
            return [value,weight,count]
        })
          
    }
}
