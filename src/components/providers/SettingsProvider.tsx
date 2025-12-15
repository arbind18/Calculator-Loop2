"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

export type Currency = {
  code: string
  symbol: string
  name: string
  rate: number // Relative to USD or base currency
}

export type Language = {
  code: string
  name: string
  nativeName: string
}

const currencies: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', rate: 1 },
  { code: 'USD', symbol: '$', name: 'US Dollar', rate: 0.012 },
  { code: 'EUR', symbol: '€', name: 'Euro', rate: 0.011 },
  { code: 'GBP', symbol: '£', name: 'British Pound', rate: 0.0095 },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', rate: 1.78 },
]

const languages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
]

interface SettingsContextType {
  currency: Currency
  setCurrency: (code: string) => void
  language: Language
  setLanguage: (code: string) => void
  availableCurrencies: Currency[]
  availableLanguages: Language[]
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(currencies[0])
  const [language, setLanguageState] = useState<Language>(languages[0])

  // Load from local storage on mount
  useEffect(() => {
    const savedCurrency = localStorage.getItem('calculator-currency')
    const savedLanguage = localStorage.getItem('calculator-language')

    if (savedCurrency) {
      const found = currencies.find(c => c.code === savedCurrency)
      if (found) setCurrencyState(found)
    }

    if (savedLanguage) {
      const found = languages.find(l => l.code === savedLanguage)
      if (found) setLanguageState(found)
    }
  }, [])

  const setCurrency = (code: string) => {
    const found = currencies.find(c => c.code === code)
    if (found) {
      setCurrencyState(found)
      localStorage.setItem('calculator-currency', code)
    }
  }

  const setLanguage = (code: string) => {
    const found = languages.find(l => l.code === code)
    if (found) {
      setLanguageState(found)
      localStorage.setItem('calculator-language', code)
    }
  }

  return (
    <SettingsContext.Provider value={{
      currency,
      setCurrency,
      language,
      setLanguage,
      availableCurrencies: currencies,
      availableLanguages: languages
    }}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings() {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider')
  }
  return context
}
