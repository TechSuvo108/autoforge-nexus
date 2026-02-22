import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar, Footer } from './components/Layout';
import LandingPage from './pages/LandingPage';
import PipelineOverview from './pages/PipelineOverview';
import RequirementsStudio from './pages/RequirementsStudio';
import GenAiEngine from './pages/GenAiEngine';
import BuildValidate from './pages/BuildValidate';
import DeployMonitor from './pages/DeployMonitor';
import VehicleHealthUseCase from './pages/VehicleHealthUseCase';
import Docs from './pages/Docs';
import Compliance from './pages/Compliance';
import { motion } from 'motion/react';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500/30">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pipeline" element={<PipelineOverview />} />
            <Route path="/pipeline/requirements" element={<RequirementsStudio />} />
            <Route path="/pipeline/genai" element={<GenAiEngine />} />
            <Route path="/pipeline/build" element={<BuildValidate />} />
            <Route path="/pipeline/deploy" element={<DeployMonitor />} />
            <Route path="/use-cases/vehicle-health" element={<VehicleHealthUseCase />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/compliance" element={<Compliance />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
