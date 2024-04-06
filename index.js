const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let clientes = [
  { id: 1, nombre: 'Cliente 1' },
  { id: 2, nombre: 'Cliente 2' },
  { id: 3, nombre: 'Cliente 3' }
];

let productos = [
  { id: 1, nombre: 'Producto 1' },
  { id: 2, nombre: 'Producto 2' },
  { id: 3, nombre: 'Producto 3' }
];

app.get('/', (req, res) => {
  res.send('Bienvenido a la página principal');
});

app.get('/clientes', (req, res) => {
  res.render('clientes', { clientes: clientes });
});

app.get('/productos', (req, res) => {
  res.render('productos', { productos: productos });
});

app.post('/clientes', (req, res) => {
  const nuevoCliente = {
    id: clientes.length + 1,
    nombre: req.body.nombre
  };
  clientes.push(nuevoCliente);
  res.status(201).json(nuevoCliente);
});

app.put('/clientes/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  const clienteActualizado = req.body;

  clientes = clientes.map(cliente => {
    if (cliente.id === clienteId) {
      return {
        ...cliente,
        ...clienteActualizado
      };
    }
    return cliente;
  });

  res.json(clientes.find(cliente => cliente.id === clienteId));
});

app.delete('/clientes/:id', (req, res) => {
  const clienteId = parseInt(req.params.id);
  clientes = clientes.filter(cliente => cliente.id !== clienteId);
  res.sendStatus(204);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
