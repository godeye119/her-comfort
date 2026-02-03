import { SceneWrapper } from './components/parallax/SceneWrapper';
import { SeasonalScene } from './components/seasons/SeasonalScene';
import { ComfortDock } from './components/ui/ComfortDock';

function App() {
  return (
    <SceneWrapper>
      <SeasonalScene />
      <ComfortDock />
    </SceneWrapper>
  );
}

export default App;
