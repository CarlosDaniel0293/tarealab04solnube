const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// Establecer la carpeta de vistas
app.set('views', path.join(__dirname, 'views'));

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');

// Usar body-parser middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Usar method-override para poder enviar solicitudes PUT desde formularios
app.use(methodOverride('_method'));

// Datos de ejemplo para clientes y productos
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

// Ruta para la página principal
app.get('/', (req, res) => {
  res.render('index');
});

// Ruta para mostrar los clientes
app.get('/clientes', (req, res) => {
  res.render('clientes', { clientes: clientes });
});

// Ruta para eliminar un cliente (DELETE)
app.delete('/clientes/:id', (req, res) => {
  const id = req.params.id;
  clientes = clientes.filter(cliente => cliente.id !== parseInt(id));
  res.redirect('/clientes');
});

// Ruta para mostrar el formulario de edición de un cliente
app.get('/clientes/:id/edit', (req, res) => {
  const id = req.params.id;
  const cliente = clientes.find(cliente => cliente.id === parseInt(id));
  if (!cliente) {
    return res.status(404).send('Cliente no encontrado');
  }
  res.render('editarCliente', { cliente: cliente });
});

// Ruta para actualizar un cliente (PUT)
app.put('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const nombre = req.body.nombre;
  const clienteIndex = clientes.findIndex(cliente => cliente.id === parseInt(id));
  if (clienteIndex === -1) {
    return res.status(404).send('Cliente no encontrado');
  }
  clientes[clienteIndex].nombre = nombre;
  res.redirect('/clientes');
});

// Ruta para agregar un cliente (POST)
app.post('/clientes', (req, res) => {
  const nuevoCliente = {
    id: clientes.length + 1,
    nombre: req.body.nombre
  };
  clientes.push(nuevoCliente);
  res.redirect('/clientes');
});

// Ruta para el formulario de registro de clientes
app.get('/registro-clientes', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'registroClientes.html'));
});

// Ruta para mostrar los productos
app.get('/productos', (req, res) => {
  res.render('productos', { productos: productos });
});

// Ruta para eliminar un producto (DELETE)
app.delete('/productos/:id', (req, res) => {
  const id = req.params.id;
  productos = productos.filter(producto => producto.id !== parseInt(id));
  res.redirect('/productos');
});

// Ruta para mostrar el formulario de edición de un producto
app.get('/productos/:id/edit', (req, res) => {
  const id = req.params.id;
  const producto = productos.find(producto => producto.id === parseInt(id));
  if (!producto) {
    return res.status(404).send('Producto no encontrado');
  }
  res.render('editarProducto', { producto: producto });
});

// Ruta para actualizar un producto (PUT)
app.put('/productos/:id', (req, res) => {
  const id = req.params.id;
  const nombre = req.body.nombre;
  const productoIndex = productos.findIndex(producto => producto.id === parseInt(id));
  if (productoIndex === -1) {
    return res.status(404).send('Producto no encontrado');
  }
  productos[productoIndex].nombre = nombre;
  res.redirect('/productos');
});

// Ruta para agregar un producto (POST)
app.post('/productos', (req, res) => {
  const nuevoProducto = {
    id: productos.length + 1,
    nombre: req.body.nombre
  };
  productos.push(nuevoProducto);
  res.redirect('/productos');
});

// Ruta para el formulario de registro de productos
app.get('/registro-productos', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'registroProductos.html'));
});

// Puerto en el que se ejecutará el servidor
const PORT = 3000;

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});
