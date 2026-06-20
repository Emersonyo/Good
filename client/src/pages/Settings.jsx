import React from 'react'
import SettingRow from '../components/SettingRow'
import useLocalStorage from '../hooks/useLocalStorage'
import { useTheme } from '../context/ThemeContext'
import { clearConversations } from '../utils/api'

export default function Settings(){
  const { theme, setFontSize, fontSize, responseLength, setResponseLength } = useTheme()
  const [language, setLanguage] = useLocalStorage('emerson:language', 'en')

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl mb-4">Settings</h2>
      <div className="space-y-3">
        <SettingRow label="Theme" value={theme} onChange={()=>{}} options={["dark","light"]} />
        <SettingRow label="Font size" value={fontSize} onChange={v=>setFontSize(v)} options={["14","16","18","20"]} />
        <SettingRow label="Language" value={language} onChange={v=>setLanguage(v)} options={["en","es","fr"]} />
        <SettingRow label="Response length" value={responseLength} onChange={v=>setResponseLength(v)} options={["short","medium","long"]} />
      </div>
      <div className="mt-6">
        <button className="px-3 py-2 rounded bg-red-600" onClick={async ()=>{ if(confirm('Clear all conversations?')){ await clearConversations(); location.reload() } }}>Clear history</button>
      </div>
    </div>
  )
}
