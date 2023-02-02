import { Routes, Route } from "react-router-dom";
import Container from './components/Container';
import AssignedTasks from './pages/AssignedTasks';
import Blogs from './pages/Blogs';
import FAQManager from './pages/FAQManager';
import FAQs from './pages/FAQs';
import Introduction from './pages/Introduction';
import LatestMessages from "./pages/LatestMessages";
import Students from './pages/Students';
import TagsManager from './pages/TagsManager';
import Tasks from './pages/Tasks';

const Router = () => {
  return (
    <Routes>
        <Route path="Introduction" element={<Container title="Introduction"><Introduction /></Container>} />
        <Route path="assigned-tasks" element={<Container title="Assigned Tasks"><AssignedTasks /></Container>} />
        <Route path="faqs" element={<Container title="Frequently Asked Questions"><FAQs /></Container>} />
        <Route path="latest" element={<Container title="Latest Updates"><LatestMessages /></Container>} />
        <Route path="students" element={<Container title="Students"><Students /></Container>} />
        <Route path="faqs-manager" element={<Container title="FAQs Manager"><FAQManager /></Container>} />
        <Route path="tags-manager" element={<Container title="Tags Manager"><TagsManager /></Container>} />
        <Route path="tasks" element={<Container title="Tasks"><Tasks /></Container>} />
        <Route path="blogs" element={<Container title="Blogs"><Blogs /></Container>} />
        <Route path="*" element={<></>} />
    </Routes>
  )
}

export default Router