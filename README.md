# 制作个人简历

## 源码文件层级导航

```jsx
introduce
	|————common						||公共文档文件夹
		|————normalize.css				||格式化CSS文档
	|————css						||CSS样式文件夹
		|————index.css					||网页样式文档
	|————js							||js逻辑代码文件夹
		|————canvas.js					||firstPage up canvas(水母)动画实现
		|————jquery1.11.3.min.js     	                || jQuery函数库
		|————pages.js					||网页页面逻辑实现
	|————index.html					        ||索引页面
	|————README.md					        ||个人简历源码内容简介
```

## 源码说明

在 index 中使用了 bootstrap 框架，目的是为了响应 式的适用于网页和手机端的显示，但是因为网页整体页面比较简单，实际项目代码中，对响应式的要求并不高。

在 page.js 中主要使用 jQuery 函数库来操作 DOM，主要应用方面在于向对应 DOM 中添加 CSS 动画类，使用这种方式，好处是逻辑简单，减轻的代码量；但是弊端就是造成了 CSS，HTML，JS 三者之间的耦合度增加，不利于代码维护；在 page.js 中，另一个特点就是，动画较多，包括父子元素特有的动画，在这里阻止了事件冒泡，防止监听动画结束事件之间的相互影响；还有就是动画结束之后，再执行某个动画操作，为了避免产生回调地狱，使用了生成器函数，用同步代码的表现方式实现代码的异步执行。

在 canvas.js 中主要侧重于对 canvas 2D API 的使用；参考[Canvas API 中文文档首页地图](https://www.canvasapi.cn/index)；还有针对`requestAnimationFrame()`在动画中的使用，要明确如何触发动画的执行。并对其做兼容性处理。
