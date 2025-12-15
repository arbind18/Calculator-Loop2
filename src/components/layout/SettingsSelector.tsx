"use client"

import { Globe, Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { useSettings } from "@/components/providers/SettingsProvider"

export function SettingsSelector() {
  const { 
    currency, 
    setCurrency, 
    availableCurrencies, 
    language, 
    setLanguage, 
    availableLanguages 
  } = useSettings()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Globe className="h-5 w-5" />
          <span className="sr-only">Settings</span>
          <div className="absolute -bottom-1 -right-1 text-[10px] font-bold bg-primary text-primary-foreground px-1 rounded-full">
            {currency.symbol}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Regional Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span className="mr-2">Currency</span>
            <span className="ml-auto text-xs text-muted-foreground">{currency.code} ({currency.symbol})</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {availableCurrencies.map((curr) => (
              <DropdownMenuItem 
                key={curr.code} 
                onClick={() => setCurrency(curr.code)}
                className="justify-between"
              >
                <span>{curr.name} ({curr.symbol})</span>
                {currency.code === curr.code && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>

        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span className="mr-2">Language</span>
            <span className="ml-auto text-xs text-muted-foreground">{language.nativeName}</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {availableLanguages.map((lang) => (
              <DropdownMenuItem 
                key={lang.code} 
                onClick={() => setLanguage(lang.code)}
                className="justify-between"
              >
                <span>{lang.nativeName}</span>
                {language.code === lang.code && <Check className="h-4 w-4" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
