const { response, request } = require("express");


const validarCampofonasa = (req = request, res = response, next) => {
  const {run, dverificador} = req.body
  console.log(run,dverificador)
  if(run === '' || dverificador === '' || !run || !dverificador){
    return res.json({
      ok: false,
      msg: 'Falta un campo'
    })
  }
  next();
}


module.exports = validarCampofonasa;
