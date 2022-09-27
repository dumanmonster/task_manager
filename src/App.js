import './App.scss';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './routes/SideBar';
import TaskForm from './components/Task/TaskForm';
import EditTask from './components/Task/EditTask';
import DeleteConfirm from './components/Task/DeleteConfirm';
import MainBar from "./routes/MainBar";


function App() {

    return (
        <div className="App">
            <BrowserRouter>
                <DndProvider backend={HTML5Backend}>
                    <Routes>
                        TasksProv
                        <Route path="/" element={<Sidebar />} >

                            <Route path='home' index element={<MainBar />} />
                            <Route path='major' element={<MainBar />} />
                            <Route path='completed' element={<MainBar />} />
                            <Route path='removed' element={<MainBar />} />

                            <Route path='productivity' element={<MainBar />} />
                            <Route path='education' element={<MainBar />} />
                            <Route path='health' element={<MainBar />} />
                            <Route path='due' element={<MainBar />} />

                            <Route path='edit/:id' element={<EditTask />} />
                            <Route path='add' element={<TaskForm />} />
                            <Route path='delete/:id' element={<DeleteConfirm />} />

                        </Route>

                    </Routes>
                </DndProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
