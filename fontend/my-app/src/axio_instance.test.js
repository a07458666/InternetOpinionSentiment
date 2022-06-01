import axio_instance from './axio_instance'
import MockAdapter from 'axios-mock-adapter'

describe('axio', () => {
  let mock;
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  // error test
  test('500', () => {
    mock = new MockAdapter(axio_instance)
    mock.onGet('status500/').reply(500, {})
    const logSpy = jest.spyOn(console, 'log');
    return axio_instance.get('status500/')
                        .catch(error=>expect(logSpy).toHaveBeenCalledWith('程式發生問題'))
  });
  test('505', () => {
    mock = new MockAdapter(axio_instance)
    mock.onGet('status505/').reply(505, {})
    return axio_instance.get('status505/')
                        .catch((error)=>expect(error).toBeTruthy())
  });
  test('404', async() => {
    mock = new MockAdapter(axio_instance)
    mock.onGet('wrong-suburl/').reply(404, {})
    const logSpy = jest.spyOn(console, 'log');
    return axio_instance.get('wrong-suburl/')
           .catch(error=>expect(logSpy).toHaveBeenCalledWith('你要找的頁面不存在'))
  });
  test('error', async() => {
    mock = new MockAdapter(axio_instance)
    mock.onGet('error/').reply(404, {})
    const logSpy = jest.spyOn(console, 'log');
    return axio_instance.get('error/')
           .catch(error=>expect(logSpy).toHaveBeenCalledWith('你要找的頁面不存在'))
  });
  
  test('200 and status normal', () => {
    const dataRequest = { 
      params: {
       startTime: "2022-04-01", 
       endTime: "2022-05-30"
      }
    }
    return axio_instance.get('getkeyword',dataRequest).then(data=>{
      expect(data).toBeDefined();
    })
  });
  test('200 and status error', () => {
    mock = new MockAdapter(axio_instance)
    mock.onGet('getkeyword').reply(200, {status:"error",error_msg:"fake error"})
    return axio_instance.get('getkeyword')
                        .catch(error=>expect(error.message).toEqual("fake error"))
  });
  test('200 and status error, msg == null', () => {
    mock = new MockAdapter(axio_instance)
    mock.onGet('getkeyword').reply(200, {status:"error",error_msg:null})
    return axio_instance.get('getkeyword')
                        .catch(error=>expect(error.message).toEqual("No ERROR MSG SHOW"))
  });
  afterEach(()=>{
    mock.restore();
  })


});


