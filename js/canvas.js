(function (window) {
  const canvas = document.getElementById('jellyfish')
  const upPage = document.getElementsByClassName('up')[0]
  const c = canvas.getContext('2d')

  var w, h // up页面宽高，作基准用
  var colors = ['#A64AB1', '#B64CB1', '#C64DB1', '#D64AB1', '#E64AB1', '#FFF'] // 颜色库
  var jellyfishes = [] // 水母库
  var animationID = undefined // requestAnimationFrame  ID
  var fishNum = 40 // 水母数量
  var r = 1 // 作图基准半径

  // 初始化w,h,canvas尺寸
  function refreshSize() {
    w = canvas.width = upPage.offsetWidth
    h = canvas.height = upPage.offsetHeight
  }; refreshSize();

  // 水母类
  class Jellyfish {
    constructor(x, y, r, color) {
      // 基本配置
      this.x = x
      this.y = y
      this.r = r
      this.color = color
      this.speed = 5
      this.dx = 0
      this.dy = this.speed + Math.random() * 0.5
    }
    // 画图
    draw() {
      // 画图基本配置
      let long = this.r * 22
      let lineR = this.r * 12
      let lineNum = 100
      let bodyColor = '#FFF'
      let headColor = this.color
      let range = { dx: undefined, dy: undefined }
      let a = Math.random() * 15 + 5

      c.save()
      c.fillStyle = bodyColor
      c.shadowColor = bodyColor
      c.shadowBlur = 20
      c.beginPath()
      c.arc(this.x, this.y - this.r, this.r * 2, 0, Math.PI * 2, true)
      c.fill()
      c.restore()

      c.save()
      c.strokeStyle = bodyColor
      for (let i = 0; i < lineNum; i++) {
        a *= -1
        range.dx = -Math.random() * 20 + 10
        range.dy = Math.random() * 5 + 15
        c.beginPath()
        c.moveTo(this.x, this.y)
        c.quadraticCurveTo(this.x + range.dx, this.y + range.dy, this.x + a, this.y + long);
        c.stroke()
      }
      c.restore()

      c.save()
      c.globalAlpha = 0.5
      for (let i = 1; i <= lineNum; i++) {
        let targetX = this.x + lineR * Math.cos(i * Math.PI / lineNum)
        let targetY = this.y - this.r - lineR * Math.sin(i * Math.PI / lineNum)
        let controlX = this.x + Math.random() * lineR * Math.cos(i * Math.PI / lineNum)
        let controlY = this.y - this.r - Math.random() * lineR * Math.sin(i * Math.PI / lineNum)
        let gradient = c.createLinearGradient(this.x, this.y - this.r, targetX, targetY);
        gradient.addColorStop(0, headColor);
        gradient.addColorStop(1, 'rgba(255,255,255,0.2)');
        c.strokeStyle = gradient
        c.beginPath()
        c.moveTo(this.x, this.y - this.r)
        c.quadraticCurveTo(controlX, controlY, targetX, targetY);
        c.stroke()
      }
      c.restore()
    }
    // 去掉跑到页面外的水母，新建水母
    createJellyfish(jellyfishes = []) {
      let i = jellyfishes.indexOf(this)
      jellyfishes.splice(i, 1)
      let x = Math.random() * 0.8 * w + 0.1 * w
      let y = Math.random() * h
      let color = colors[parseInt(Math.random() * colors.length)]
      jellyfishes.push(new Jellyfish(x, y, this.r, color))
    }
    // 更新水母的位置
    update(jellyfishes = []) {
      if (this.y - this.r < 0)
        this.createJellyfish(jellyfishes)
      this.x += this.dx
      this.y -= this.dy
      this.draw()
    }
  }


  // 初始化up并开启动画
  initAndLoop()

  function initAndLoop() {
    // 初始化水母数组
    function init() {
      for (let i = 0; i < fishNum; i++) {
        let color = colors[parseInt(Math.random() * colors.length)]
        let x = Math.random() * 0.8 * w + 0.1 * w
        let y = Math.random() * 0.9 * h + 0.1 * h
        jellyfishes.push(new Jellyfish(x, y, r, color))
      }
    }; init();
    // 开启动画
    function loop() {
      upPage.addEventListener('animationend', function () {
        jellyfishes = []
        window.cancelAnimationFrame(animationID);
        animationID = undefined
      })
      animationID = requestAnimationFrame(loop)
      refreshSize()
      jellyfishes.forEach(f => f.update(jellyfishes))
      // console.log(1);
    }; loop();
  }
})(window)
