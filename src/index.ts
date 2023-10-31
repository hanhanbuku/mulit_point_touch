// 计算两个向量的点积
function dotProduct(vector1:number[], vector2:number[]) {
    let dot = 0;
    for (let i = 0; i < vector1.length; i++) {
        dot += vector1[i] * vector2[i];
    }
    return dot;
}

// 计算向量的模长（范数）
function vectorLength(vector:number[]) {
    let sum = 0;
    for (let i = 0; i < vector.length; i++) {
        sum += vector[i] * vector[i];
    }
    return Math.sqrt(sum);
}

/**
 * 计算余弦相似度
 */
export function cosineSimilarity(array1:number[][], array2:number[][]) {
    // 将二维数组转换为一维向量
    const vector1:number[] = array1.flat();
    const vector2:number[] = array2.flat();
    const dot = dotProduct(vector1, vector2);
    const length1 = vectorLength(vector1);
    const length2 = vectorLength(vector2);
    return dot / (length1 * length2);
}

// 计算二维数组内所有坐标点之间的距离
function handleCalculatedDistance(pointsArray:number[][]) {
    // 计算两点之间的距离
    function calculateDistance(point1:number[], point2:number[]) {
        const deltaX = point1[0] - point2[0];
        const deltaY = point1[1] - point2[1];
        return Math.hypot(deltaX, deltaY);
    }
    const reslut = []
    // 遍历数组并计算每对点之间的距离
    for (let i = 0; i < pointsArray.length; i++) {
        for (let j = i + 1; j < pointsArray.length; j++) {
            const point1 = pointsArray[i];
            const point2 = pointsArray[j];
            const distance = calculateDistance(point1, point2);
            reslut.push(distance)
        }
    }
    return reslut
}

/**
 * 计算两组坐标的相似度
 * @param vector1 数组1
 * @param vector2 数组2
 * @param threshold 阈值
 */
export function handleSimilarity(vector1:number[][], vector2:number[][],threshold:number) {
    if (vector1.length !== vector2.length) return
    // 升序排列数组
    const sortVector1 = vector1.sort((a, b) => {
        return a[0] - b[0];
    });
    const sortVector2 = vector2.sort((a, b) => {
        return a[0] - b[0];
    });
    const reslut1 = handleCalculatedDistance(sortVector1).sort()
    const reslut2 = handleCalculatedDistance(sortVector2).sort()
    let exceedNum = 0 //超出接受范围外的边数量
    for (let i = 0; i < reslut1.length; i++) {
        if (Math.abs(reslut1[i] - reslut2[i]) > threshold) {
            exceedNum++
        }
    }
    return exceedNum === 0
}

/**
 * 采用类的方式进行debug配置
 */
export class MultiPointTouch{
    private isDev: boolean;
    constructor(options:{
        debugger?:boolean
    }) {
        this.isDev = options.debugger||false
    }

    cosineSimilarity(array1:number[][], array2:number[][]) {
        // 将二维数组转换为一维向量
        const vector1:number[] = array1.flat();
        const vector2:number[] = array2.flat();
        const dot = dotProduct(vector1, vector2);
        const length1 = vectorLength(vector1);
        const length2 = vectorLength(vector2);
        if(this.isDev){
            console.log('向量的模长1:'+ length1)
            console.log('向量的模长2:'+ length2)
            console.log('向量的点积:'+ dot)
        }
        return dot / (length1 * length2);
    }

    handleSimilarity(vector1:number[][], vector2:number[][],threshold:number) {
        if(this.isDev){
            if (vector1.length !== vector2.length){
                console.warn('两数组长度不相同无法比对！')
            }
        }
        if (vector1.length !== vector2.length) return
        // 升序排列数组
        const sortVector1 = vector1.sort((a, b) => {
            return a[0] - b[0];
        });
        const sortVector2 = vector2.sort((a, b) => {
            return a[0] - b[0];
        });
        const reslut1:number[] = handleCalculatedDistance(sortVector1).sort()
        const reslut2:number[] = handleCalculatedDistance(sortVector2).sort()
        if(this.isDev){
            console.log('数组一各点排列组合值：'+reslut1)
            console.log('数组二各点排列组合值：'+reslut2)
        }
        let exceedNum = 0 //超出接受范围外的边数量
        for (let i = 0; i < reslut1.length; i++) {
            if(this.isDev){
                console.log(`边距${i+1}比对是否通过:` + ((Math.abs(reslut1[i] - reslut2[i])) > 10))
            }
            if (Math.abs(reslut1[i] - reslut2[i]) > threshold) {
                exceedNum++
            }
        }
        return exceedNum === 0
    }
}




