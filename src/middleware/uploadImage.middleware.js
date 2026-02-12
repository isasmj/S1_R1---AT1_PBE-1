import createMulter from "../config/produto.multer.js";

const uploadImage = createMulter({
    folder: 'Images',
    allowesTypes: ['image/jpeg', 'image/png'],
    fileSize: 10 * 1024 * 1024
}).single('vinculoImagem');

export default uploadImage;