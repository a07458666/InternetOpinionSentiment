import { getRandomColor} from './helper'
describe('helper', () => {
    test('getRandomColor', () => {
        expect(getRandomColor()).toMatch(/#[\dABCDEF]{6}/);
    });
    
    
});



