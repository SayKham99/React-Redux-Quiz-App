import React from 'react';
import Selected from "./Components/Selected/selected";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Start from "./Components/Start/start";
import Score from "./Components/Score/score";

function App() {
  return (<>
          <BrowserRouter>
            <Routes>
              <Route path={'/'} element={<Selected/>}/>
              <Route path={'/start'} element={<Start/>}/>
              <Route path={'/score'} element={<Score/>}/>
            </Routes>
          </BrowserRouter>
      </>);
}

export default App;