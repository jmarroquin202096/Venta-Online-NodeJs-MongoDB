const Usuarios = require('../model/usuarios.model');
const mongoose = require('mongoose');
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");


function admin(req, res) {
    var modelUsuarios = new Usuarios();

    Usuarios.find({ email: "Admin" }, (err, usuarioEnocntrado) => {
        if (usuarioEnocntrado.length > 0) {
            return console.log("El Usuario Admin ya existe");
        } else {
            modelUsuarios.nombre = "Admin";
            modelUsuarios.email = "Admin";
            modelUsuarios.rol = "Rol_Admin";

            bcrypt.hash("123456", null, null, (err, passwordEncriptada) => {
                modelUsuarios.password = passwordEncriptada;

                modelUsuarios.save((err, usuarioGuardado) => {
                    if (err)
                        return res.status(500).send({ mensaje: "Error en la Peticion" });
                    if (!usuarioGuardado)
                        return res.status(500).send({ mensaje: "Usuario ya Registrado" });

                    return console.log("Admin:" + " " + usuarioGuardado);
                });
            });
        }
    });
}

function registrar(req, res) {
    var parametros = req.body;
    var usuarioModel = new Usuarios();

    if (parametros.nombre && parametros.email && parametros.password) {
        usuarioModel.nombre = parametros.nombre;
        usuarioModel.password = parametros.password;
        usuarioModel.email = parametros.email;
        usuarioModel.rol = 'Rol_Cliente';

        Usuarios.find({ email: parametros.email }, (err, emailEncontrado) => {
            if (emailEncontrado.length == 0) {
                bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                    usuarioModel.password = passwordEncriptada;
                    usuarioModel.save((err, usuarioGuardado) => {
                        if (err) return res.status(500).send({ mensaje: "Error en la Peticion" });
                        if (!usuarioGuardado) return res.status(500).send({ mensaje: "Error al Registrar Usuaurio" });

                        return res.status(200).send({ usuario: usuarioGuardado });
                    });
                }
                );
            }
        });

    }else {
        return res.status(500).send({ mensaje: "Tiene que  ingresar los su Email y Password" });
    }
}

function editarUsuario(req, res) {
    var  idUsuario = req.params.idUsuario;
    var parametros = req.body;

    delete parametros.password;

    if(idUsuario !== req.user.sub) return res.status(500).send({ mensaje: "No puede Editar este Usuario"});

    Usuarios.findByIdAndUpdate(idUsuario, parametros, { new: true }, (err, usuarioEditado) => {
        if (err) return res.status(500).send({ mensaje: "Error en  la peticion" });
        if (!usuarioEditado) return res.status(500).send({ mensaje: "Error al editar el Usuario" });

        return res.status(200).send({ usuario: usuarioEditado });
    }
    );
}

function eliminarUsuario(req, res) {
    var usuarioId = req.params.idUsuario;

    if(req.user.sub !== usuarioId) return res.status(403).send({ mensaje: "No puedes Eliminar otros Usuarios"});

    Empresas.findByIdAndDelete(req.user.sub, (err, usuarioEliminada) => {
        if (err) return res.status(500).send({ mensaje: "Error en la Petición" });
        if (!usuarioEliminada) return res.status(500).send({ mensaje: "No se puede eliminar la Empresa" });

        return res.status(200).send({ usuario: usuarioEliminada });
    });
}

function login(req, res) {
    var parametros = req.body;

    Usuarios.findOne({ email: parametros.email }, (err, usuarioEncontrado) => {
        if (err) return res.status(500).send({ mensaje: "Usuario no Encontrado" });
        if (usuarioEncontrado) {
            bcrypt.compare(parametros.password, usuarioEncontrado.password, (err, verificacionPassword) => {
                    if (verificacionPassword) {
                        return res.status(200).send({ token: jwt.crearToken(usuarioEncontrado) });
                    } else {
                        return res.status(500).send({ mensaje: "Contraseña Invalida" });
                    }
                }
            );
        } else {
            return res.status(500).send({ mensaje: "El Usuario no se encuentra Registrado" });
        }
    });
}

module.exports = {
    admin,
    registrar,
    editarUsuario,
    eliminarUsuario,
    login
};