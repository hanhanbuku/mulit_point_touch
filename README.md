# 多点位触控识别（用于比对两组触控点的相似性）

## 介绍
>本工具可用于比对两组二维数组的相似性，提供了余弦相似度以及多边相似度两种比对方法。主要用于h5电子印章使用场景，需要用户自行收集两组触控坐标然后调用本工具进行比对（用户可根据dom的touch事件获取到本次点击事件的所有触控点坐标，包括多点位）

## 使用
安装
```shell
npm i @itachi3/mulit-point-touch
```
共暴露了三种使用方法
- handleSimilarity：多边长识别
- cosineSimilarity：余弦相似性识别
- MultiPointTouch：暴露上述两种方式的同时提供debugger信息打印，可帮助排错

### handleSimilarity
```js
import { handleSimilarity } from '@itachi3/mulit-point-touch';

/**
 * params1:比对组1，type:number[][]
 * params2:比对组2，type:number[][]
 * params3:比对阈值
 */
handleSimilarity(
    [[1,2],[2,3],[3,4]],
    [[2,4],[2,4],[3,4]],
    10)
```
### cosineSimilarity
```js
import { cosineSimilarity } from '@itachi3/mulit-point-touch';

/**
 * params1:比对组1，type:number[][]
 * params2:比对组2，type:number[][]
 */
cosineSimilarity([[1,2],[2,3],[3,4]],
    [[2,4],[2,4],[3,4]],)
```
### MultiPointTouch
```js
// 这是一个类，暴露上面两种方法，同时提供打印数据，可用于排错
import { MultiPointTouch } from '@itachi3/mulit-point-touch';

const pointTouch = new MultiPointTouch({
    debugger:true
})
pointTouch.handleSimilarity()
pointTouch.cosineSimilarity()
```
更详细的解析和实现过程请移步[移动端电子印章解决方案](https://hanhanbuku.github.io/my_blog_vuepress/pages/867939/)
