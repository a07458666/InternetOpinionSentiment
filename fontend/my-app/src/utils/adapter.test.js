import DataAdapter  from './adapter'
describe('DataAdapter', () => {
    
  test('rawDataToKeyWordData', () => {
      const TEST_DATA = [
          { Company:"TSMC",Count:2,Timestamp: "2022-07-01"},
          { Company:"TSMC",Count:2,Timestamp: "2022-07-01"},
          { Company:"TSMC",Count:190,Timestamp: "2022-06-30"},
          { Company:"TSMC",Count:120,Timestamp: "2022-07-02"},
          { Company:"ASML",Count:10,Timestamp: "2022-06-30"},
          { Company:"ASML",Count:60,Timestamp: "2022-07-01"},
          { Company:"ASML",Count:70,Timestamp: "2022-07-02"},
          { Company:"Intel",Count:20,Timestamp: "2022-06-30"},
          { Company:"Intel",Count:30,Timestamp: "2022-07-01"},
          { Company:"Intel",Count:40,Timestamp: "2022-07-02"},
      ]
      expect(DataAdapter.rawDataToKeyWordData(TEST_DATA)).toBeTruthy();
  });
  test('keywordDataToLineData', () => {
      const TEST_DATA = [
          {
            "Timestamp": "2022-05-11T08:44:07.245Z",
            "Count": 12,
            "Company": "ASML",
            "_id": "627b7757abd22a145b8e7115",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:07.247Z",
            "Count": 2,
            "Company": "Intel",
            "_id": "627b7757abd22a145b8e7116",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:18.029Z",
            "Count": 4,
            "Company": "ASML",
            "_id": "627b7762abd22a145b8e7117",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:18.031Z",
            "Count": 1,
            "Company": "Intel",
            "_id": "627b7762abd22a145b8e7118",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:23.383Z",
            "Count": 5,
            "Company": "ASML",
            "_id": "627b7767abd22a145b8e7119",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:23.385Z",
            "Count": 2,
            "Company": "Intel",
            "_id": "627b7767abd22a145b8e711a",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:30.230Z",
            "Count": 0,
            "Company": "ASML",
            "_id": "627b776eabd22a145b8e711b",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:30.232Z",
            "Count": 0,
            "Company": "Intel",
            "_id": "627b776eabd22a145b8e711c",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:38.041Z",
            "Count": 2,
            "Company": "ASML",
            "_id": "627b7776abd22a145b8e711d",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:38.043Z",
            "Count": 0,
            "Company": "Intel",
            "_id": "627b7776abd22a145b8e711e",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:44.473Z",
            "Count": 5,
            "Company": "ASML",
            "_id": "627b777cabd22a145b8e711f",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:44.475Z",
            "Count": 0,
            "Company": "Intel",
            "_id": "627b777cabd22a145b8e7120",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:49.931Z",
            "Count": 0,
            "Company": "ASML",
            "_id": "627b7781abd22a145b8e7121",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:49.933Z",
            "Count": 0,
            "Company": "Intel",
            "_id": "627b7781abd22a145b8e7122",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:59.938Z",
            "Count": 0,
            "Company": "ASML",
            "_id": "627b778babd22a145b8e7123",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:44:59.944Z",
            "Count": 0,
            "Company": "Intel",
            "_id": "627b778babd22a145b8e7124",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:45:05.345Z",
            "Count": 0,
            "Company": "ASML",
            "_id": "627b7791abd22a145b8e7125",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:45:05.347Z",
            "Count": 0,
            "Company": "Intel",
            "_id": "627b7791abd22a145b8e7126",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:45:10.956Z",
            "Count": 0,
            "Company": "ASML",
            "_id": "627b7796abd22a145b8e7127",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:45:10.958Z",
            "Count": 0,
            "Company": "Intel",
            "_id": "627b7796abd22a145b8e7128",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:46:29.547Z",
            "Count": 0,
            "Company": "ASML",
            "_id": "627b77e5cc8fcf8ade1d1d38",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:46:29.549Z",
            "Count": 0,
            "Company": "Intel",
            "_id": "627b77e5cc8fcf8ade1d1d39",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:46:35.303Z",
            "Count": 0,
            "Company": "ASML",
            "_id": "627b77ebcc8fcf8ade1d1d3a",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:46:35.305Z",
            "Count": 0,
            "Company": "Intel",
            "_id": "627b77ebcc8fcf8ade1d1d3b",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:46:40.556Z",
            "Count": 0,
            "Company": "ASML",
            "_id": "627b77f0cc8fcf8ade1d1d3c",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:46:40.557Z",
            "Count": 0,
            "Company": "Intel",
            "_id": "627b77f0cc8fcf8ade1d1d3d",
            "Date": "Week1"
          },
          {
            "Timestamp": "2022-05-11T08:46:45.781Z",
            "Count": 0,
            "Company": "ASML",
            "_id": "627b77f5cc8fcf8ade1d1d3e",
            "Date": "Week1"
          }
      ]
        
      
      expect(DataAdapter.keywordDataToLineData(TEST_DATA)).toBeTruthy();
  });
});



