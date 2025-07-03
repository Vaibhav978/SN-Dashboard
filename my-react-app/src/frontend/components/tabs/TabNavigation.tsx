import React from 'react'
import type { TabProps } from '../../types/project'
import '../../styles/TabNavigation.css'

const TabNavigation: React.FC<TabProps> = ({ activeTab, onTabChange, tabs }) => {
  return (
    <div className="tab-navigation">
      <div className="tab-list">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'tab-button--active' : ''}`}
            onClick={() => onTabChange(tab.id)}
            type="button"
          >
            {tab.icon && <span className="tab-icon">{tab.icon}</span>}
            <span className="tab-name">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default TabNavigation
