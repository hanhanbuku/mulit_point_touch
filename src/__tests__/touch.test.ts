import { handleSimilarity,cosineSimilarity,MultiPointTouch } from '../index';

/**
 * 测试边长识别
 */
test('测试边长识别函数', () => {
    expect(handleSimilarity([[1,2],[2,3],[3,4]],[[2,4],[2,4],[3,4]],10));
});
/**
 * 测试余弦相似性识别
 */
test('测试余弦相似性识别', () => {
    expect(cosineSimilarity([1,2,3,4,5,6],[2,3,4,5,6,7]));
});
/**
 * 测试debugger
 */
test('测试debugger', () => {
    const pointTouch = new MultiPointTouch({
        debugger:true
    })
    expect(pointTouch.handleSimilarity([[1,2],[2,3],[3,4]],[[2,4],[2,4],[3,4]],10));
});
