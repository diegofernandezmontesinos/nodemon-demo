const express = require('express');
const app = express();

const {infoCursos} = require('./cursos');

const routerProgramacion = express.Router();
app.use('/api/cursos/programacion', routerProgramacion);

app.get('/', (req, res) => {
    res.send('Mi primer servidor con express.')
});

app.get('/api/cursos', (req, res) => {
  res.send(infoCursos);
});

routerProgramacion.get('/api/cursos/programacion', (req, res) => {
  res.send(JSON.stringify(infoCursos.programacion));
});

app.get('/api/cursos/matematicas', (req, res) => {
  res.send(infoCursos.matematicas);
});

routerProgramacion.get('/:lenguaje', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);
  if(resultados.length === 0){
    return res.status(404).send(`No se encontraron cursos de ${lenguaje}`)
  }
  res.send(JSON.stringify(resultados));

});

app.get('/api/cursos/programacion/:tema', (req, res) => {
  const tema = req.params.tema;
  const resultados = infoCursos.matematicas.filter(curso => curso.tema === tema);
  if(resultados.length === 0){
    return res.status(404).send(`No se encontraron cursos de ${tema}`)
  }
  res.send(JSON.stringify(resultados));

});

routerProgramacion.get('/:lenguaje/:nivel', (req, res) => {
  const lenguaje = req.params.lenguaje;
  const nivel = req.params.nivel;
  const resultados = infoCursos.programacion.filter(curso => curso.lenguaje === lenguaje);

  if(resultados.length === 0){
    return res.status(404).send(`No se encontraron cursos de ${lenguaje} de nivel ${nivel}`)
  }
  res.send(JSON.stringify(resultados));

});


const PUERTO = process.env.PORT || 3000;



app.listen(PUERTO, () => {
   console.log(`El servidor esta escuchando en el puerto ${PUERTO}`); 
} ); 