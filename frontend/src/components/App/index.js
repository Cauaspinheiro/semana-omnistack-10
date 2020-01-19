import React, { useState, useEffect } from "react";

import api from "../../services/api";

import "./style/style.css";

import DevItem from "../DevItem";
import DevForm from "../DevForm";

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const res = await api.get("/devs");

      setDevs(res.data);
    }

    loadDevs();
  }, []);

  async function handleSubmit(data) {
    const res = await api.post("/devs", data);

    setDevs([...devs, res.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleSubmit} />
      </aside>

      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
