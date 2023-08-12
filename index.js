import express from 'express';
import * as CategoryService from './services/category.js';
import * as ProductService from './services/product.js';
import * as ImageService from './services/images.js';
import * as UserService from './services/user.js';
import * as AddressService from './services/address.js';
import * as OrderService from './services/order.js';
import * as OrderItemsService from './services/order_items.js';
import fileUpload from 'express-fileupload';

const app = express();
const port = 8080;
const host = "localhost"

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(fileUpload());

app.post('/upload', (req, res) => {
    try {
        let product_id = req.body.product_id
        console.log(product_id)
        if (!req.files || !req.files.image) {
            return res.status(400).send('No image uploaded.');
        }
        const image = req.files.image;
        
        const imageName = `${Date.now()}-${image.name}`;
        const imagePath = `uploads/${imageName}`;

        image.mv(imagePath, (err) => {
            if (err) {
                console.error('Error:', err);
                return res.status(500).send('Error uploading image.');
            }
            res.status(200).send('Image uploaded successfully.');
        });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/api/v1/categories", CategoryService.getAllCategories);
app.get("/api/v1/categories/:id", CategoryService.getCategoryById);
app.get("/api/v1/categories/name/:name", CategoryService.getCategoryByName);
app.post("/api/v1/categories", CategoryService.createCategories);
app.put("/api/v1/categories/:id", CategoryService.updateCategories);
app.delete("/api/v1/categories/:id", CategoryService.deleteCategories);

app.get("/api/v1/products", ProductService.getProducts);
app.get("/api/v1/products/:id", ProductService.getProduct);
app.post("/api/v1/products",UserService.authenticateToken, ProductService.createProduct);
app.put("/api/v1/products/:id" ,UserService.authenticateToken, ProductService.updateProduct);
app.delete("/api/v1/products/:id" ,UserService.authenticateToken, ProductService.deleteProduct);

app.get("/api/v1/images",UserService.authenticateToken, ImageService.getImages);
app.get("/api/v1/images/:productId", ImageService.getImageByProductId);
app.post("/api/v1/images",UserService.authenticateToken, ImageService.createImage);
app.put("/api/v1/images/:id" ,UserService.authenticateToken, ImageService.updateImage);
app.delete("/api/v1/images/:productId" ,UserService.authenticateToken, ImageService.deleteImage);

app.get("/api/v1/users", UserService.getAllUser);
app.get("/api/v1/users/:id", UserService.getUserById);
app.post("/api/v1/users", UserService.createUser);
app.put("/api/v1/users/:id", UserService.updateUser);
app.delete("/api/v1/users/:id", UserService.deleteUser);
app.post("/api/v1/login", UserService.authUser);

app.get("/api/v1/address", UserService.authenticateToken, AddressService.getAllAddress);
app.get("/api/v1/address/:id", UserService.authenticateToken, AddressService.getAddressByIdUser);
app.post("/api/v1/address", UserService.authenticateToken, AddressService.createAddress);
app.put("/api/v1/address/:id", UserService.authenticateToken, AddressService.updateAddress);
app.delete("/api/v1/address/:id", UserService.authenticateToken, AddressService.deleteAddress);

app.post("/api/v1/orders", UserService.authenticateToken, OrderService.createOrder);
app.get("/api/v1/orders/:order_id", UserService.authenticateToken, OrderService.getOrderById);
app.put("/api/v1/orders/:order_id", UserService.authenticateToken, OrderService.updateOrderStatus);
app.delete("/api/v1/orders/:order_id", UserService.authenticateToken, OrderService.deleteOrder);

app.post("/api/v1/order-items", UserService.authenticateToken, OrderItemsService.addOrderItem);
app.get("/api/v1/order-items/:order_id", UserService.authenticateToken, OrderItemsService.getOrderItemsByOrderId);
app.put("/api/v1/order-items/:item_id", UserService.authenticateToken, OrderItemsService.updateOrderItem);
app.delete("/api/v1/order-items/:item_id", UserService.authenticateToken, OrderItemsService.deleteOrderItem);
app.get("/api/v1/order-items/item/:item_id", UserService.authenticateToken, OrderItemsService.getOrderItemById);
app.get("/api/v1/order-items/product/:product_id/order/:order_id", UserService.authenticateToken, OrderItemsService.getOrderItemByProductAndOrder);



app.use((err, request, response, next) => {
    const message = "internal server error";
    console.log(err.message);
})

app.listen(port, host, () =>{
    console.log(`server REST API berlajan di http://${host}:${port}`);
})