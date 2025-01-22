import { useState } from 'react'
import './Toolbar.css'

const Toolbar = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 0, label: 'Home', icon: '🏠' },
    { id: 1, label: 'Get Hired', icon: '💼' },
    { id: 2, label: 'Develop With Us', icon: '🚀' },
    { id: 3, label: 'Contact', icon: '📧' }
  ]

  return (
    <div className="toolbar">
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`toolbar-button ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
          title={tab.label}
        >
          <span className="icon">{tab.icon}</span>
          <span className="label">{tab.label}</span>
        </button>
      ))}
    </div>
  )
}

export default Toolbar