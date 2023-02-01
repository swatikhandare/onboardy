import './App.css'
import { useState } from 'react';
import NavigationBar from './components/NavigationBar';
import Router from './router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <NavigationBar />
          <Router />
        </BrowserRouter>
        {/* <div className='students'>
          <h1 onClick={() => handleTabClick('students')} className='tab'>Students</h1>
          {activeTab === 'students' && 
            <div className='container'>
              {students.map((student) => (
                <StudentCard student={student}/>
              ))}
            </div>
          }
        </div>
        


        <div className="assigned">
          <h1 onClick={() => handleTabClick('assigned')} className='tab'>Students with Assigned Tasks</h1>
          {activeTab === 'assigned' && 
            <div className="container">
              {matcher().map(assignedStudent => (
                <StudentCard student={assignedStudent}/>
              ))}
            </div>
          }
        </div> */}
    </div>
  )
}

export default App
