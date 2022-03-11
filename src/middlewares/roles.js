//Rol Admin
exports.verAdmin = function(req, res, next) {
    if(req.user.rol !== "Rol_Admin") return res.status(404).send({mensaje: "No cuenta con permisos de Administrador"})
    
    next();
}

//Rol Empresa
exports.verCliente = function(req, res, next) {
    if(req.user.rol !== "Rol_Cliente") return res.status(404).send({mensaje: "No cuenta con permisos de Cliente"})
    
    next();
}