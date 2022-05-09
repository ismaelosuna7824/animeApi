import {Router} from 'express';
import {Iuser} from '../interfaces/Iuse';
import { v4 as uuidv4 } from 'uuid';
import { Photos } from '../entities/Prueba';


const PruebaRputer = Router();

PruebaRputer.get('/prueba', (_, res)=>{
    res.send({sen: "hola mundo asi es"})
});


PruebaRputer.post('/createP', async (req, res)=>{
    try {
        const user:any = req.body;
        // user.uuid = uuidv4();
    
        const Photo = new Photos();
        Photo.photos = user.nombre;
        await Photos.save(Photo);
        
        res.status(200).json({status: true, user})
        
    } catch (error) {
        res.status(404).send({eror: `${error}`})
        throw new Error("");
    }
})

export default PruebaRputer;
