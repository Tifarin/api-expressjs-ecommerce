import * as ImagesRepository from '../repository/images.js';
import {successResponse, errorResponse} from '../utils/response.js';

export const getImages = async (req, res, next) => {
    try {
        const [result] = await ImagesRepository.getData();
        return successResponse(res,"ok", result);
    } catch (error) {
        next(error);
    }
}

export const getImageByProductId = async (req, res, next) => {
    try {
        const [result] = await ImagesRepository.getDataByProductId(req.params.productId);
        if(result.length > 0) {
            successResponse(res, "Ok", result)
        } else {
            errorResponse(res, "data tidak ditemukan", 404);
        }
    } catch (error) {
        next(error);
    }
}

export const createImage = (req, res, next) => {
    try {
        let product_id = req.body.product_id
        if (!req.files || !req.files.image) {
            return res.status(400).send('No image uploaded.');
        }
        const image = req.files.image;
        
        const imageName = `${Date.now()}-${image.name}`;
        const imagePath = `uploads/${imageName}`;
        const reslt = ImagesRepository.addData(product_id, imagePath)

        image.mv(imagePath, (err) => {
            if (err) {
                console.error('Error:', err);
                return res.status(500).send('Error uploading image.');
            }
            reslt.then((resp) => {
                successResponse(res, "Ok", resp[0].insertId);
            });
        });
    } catch (error) {
        next(error);
    }
}

export const updateImage = (req, res, next) => {
    try {
        let id = req.params.id
        let product_id = req.body.product_id
        let image_url = req.body.image_url
        const [result] = ImagesRepository.updateData(id, product_id, image_url);
        successResponse(res, "Ok", result.affectedRows);
    } catch (error) {
        next(error);
    }
}

export const deleteImage = (req, res, next) => {
    try {
        let product_id = req.params.productId
        const result = ImagesRepository.deleteData(product_id);
        result.then((res) => res)
        successResponse(res, "Ok", result.affectedRows);
    } catch (error) {
        next(error);
    }
}