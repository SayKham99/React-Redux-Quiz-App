import React from 'react';
import Selected from "./Components/Selected/selected";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Start from "./Components/Start/start";

function App() {
  return (<>
          <BrowserRouter>
            <Routes>
              <Route path={'/'} element={<Selected/>}/>
              <Route path={'/start'} element={<Start/>}/>
            </Routes>
          </BrowserRouter>
      </>);
}

export default App;