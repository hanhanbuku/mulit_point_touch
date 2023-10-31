/**
 * 计算余弦相似度
 */
export declare function cosineSimilarity(array1: number[], array2: number[]): number;
/**
 * 计算两组坐标的相似度
 * @param vector1 数组1
 * @param vector2 数组2
 * @param threshold 阈值
 */
export declare function handleSimilarity(vector1: number[][], vector2: number[][], threshold: number): boolean | undefined;
/**
 * 采用类的方式进行debug配置
 */
export declare class MultiPointTouch {
    private isDev;
    constructor(options: {
        debugger?: boolean;
    });
    cosineSimilarity(array1: number[], array2: number[]): number;
    handleSimilarity(vector1: number[][], vector2: number[][], threshold: number): boolean | undefined;
}
