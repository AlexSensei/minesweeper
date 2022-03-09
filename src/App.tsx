import { useAppDispatch } from "./app/hooks";
import { getHelp } from "./features/Board/Actions";

function App() {
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <button onClick={() => dispatch(getHelp())}>Get help info</button>
    </div>
  );
}

export default App;
