import multer from "multer"

const {pathname: root} = new URL('../src', import.meta.url)

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, `${root}/public/uploads`)
    },
    filename:function(req, file, cb){
        cb(null, file.originalname)
    }
})

export const uploader = multer({
    storage,
    onError: function(err, next){
        console.log(err, next())
        next()
    }
})