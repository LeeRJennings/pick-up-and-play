import React from 'react';
import './index.css';
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { PickUpAndPlay } from './components/PickUpAndPlay';

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    <Router>
      <PickUpAndPlay />
    </Router>
)