export function auth(req, res, next) {
    if(!req.session?.passport?.user){
        return res.status(401).send('Debe logearse para ingresar a esta vista')
    }
    next()
}
