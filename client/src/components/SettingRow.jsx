import React from 'react'

export default function SettingRow({ label, value, onChange, options = [] }){
  return (
    <div className="flex items-center justify-between">
      <div className="font-medium">{label}</div>
      <div>
        <select value={value} onChange={e=>onChange(e.target.value)} className="bg-gray-800 px-3 py-1 rounded">
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>
    </div>
  )
}
