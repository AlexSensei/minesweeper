import { useAppDispatch } from "./app/hooks";
import { getHelp } from "./features/Board/actions";
import Board from "./features/Board/Board";

function App() {
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <button onClick={() => dispatch(getHelp())}>Get help info</button>
      <Board />
    </div>
  );
}

export default App;
