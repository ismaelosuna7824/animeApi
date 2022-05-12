import express from "express";
import socketio from 'socket.io';
import bcryptjs from 'bcryptjs';

import axios from 'axios';
import cors from "cors";
import e from "express";
var CronJob = require('cron').CronJob;

const app = express();
app.use(cors())
app.use(express.json());

let animeDelDia = "";
let responseDia = {};
let animePosibles:any = [];

const randomAnimeYear = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"]

app.get('/', (req, res)=>{
    res.json("api");
})
app.get('/manual', (req, res)=>{
   
    //console.log(response.data.anime)
    const rnd = Math.floor(Math.random() * randomAnimeYear.length)
   
    axios.post("https://graphql.anilist.co", {
        query: query,
        variables: {
            "seasonYear": randomAnimeYear[rnd]
        }
    }).then((animeResponse:any)=>{
       
        const rnds = Math.floor(Math.random() * animeResponse.data.data.Page.media.length)
        
        for (const key in animeResponse.data.data.Page.media) {
                animePosibles.push(animeResponse.data.data.Page.media[key].title.romaji);
        }

        animeDelDia = animeResponse.data.data.Page.media[rnds].title.romaji;
        responseDia = {
            animePosible: animePosibles,
            name: animeResponse.data.data.Page.media[rnds].title.romaji,
            anime: animeResponse.data.data.Page.media[rnds].coverImage.extraLarge,
            status: false,
        }; 
        res.json(responseDia);
    })
});


app.get('/animes', (req, res)=>{

    // console.log(req.query.anime);
            if(req.query.anime == "null" || req.query.anime == null){
                const dts = {status: false}
                const rs = {...responseDia, ...dts}
                res.json(rs);
            }else{
                try {
                
                        
                        if( bcryptjs.compareSync(animeDelDia, req.query.anime.toString())){
                            const dts = {status: false}
                            const rs = {...responseDia, ...dts}
                            //console.log(rs);
                            res.json(rs);
                        }else{
                            const dts = {status: true}
                            const rs = {...responseDia, ...dts}
                            //console.log(responseDia);
                            res.json(rs);
                        } 
                    
                } catch (error) {
                    const dts = {status: false}
                    const rs = {...responseDia, ...dts}
                    //console.log(rs);
                    res.json(rs);
                }
    }
    

});

app.listen(5000, function() {
    console.log("listening on *:5000");
  });
// const io = new socketio.Server(server, {cors: {
//     origin: '*'
// }});


const query = `
    query ($page: Int, $perPage: Int, $search: String, $seasonYear: Int) {
        Page(page: $page, perPage: $perPage) {
        media(search: $search, type: ANIME, sort: FAVOURITES_DESC, seasonYear: $seasonYear) {
            coverImage{
                extraLarge
            }
            title{
            romaji 
            }
        }
        }
    }
`;



// io.on('connection', (socket) => { 
//     //console.log(socket.handshake.query['hola']);
//     // console.log( Object.keys(responseDia).length);
//     // console.log(socket.handshake.query['hola'])
    
//     if(socket.handshake.query['hola'] == "null"){
//         const dts = {status: false}
//         const rs = {...responseDia, ...dts}
//         socket.emit('announcements', rs)
//     }else{
//                  var bytes  = crypto.AES.decrypt(socket.handshake.query['hola']?.toString()!, 'nanoAnime32');
//                 var originalText = bytes.toString(crypto.enc.Utf8);
//                 //console.log(originalText);
//                 if(animeDelDia == originalText){
//                     const dts = {status: false}
//                     const rs = {...responseDia, ...dts}
//                     //console.log(rs);
//                     socket.emit('announcements', rs)
//                 }else{
//                     const dts = {status: true}
//                     const rs = {...responseDia, ...dts}
//                     //console.log(responseDia);
//                     socket.emit('announcements', rs)
//                 }
//     }
    
//     // socket.on("recivedata", (args)=>{
//     //     //console.log(args);
//     //     if(args == null){
//     //         //console.log("entra aqui");
            
//     //     }else{

   
//     //     }
//     // })
    
//   });


  //'10 0 * * *'
  var job = new CronJob('10 0 * * *', async function() {
    //console.log('cron')
    const rnd = Math.floor(Math.random() * randomAnimeYear.length)
   
    axios.post("https://graphql.anilist.co", {
        query: query,
        variables: {
            "seasonYear": randomAnimeYear[rnd]
        }
    }).then((animeResponse:any)=>{
       
        const rnds = Math.floor(Math.random() * animeResponse.data.data.Page.media.length)
        
        for (const key in animeResponse.data.data.Page.media) {
                animePosibles.push(animeResponse.data.data.Page.media[key].title.romaji);
        }
        animeDelDia = animeResponse.data.data.Page.media[rnds].title.romaji;
        responseDia = {
            animePosible: animePosibles,
            name: animeResponse.data.data.Page.media[rnds].title.romaji,
            anime: animeResponse.data.data.Page.media[rnds].coverImage.extraLarge
        }; 
    })
  }, null, true, 'America/Mazatlan');
  job.start();
