const Categorias = require('../model/categorias.model');
const Productos = require('../model/productos.model');

function agregarCategoria(req, res) {
    var parametros = req.body;
    var modelCategoria = new Categorias();

    Categorias.findOne({ nombre: parametros.nombre }, (err, categoriaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: "Error en la Petición" });
        if (!categoriaEncontrada) {
            modelCategoria.nombre = parametros.nombre;

            modelCategoria.save((err, categoriaGuardada) => {
                if (err) return res.status(500).send({ mensaje: "Error en la Petición" });
                if (!categoriaGuardada) return res.status(500).send({ mensaje: "No se puede Guardar la Categoria" });

                return res.status(200).send({ categoria: categoriaGuardada });
            });

        }
    });
}

function editarCategoria(req, res) {
    var parametros = req.body;
    var categoriaId = req.params.idCategoria;

    Categorias.findByIdAndUpdate(categoriaId, parametros, { new: true }, (err, categoriaEditada) => {
        if (err) return res.status(500).send({ mensaje: "Error en la Petición" });
        if (!categoriaEditada) return res.status(500).send({ mensaje: "No se puede Ediatar la Categoria" });

        return res.status(200).send({ categoria: categoriaEditada });
    });
}

function eliminarCategoria(req, res) {
    var categoriaId = req.params.idCategoria;

    //Productos de Uso Diario = Por Default
    Categorias.findOne({ nombre: 'Productos de Uso Diario' }, (err, categoriaEncontrada) => {
        if (!categoriaEncontrada) {
            const modelCategoria = new Categorias();
            modelCategoria.nombre = 'Productos de Uso Diario';

            modelCategoria.save((err, categoriaGuardada) => {
                if (err) return res.status(500).send({ mensaje: "Error en la Petición" });
                if (!categoriaGuardada) return res.status(500).send({ mensaje: "Error al Crear Categoria por Default" });

                Productos.updateMany({ idCategoria: categoriaId }, { idCategoria: categoriaGuardada._id }, (err, productoEditado) => {
                    if (err) return res.status(500).send({ mensaje: "Erro en la Petición" });
                    if (!productoEditado) return res.status(500).send({ mensaje: "Error al Actualizar la Categoria en Productos" });

                    Categorias.findByIdAndDelete(categoriaId, (err, categoriaEliminada) => {
                        if (err) return res.status(500).send({ mensaje: "Error en la Petición" });
                        if (!categoriaEliminada) return res.status(500).send({ mensaje: "Error al Eliminar Categoria" });

                        return res.status(200).send({ producto: productoEditado, categoria: categoriaEliminada });
                    });
                });
            });
        } else {
            Productos.updateMany({ idCategoria: categoriaId }, { idCategoria: categoriaGuardada._id }, (err, productoEditado) => {
                if (err) return res.status(500).send({ mensaje: "Erro en la Petición" });
                if (!productoEditado) return res.status(500).send({ mensaje: "Error al Actualizar la Categoria en Productos" });

                Categorias.findByIdAndDelete(categoriaId, (err, categoriaEliminada) => {
                    if (err) return res.status(500).send({ mensaje: "Error en la Petición" });
                    if (!categoriaEliminada) return res.status(500).send({ mensaje: "Error al Eliminar Categoria" });

                    return res.status(200).send({ producto: productoEditado, categoria: categoriaEliminada });
                });
            });
        }
    });
}

function visualizarCategorias(req, res) {
    Categorias.find({}, (err, categoriaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: "Error en la Petición" });
        if (!categoriaEncontrada) return res.status(500).send({ mensaje: "Error al Encontrar Categorias" });

        return res.status(200).send({ categorias: categoriaEncontrada });
    });
}

function buscarCategoriaporNombre(req, res) {
    var parametros = req.body;

    Categorias.find({ nombre: {$regex: parametros.nombre, $options: "i"} }, (err, categoriaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: "Error en la Petición" });
        if (!categoriaEncontrada) return res.status(404).send({ mensaje: "Error al Encontrar Categoria" });

        return res.status(200).send({ categoria: categoriaEncontrada });
    });
}

module.exports = {
    agregarCategoria,
    editarCategoria,
    eliminarCategoria,
    visualizarCategorias,
    buscarCategoriaporNombre
}