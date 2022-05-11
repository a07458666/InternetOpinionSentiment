
function getkeyword(startTime, endTime){
    return [
        {
            'time': 'fake_time_1',
            'keyword': 'keyword_1',
            'count':  123 
        },
        {
            'time': 'fake_time_2',
            'keyword': 'keyword_2',
            'count':  456
        }
    ];
}

module.exports = {
    'getkeyword': getkeyword
}