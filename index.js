const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight


const cellsize = 10
const delta = 1

//создание клетки
class Cell {
    constructor(position) {
        this.position = position
        this.color = 'white'
        this.nextcolor = 'white'
    }
    draw(){
        c.fillStyle = this.color
        c.fillRect(this.position.x - delta, this.position.y - delta, cellsize - delta, cellsize - delta)
        c.fill()
        c.closePath()
    }
} 

//создание сетки
const gridwidth = 100
const gridheight = 71
let grid = []
for (let i = 0; i < gridheight; i++) { //проходимся по каждой строке 
    let array = []
    for (let j = 0; j < gridwidth; j++) { //проходится по каждому элементу в строке
        let cell = new Cell({x: j * cellsize, y: i * cellsize})
        array.push(cell)
    }
    grid.push(array)
}

for (let i = 0; i < gridheight; i++) { //проходимся по каждой строке 
    for (let j = 0; j < gridwidth; j++) { //проходится по каждому элементу в строке
        grid[i][j].draw()
    } //рисуем сеточку :3
}

//ВСЕ ПРАВИЛА ИГРЫ ЖИЗНЬ

function animate(){
    for (let i = 0; i < gridheight; i++) { //проходимся по каждой строке 
        for (let j = 0; j < gridwidth; j++) { //проходится по каждому элементу в строке
            let cnt = 0
            if(grid[(i + 1) % gridheight][(j + 1) % gridwidth].color == 'green'){ cnt++ }
            if(grid[(i + 1) % gridheight][j].color == 'green'){ cnt++ }
            if(grid[i][(j + 1) % gridwidth].color == 'green'){ cnt++ }
            if(grid[(i - 1 + gridheight) % gridheight][(j - 1 + gridwidth) % gridwidth].color == 'green'){ cnt++ }
            if(grid[i][(j - 1 + gridwidth) % gridwidth].color == 'green'){ cnt++ }
            if(grid[(i - 1 + gridheight) % gridheight][j].color == 'green'){ cnt++ }
            if(grid[(i + 1) % gridheight][(j - 1 + gridwidth) % gridwidth].color == 'green'){ cnt++ }
            if(grid[(i - 1 + gridheight) % gridheight][(j + 1) % gridwidth].color == 'green'){ cnt++ }
    
            if(grid[i][j].color == 'white'){
                if(cnt == 3){
                    grid[i][j].nextcolor = 'green'
                }
                else{
                    grid[i][j].nextcolor = 'white'
                }
            }
            if(grid[i][j].color == 'green'){
                if(cnt < 2 || cnt > 3){
                    grid[i][j].nextcolor = 'white'
                }
                else{
                    grid[i][j].nextcolor = 'green'
                }
            }
        }
    }
    
    
    for (let i = 0; i < gridheight; i++) { //проходимся по каждой строке 
        for (let j = 0; j < gridwidth; j++) { //проходится по каждому элементу в строке
            grid[i][j].draw()
            grid[i][j].color = grid[i][j].nextcolor
        }
    }
}


let an //сделали эн глобальным -- теперь он имеет доступ, а раньше не имел тк был в эвентлистенере
let isPlaying //булевая переменная

//кнопочки
//кнопка начать
function PB() {
            if(!isPlaying){ //если оно уже проигрывается, то не проигрываем второй раз
                an = setInterval(animate, 100) //выполнять функцию анимэйт -- запустили анимацию
            }
            isPlaying = true
}

//кнопка стоп
function SB() {
            isPlaying = false
            clearInterval(an) //пауза -- очищение переменной эн -- отмена запуска анимации
}

//кнопка рандом
function RB() {
            isPlaying = false
            clearInterval(an)
            for (let i = 0; i < gridheight; i++) { //проходимся по каждой строке 
                for (let j = 0; j < gridwidth; j++) { //проходится по каждому элементу в строке
                    if(Math.random() > 0.4){
                        grid[i][j].color = 'white'
                        grid[i][j].nextcolor = 'white'
                    }
                    else{
                        grid[i][j].color = 'green'
                        grid[i][j].nextcolor = 'white'
                    }
                    grid[i][j].draw()
                }
            }
} 

//кнопка очистки
function CB() {
            isPlaying = false
            clearInterval(an)
            for (let i = 0; i < gridheight; i++) { //проходимся по каждой строке 
                for (let j = 0; j < gridwidth; j++) { //проходится по каждому элементу в строке
                    grid[i][j].color = 'white' //каждую клеточку делаем белой, а потом зарисовываем
                    grid[i][j].nextcolor = 'white'
                    grid[i][j].draw()
                }
            }
}

addEventListener('click', mouse => {
    let inew = Math.floor(mouse.clientY / cellsize), 
    jnew = Math.floor(mouse.clientX / cellsize)
    grid[inew][jnew].color = 'green'
    grid[inew][jnew].draw()
    console.log(mouse.clientX, mouse.clientY)
})



addEventListener('click', mouse => {
        closeStudyscreenLife()
})

//экран обучения
function closeStudyscreenLife(){
    let sl = document.getElementById("studyLife");
    sl.style.display="none";
}
