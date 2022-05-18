const should = require('should')
const utils = require('../dbapi/utils')

describe('util: loadCFG', ()=>{
    it('should return false when path not given', done=>{
        var cfg = utils.loadCFG()
        cfg.should.be.false
        done()
    })

    it('should load json config correctly', done=>{
        var cfg = utils.loadCFG('test/db_cfg.json')
        cfg.uri.should.equal("127.0.0.1:27017")
        cfg.usr.should.equal("user")
        cfg.pwd.should.equal("password")
        cfg.database_name.should.equal("example_db")
        cfg.collection_name.should.equal("example_collection")

        done()
    })
})

describe('util: makeReturnTemplate', ()=>{
    it('should return a standard return template', done=>{
        var template = utils.makeReturnTemplate()
 
        var has_satus       = template["status"]!==undefined
        var has_error_msg   = template["error_msg"]!==undefined
        var has_data        = template["data"]!==undefined
        var has_query_id    = template["query_id"]!==undefined

        has_satus.should.equal(true)
        has_error_msg.should.be.equal(true)
        has_data.should.be.equal(true)
        has_query_id.should.be.equal(true)
        Array.isArray(template["data"]).should.equal(true)

        done()
    })
})

describe('util: getDateStr', ()=>{
    it('should return today\'s date when date string not given', done=>{
        var date = utils.getDateStr()

        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0')
        var mm = String(today.getMonth() + 1).padStart(2, '0')
        var yyyy = today.getFullYear()

        today = `${yyyy}-${mm}-${dd}`

        date.should.equal(today)
        done()
    })

    it('should complie date string to yyyy-mm-dd format', done=>{
        var date1 = utils.getDateStr('2022,May,10')
        var date2 = utils.getDateStr('3/12/2000')

        date1.should.equal('2022-05-10')
        date2.should.equal('2000-03-12')

        done()
    })
})

describe('util: checkTimeFormat', ()=>{
    it('should check input is string', done=>{
        utils.checkTimeFormat(123).should.equal(false)
        utils.checkTimeFormat(11.5).should.equal(false)
        utils.checkTimeFormat({}).should.equal(false)
        utils.checkTimeFormat().should.equal(false)

        utils.checkTimeFormat('2000-00-00').should.equal(true)

        done()
    })

    it('should check input is yyyy-mm-dd format', done=>{
        utils.checkTimeFormat('2022/05/12').should.equal(false)
        utils.checkTimeFormat('05-12-2022').should.equal(false)
        utils.checkTimeFormat('xxxx-yy-dd').should.equal(false)
        utils.checkTimeFormat('abcdefgh').should.equal(false)
        

        utils.checkTimeFormat('2022-05-12').should.equal(true)
        done()
    })
})
