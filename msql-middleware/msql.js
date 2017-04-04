module.exports = (req, resp, next) => {

    const register = req.get('MSQL-REGISTER')
    
    if(register) {
        console.log(`Comando ${register} registrado para ${req.path}!`)
        // salvar no arquivo...
    }
    
    next()
}