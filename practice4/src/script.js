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
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number) {
        if(number == "." && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString()+number.toString()
    }

    chooseOperation(operation) {
        if(this.currentOperand === '') return
        if(this.currentOperand !== ''){
            this.compute()
        }
        this.operation = operation
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let comp
        const prev = parseFloat(this.prevOperand)
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
            default: return
        }
        this.currentOperand = comp
        this.operation = undefined
        this.prevOperand = ''
        
    }

    getDisplayNum(number){
        const snum = number.toString()
        const intDigits = parseFloat(snum.split('.')[0])
        const decDigits = snum.split('.')[1]
        let intDisplay
        if(isNaN(intDisplay)){
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
            this.previousOperandTextElement.innerText = 
                `${this.getDisplayNum(this.prevOperand)}${this.operation}`
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