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

    delete() {}
    appendNumber(number) {
        this.currentOperand = this.currentOperand.toString()+number.toString()
    }
    chooseOperation(operation) {}
    compute() {}
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
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
