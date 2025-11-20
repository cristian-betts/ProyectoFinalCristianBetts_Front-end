import React, { useEffect, useState } from "react";
import "../App.css";

export default function DashboardStats() {
  const [stats, setStats] = useState({
    totalJuegos: 0,
    totalResenas: 0,
    promedioPuntuacion: 0,
    recomendados: 0,
    horasTotales: 0,
    promedioHoras: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const juegosRes = await fetch("http://localhost:3000/api/juegos");
        const juegos = await juegosRes.json();

        const resenasRes = await fetch("http://localhost:3000/api/resenas");
        const resenas = await resenasRes.json();

        const totalJuegos = juegos.length;
        const totalResenas = resenas.length;
        const promedioPuntuacion = totalResenas > 0
          ? (resenas.reduce((acc, r) => acc + r.puntuacion, 0) / totalResenas).toFixed(2)
          : 0;

        const recomendados = resenas.filter((r) => r.recomendaria).length;

        const horasTotales = resenas.reduce((acc, r) => acc + r.horasJugadas, 0);

        const promedioHoras = totalResenas > 0
          ? (resenas.reduce((acc, r) => acc + r.horasJugadas, 0) / totalResenas).toFixed(2)
          : 0;


        setStats({
          totalJuegos,
          totalResenas,
          promedioPuntuacion,
          recomendados,
          promedioHoras,
          horasTotales,
        });
      } catch (error) {
        console.error("Error obteniendo estadísticas", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-grid">

      <div className="dashboard-card">
        <h2 className="dashboard-title">Total de Juegos</h2>
        <p className="dashboard-value">{stats.totalJuegos}</p>
      </div>

      <div className="dashboard-card">
        <h2 className="dashboard-title">Total de Reseñas</h2>
        <p className="dashboard-value">{stats.totalResenas}</p>
      </div>

      <div className="dashboard-card">
        <h2 className="dashboard-title">Promedio de Puntuación</h2>
        <p className="dashboard-value">{stats.promedioPuntuacion}</p>
      </div>

      <div className="dashboard-card">
        <h2 className="dashboard-title">Recomendados</h2>
        <p className="dashboard-value">{stats.recomendados}</p>
      </div>

      <div className="dashboard-card">
        <h2 className="dashboard-title">Horas Totales Jugadas</h2>
        <p className="dashboard-value">{stats.horasTotales}</p>
      </div>

       <div className="dashboard-card">
        <h2 className="dashboard-title"> Promedio de horas jugadas</h2>
        <p className="dashboard-value">{stats.promedioHoras}</p>
      </div>

    </div>
  );
}
