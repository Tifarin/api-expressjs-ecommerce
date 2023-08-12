import expess from 'express';
import * as CategoryService from './services/category.js';

const app = expess();
const port = 8080;
const host = "localhost"

app.use(expess.json())

app.get("/api/v1/categories", CategoryService.getAllCategories);
app.get("/api/v1/categories/:id", CategoryService.getCategoryById);
app.get("/api/v1/categories/name/:name", CategoryService.getCategoryByName);
app.post("/api/v1/categories", CategoryService.createCategories);
app.put("/api/v1/categories/:id", CategoryService.updateCategories);
app.delete("/api/v1/categories/:id", CategoryService.deleteCategories);


app.use((err, request, response, next) => {
    const message = "internal server error";
    console.log(err.message);
})

app.listen(port, host, () =>{
    console.log(`server REST API berlajan di http://${host}:${port}`);
})