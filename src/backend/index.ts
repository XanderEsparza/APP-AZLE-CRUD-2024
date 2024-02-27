import { Server } from 'azle';
import express, { Request, NextFunction, Response } from 'express';
const bodyParser = require('body-parser');


type dulce = {
    id: number;
    nombre: string;
    variedad: string;
    cantidad:number;
    precio:number;
}

let dulces: dulce[] = [{
    id: 1,
    nombre:"pica fresa",
    variedad:"goma",
    cantidad:100,
    precio:2
}];


export default Server(() => {
    const app = express();

/*     app.use(express.json());
 */
    // GET
    app.get('/show', (req, res) =>{
        res.json(dulces);
    })
    app.use(bodyParser.json());
    // POST
    app.post("/creardulce", (req, res) =>{
        const dataForm = req.body;
        const id = parseInt(req.body.id);
        const nombre = String(req.body.nombre);
        const variedad = String(req.body.variedad);
        const cantidad = parseInt(req.body.cantidad);
        const precio = parseInt(req.body.precio);
        
        const existeDulce = dulces.some(dulce => dulce.id === id);
        if (existeDulce) {
            return res.status(404).send("La clave del dulce ya existe");
        }

        let nuevoDulce= {
            id: id,
            nombre:nombre,
            variedad:variedad,
            cantidad:cantidad,
            precio:precio
        };

        dulces.push(nuevoDulce)
        console.log(req.body)
        res.send(req.body);
        
    });

    // PUT
    app.put("/editardulce/:id", (req, res) => {
        const id = parseInt(req.params.id);
        const dulce = dulces.find((dulce) => dulce.id === id);

        if (!dulce) {
            res.status(404).send("Not found");
            return;
        }

        const updateddulce = { ...dulce, ...req.body };

        dulces = dulces.map((b) => b.id === updateddulce.id ? updateddulce : b);

        res.send("Informacion del dulce actualizada");
    });


    // DELETE
    app.delete("/borrardulce/:id", (req, res) => {
        const id = parseInt(req.params.id);
        dulces = dulces.filter((dulce) => dulce.id !== id);
        res.send("Dulce eliminado correctamente");
    });


    return app.listen();
});