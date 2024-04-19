import React from 'react'

function TopPerformanceCard({ title, lastPeriod, data }) {
  return (
    <div className="top-performance-card">
      <div className="top-performance-header">
        <h2 className="top-performance-title">{title}</h2>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4739288a5f20737b7d7c57526b86f7fc5491bced28694d1ccd5835fa201c12a?apiKey=bc6600d1caaf471eb7f285a2875f3f1a&" alt="Top Performance Icon" className="top-performance-icon" />
      </div>
      <div className="top-performance-period">{lastPeriod}</div>
      <div className="top-performance-data">
        <div className="top-performance-data-header">
          <div className="top-performance-data-header-left">
            <div className="top-performance-data-header-item">No</div>
            <div className="top-performance-data-header-item">Ref</div>
          </div>
          <div className="top-performance-data-header-right">
            <div className="top-performance-data-header-item">Leads</div>
            <div className="top-performance-data-header-item">Deals</div>
            <div className="top-performance-data-header-item">Tasks</div>
          </div>
          <div className="top-performance-data-header-item">Rate</div>
        </div>
        <div className="top-performance-data-divider" />
        {data.map((item, index) => (
          <div key={index} className={`top-performance-data-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
            <div className="top-performance-data-row-left">
              <div className="top-performance-data-row-number">{index + 1}.</div>
              <img src={item.avatar} alt={`${item.name} Avatar`} className="top-performance-data-row-avatar" />
              <div className="top-performance-data-row-info">
                <div className="top-performance-data-row-name">{item.name}</div>
                <div className="top-performance-data-row-amount">{item.amount}</div>
              </div>
            </div>
            <div className="top-performance-data-row-stats">
              <div className="top-performance-data-row-stat">{item.leads}</div>
              <div className="top-performance-data-row-stat">{item.deals}</div>
              <div className="top-performance-data-row-stat">{item.tasksDone} Tasks Done</div>
            </div>
            <div className="top-performance-data-row-rate">
              <div className="top-performance-data-row-progress" style={{ width: `${item.rate}%` }} />
              <div className="top-performance-data-row-rate-value">{item.rate}%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function TaskList({ tasks, title }) {
  return (
    <div className="task-list">
      <div className="task-list-header">
        <div className="task-list-title">
          <h2>{title}</h2>
          <div className="task-list-remaining">4 of 8 remaining</div>
        </div>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4739288a5f20737b7d7c57526b86f7fc5491bced28694d1ccd5835fa201c12a?apiKey=bc6600d1caaf471eb7f285a2875f3f1a&" alt="Task List Icon" className="task-list-icon" />
      </div>
      {tasks.map((task, index) => (
        <div key={index} className="task-list-item">
          <img src={task.icon} alt={`${task.name} Icon`} className="task-list-item-icon" />
          <div className="task-list-item-name">{task.name}</div>
        </div>
      ))}
      <form className="task-list-form">
        <label htmlFor="newTodo" className="visually-hidden">Add new todo</label>
        <input type="text" id="newTodo" className="task-list-input" placeholder="Add new todo" aria-label="Add new todo" />
        <button type="submit" className="task-list-submit">Add</button>
      </form>
    </div>
  );
}

const payment = () => {

  const topPerformanceData = [
    {
      name: 'Mathilda Bell',
      amount: '$8,192.000',
      avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6b79fa853d5c2b462350da980ea90bfe78b2e3d241997a509c1e403506e1e1b8?apiKey=bc6600d1caaf471eb7f285a2875f3f1a&',
      leads: 187,
      deals: 154,
      tasksDone: 28,
      rate: 100,
    },
    {
      name: 'Marion Figueroa',
      amount: '$6,100.000',
      avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6b79fa853d5c2b462350da980ea90bfe78b2e3d241997a509c1e403506e1e1b8?apiKey=bc6600d1caaf471eb7f285a2875f3f1a&',
      leads: 235,
      deals: 148,
      tasksDone: 21,
      rate: 90,
    },
    {
      name: 'Lee Barrett',
      amount: '$4,220.000', 
      avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6b79fa853d5c2b462350da980ea90bfe78b2e3d241997a509c1e403506e1e1b8?apiKey=bc6600d1caaf471eb7f285a2875f3f1a&',
      leads: 365,
      deals: 126,
      tasksDone: 10,
      rate: 75,
    },
    {
      name: 'Joseph Brooks',
      amount: '$1,628.000',
      avatar: 'https://cdn.builder.io/api/v1/image/assets/TEMP/6b79fa853d5c2b462350da980ea90bfe78b2e3d241997a509c1e403506e1e1b8?apiKey=bc6600d1caaf471eb7f285a2875f3f1a&',
      leads: 458,
      deals: 110,
      tasksDone: 9,
      rate: 60,
    },
  ];

  const taskListData = [
    {
      name: 'Marketing dashboard app',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b6f2d9e64ecc59b590e6e9ade01786d8af624cb620dd7c0ba7a68893b6eeba1d?apiKey=bc6600d1caaf471eb7f285a2875f3f1a&',
    },
    {
      name: 'Create new version 4.0',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b6f2d9e64ecc59b590e6e9ade01786d8af624cb620dd7c0ba7a68893b6eeba1d?apiKey=bc6600d1caaf471eb7f285a2875f3f1a&',
    },
    {
      name: 'User Testing',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccf3ef3cf4d383cae905e241facbd0ad0981d80daf745cc4d7fe3a2a37f2ea26?apiKey=bc6600d1caaf471eb7f285a2875f3f1a&',
    },
    {
      name: 'Design system',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccf3ef3cf4d383cae905e241facbd0ad0981d80daf745cc4d7fe3a2a37f2ea26?apiKey=bc6600d1caaf471eb7f285a2875f3f1a&',
    },
    {
      name: 'Awesome task',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b6f2d9e64ecc59b590e6e9ade01786d8af624cb620dd7c0ba7a68893b6eeba1d?apiKey=bc6600d1caaf471eb7f285a2875f3f1a&',
    },
    {
      name: 'Marketing dahsboard concept',
      icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/ccf3ef3cf4d383cae905e241facbd0ad0981d80daf745cc4d7fe3a2a37f2ea26?apiKey=bc6600d1caaf471eb7f285a2875f3f1a&',
    },
  ];
  return (
    <div className='payment'>
      <div className='heading'>
        hello
      </div>
    </div>
  )
}

export default payment
