class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.prevOperand = ''
        this.operation = undefined
        this.Num = ''
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
        if(this.currentOperand === ''){
            this.currentOperand = this.prevOperand
            this.prevOperand = ''
            this.operation = undefined
        }
    }

    appendNumber(number) {
        if(number == "." && this.currentOperand.includes('.')) return
        if(number === 'π'){
            this.currentOperand = Math.PI
        }
        if(number === 'e'){
            this.currentOperand = Math.E 
        }
        this.currentOperand = this.currentOperand.toString()+number.toString()
        this.Num += number
    }

    chooseOperation(operation) {
        if(this.currentOperand === '' && operation !== '-') return
        if(this.currentOperand !== ''){
            this.compute()
        }
        this.operation = operation

        if(this.operation == 'ln' || this.operation == 'log' ||
        this.operation == 'sqrt' || this.operation == '1/x' ||
        this.operation == 'sin' || this.operation == 'cos' ||
        this.operation == 'tan' || this.operation == 'x²' ||
        this.operation == 'x³' || this.operation == 'x!' ||
        this.operation == '%' || this.operation == 'abs' ||
        this.operation == 'exp' || this.operation == 'cbrt') {
            this.compute()
            this.prevOperand = this.currentOperand
            this.currentOperand = this.currentOperand
        }
        else{
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
        }
    }

    compute() {
        let comp
        const prev = parseFloat(this.prevOperand) || 0
        const current = parseFloat(this.currentOperand)
        if(isNaN(prev) || isNaN(current)) return
        switch(this.operation){
            case '+':
                comp = prev+current
                break
            case '-':
                comp = prev-current
                break
            case '*':
                comp = prev*current
                break
            case '/':
               comp = prev/current
               break
            case 'ln':
                comp = Math.log(current)
                break
            case 'log':
                comp = Math.log10(current)
                break
            case 'sqrt':
                comp = Math.sqrt(current)
                break
            case '1/x':
                comp = 1/current
                break
            case 'sin':
               comp = Math.sin(current)
               break
            case 'cos':
                comp = Math.cos(current)
                break
            case 'tan':
                comp = Math.tan(current)
                break
            case 'x²':
                comp = current*current
                break
            case 'x³':
                comp = current*current*current
                break
            case '%':
               comp = current/100  
               break  
            case 'x!':
                let result = 1;
                for(let i=1; i <= current; i++){
                    result = result * i;
                }
                comp = result
                break
            case 'abs':
                comp = Math.abs(current)
                break
            case 'exp':
                comp = Math.exp(current)
                break
            case 'cbrt':
                comp = Math.cbrt(current)
                break
            default: return
        }

        this.currentOperand = comp

        if(this.operation == 'ln' || this.operation == 'log' ||
        this.operation == 'sqrt' || this.operation == '1/x' ||
        this.operation == 'sin' || this.operation == 'cos' ||
        this.operation == 'tan' || this.operation == 'x²' ||
        this.operation == 'x³' || this.operation == 'x!' ||
        this.operation == '%' || this.operation == 'abs' ||
        this.operation == 'exp' || this.operation == 'cbrt') {this.updateDisplay()}

        else{
            this.operation = undefined
            this.prevOperand = ''
        }
        
    }

    choosing(operation){
        switch(operation){
            case 'sin':
                this.previousOperandTextElement.innerText = `sin(${this.Num})`
                break
            case 'cos':
                this.previousOperandTextElement.innerText = `cos(${this.Num})`
                break
            case 'tan':
                this.previousOperandTextElement.innerText = `tan(${this.Num})`
                break
            case 'ln':
                this.previousOperandTextElement.innerText = `ln(${this.Num})`
                break
            case 'log':
                this.previousOperandTextElement.innerText = `log(${this.Num})`
                break
            case 'sqrt':
                this.previousOperandTextElement.innerText = `sqrt(${this.Num})`
                break
            case 'x²':
                this.previousOperandTextElement.innerText = `(${this.Num})²`
                break
            case 'x³':
                this.previousOperandTextElement.innerText = `(${this.Num})³`
                break
            case 'x!':
                this.previousOperandTextElement.innerText = `(${this.Num})!`
                break
            case 'abs':
                this.previousOperandTextElement.innerText = `abs(${this.Num})`
                break
            case 'exp':
                this.previousOperandTextElement.innerText = `e^${this.Num}`
                break
            case 'cbrt':
                this.previousOperandTextElement.innerText = `cbrt(${this.Num})`
            default: return
        }
    }

    getDisplayNum(number){
        const snum = number.toString()
        const intDigits = parseFloat(snum.split('.')[0])
        const decDigits = snum.split('.')[1]
        let intDisplay
        if(isNaN(intDigits)){
            intDisplay= ''
        }
        else{
            intDisplay = intDigits.toLocaleString(('en'), {maximumFractionDigits: 0})

        }
        if(decDigits != null){
            return `${intDisplay}.${decDigits}`
        }
        else{
            return intDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
            this.getDisplayNum(this.currentOperand)
        if(this.operation != null){
            if(this.operation == 'ln' || this.operation == 'log' ||
            this.operation == 'sqrt' || this.operation == '1/x' ||
            this.operation == 'sin' || this.operation == 'cos' ||
            this.operation == 'tan' || this.operation == 'x²' ||
            this.operation == 'x³' || this.operation == 'x!' ||
            this.operation == '%' || this.operation == 'abs' ||
            this.operation == 'exp' || this.operation == 'cbrt') {this.choosing(this.operation)}

            else{
                this.previousOperandTextElement.innerText = 
                    `${this.getDisplayNum(this.prevOperand)}${this.operation}`
            }
        }
        else{
            this.previousOperandTextElement.innerText = ''
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const equalButton = document.querySelector('[data-equal]')
const prevOperandTextElement = document.querySelector("[data-prev-op]")
const currentOperandTextElement = document.querySelector("[data-current-op]")
const themeToggle = document.querySelector('.theme-toggle')
const wrap = document.querySelector('.wrapper')
const buttons = document.querySelectorAll('.button')

const calc = new Calculator(prevOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerText)
        calc.updateDisplay()
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerText)
        calc.updateDisplay()
    })
})

clearButton.addEventListener('click', () => {
    calc.clear()
    calc.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calc.delete()
    calc.updateDisplay()
})

equalButton.addEventListener('click', () => {
    calc.compute()
    calc.updateDisplay()
})

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    themeToggle.classList.toggle('dark')
    wrap.classList.toggle('dark')
    numberButtons.forEach(b =>{
        b.classList.toggle('dark')        
    })
    operatorButtons.forEach(bu =>{
        bu.classList.toggle('dark')        
    })
    prevOperandTextElement.classList.toggle('dark')
    currentOperandTextElement.classList.toggle('dark')
})
