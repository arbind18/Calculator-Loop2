"use client"

import { useState } from "react"
import { Calculator, Percent, Divide, Hash, ArrowRightLeft } from "lucide-react"
import { FinancialCalculatorTemplate, ResultCard } from "@/components/calculators/templates/FinancialCalculatorTemplate"

function SimpleInput({ label, value, onChange, placeholder }: { label?: string, value: number, onChange: (val: number) => void, placeholder?: string }) {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-muted-foreground">{label}</label>}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        placeholder={placeholder}
        className="w-full p-4 rounded-xl bg-secondary/20 border border-transparent hover:border-primary/30 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all outline-none font-medium text-lg"
      />
    </div>
  )
}

export function BasicCalculator() {
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [operation, setOperation] = useState("add")
  const [result, setResult] = useState<any>(null)

  const calculate = () => {
    let res = 0
    let symbol = "+"
    
    switch (operation) {
      case "add":
        res = num1 + num2
        symbol = "+"
        break
      case "subtract":
        res = num1 - num2
        symbol = "-"
        break
      case "multiply":
        res = num1 * num2
        symbol = "×"
        break
      case "divide":
        res = num2 !== 0 ? num1 / num2 : 0
        symbol = "÷"
        break
      case "modulus":
        res = num1 % num2
        symbol = "%"
        break
      case "power":
        res = Math.pow(num1, num2)
        symbol = "^"
        break
    }
    
    setResult({ value: res, expression: `${num1} ${symbol} ${num2}` })
  }

  return (
    <FinancialCalculatorTemplate
      title="Basic Calculator"
      description="Perform basic arithmetic operations like addition, subtraction, multiplication, and division."
      icon={Calculator}
      calculate={calculate}
      values={[num1, num2, operation]}
      inputs={
        <div className="space-y-6">
          <SimpleInput label="First Number" value={num1} onChange={setNum1} />
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Operation</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "add", label: "+", name: "Add" },
                { id: "subtract", label: "-", name: "Subtract" },
                { id: "multiply", label: "×", name: "Multiply" },
                { id: "divide", label: "÷", name: "Divide" },
                { id: "modulus", label: "%", name: "Modulus" },
                { id: "power", label: "^", name: "Power" },
              ].map((op) => (
                <button
                  key={op.id}
                  onClick={() => setOperation(op.id)}
                  className={`p-3 rounded-xl border transition-all ${
                    operation === op.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary/20 border-transparent hover:bg-secondary/40"
                  }`}
                >
                  <div className="text-lg font-bold">{op.label}</div>
                  <div className="text-xs opacity-70">{op.name}</div>
                </button>
              ))}
            </div>
          </div>

          <SimpleInput label="Second Number" value={num2} onChange={setNum2} />
        </div>
      }
      result={result && (
        <div className="space-y-4">
          <ResultCard label="Result" value={result.value} type="highlight" />
          <div className="text-center text-muted-foreground text-sm">
            Expression: {result.expression} = {result.value}
          </div>
        </div>
      )}
    />
  )
}

export function FractionCalculator() {
  const [num1, setNum1] = useState(1)
  const [den1, setDen1] = useState(2)
  const [num2, setNum2] = useState(1)
  const [den2, setDen2] = useState(4)
  const [operation, setOperation] = useState("add")
  const [result, setResult] = useState<any>(null)

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b)
  }

  const calculate = () => {
    let resNum = 0
    let resDen = 1
    let symbol = "+"

    switch (operation) {
      case "add":
        resNum = num1 * den2 + num2 * den1
        resDen = den1 * den2
        symbol = "+"
        break
      case "subtract":
        resNum = num1 * den2 - num2 * den1
        resDen = den1 * den2
        symbol = "-"
        break
      case "multiply":
        resNum = num1 * num2
        resDen = den1 * den2
        symbol = "×"
        break
      case "divide":
        resNum = num1 * den2
        resDen = den1 * num2
        symbol = "÷"
        break
    }

    if (resDen === 0) {
      setResult({ error: "Division by zero" })
      return
    }

    const common = gcd(Math.abs(resNum), Math.abs(resDen))
    const simplifiedNum = resNum / common
    const simplifiedDen = resDen / common

    setResult({
      num: simplifiedNum,
      den: simplifiedDen,
      decimal: simplifiedNum / simplifiedDen,
      expression: `${num1}/${den1} ${symbol} ${num2}/${den2}`
    })
  }

  return (
    <FinancialCalculatorTemplate
      title="Fraction Calculator"
      description="Add, subtract, multiply, and divide fractions with step-by-step results."
      icon={Divide}
      calculate={calculate}
      values={[num1, den1, num2, den2, operation]}
      inputs={
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground text-center block">Fraction 1</label>
              <div className="flex flex-col gap-2">
                <SimpleInput value={num1} onChange={setNum1} placeholder="Numerator" />
                <div className="h-px bg-border w-full"></div>
                <SimpleInput value={den1} onChange={setDen1} placeholder="Denominator" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground text-center block">Fraction 2</label>
              <div className="flex flex-col gap-2">
                <SimpleInput value={num2} onChange={setNum2} placeholder="Numerator" />
                <div className="h-px bg-border w-full"></div>
                <SimpleInput value={den2} onChange={setDen2} placeholder="Denominator" />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Operation</label>
            <div className="flex gap-2 justify-center">
              {[
                { id: "add", label: "+" },
                { id: "subtract", label: "-" },
                { id: "multiply", label: "×" },
                { id: "divide", label: "÷" },
              ].map((op) => (
                <button
                  key={op.id}
                  onClick={() => setOperation(op.id)}
                  className={`w-12 h-12 rounded-xl border transition-all flex items-center justify-center text-xl font-bold ${
                    operation === op.id
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary/20 border-transparent hover:bg-secondary/40"
                  }`}
                >
                  {op.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      }
      result={result && (
        <div className="space-y-6">
          {result.error ? (
            <div className="text-destructive text-center font-medium">{result.error}</div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-4 text-2xl font-bold">
                <div className="flex flex-col items-center">
                  <span>{result.num}</span>
                  <div className="h-0.5 bg-foreground w-full my-1"></div>
                  <span>{result.den}</span>
                </div>
                <span className="text-muted-foreground">=</span>
                <span>{result.decimal.toFixed(4)}</span>
              </div>
              <div className="text-center text-muted-foreground text-sm">
                {result.expression} = {result.num}/{result.den}
              </div>
            </>
          )}
        </div>
      )}
    />
  )
}
