import express from "express";
import socketio from 'socket.io';

import axios from 'axios';
import cors from "cors";
var CronJob = require('cron').CronJob;

const app = express();
app.use(cors())
app.use(express.json());

let animeDelDia = "s";
let responseDia = {};
let animePosibles:any = [];

const randomAnimeYear = ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2022", "2021", "2022"]

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
        responseDia = {
            animePosible: animePosibles,
            name: animeResponse.data.data.Page.media[rnds].title.romaji,
            anime: animeResponse.data.data.Page.media[rnds].coverImage.extraLarge
        }; 
        res.json(responseDia);
    })
})
const server = app.listen(5000, function() {
    console.log("listening on *:5000");
  });
const io = new socketio.Server(server, {cors: {
    origin: '*'
}});


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


io.on('connection', (socket) => { 
    socket.emit('announcements', responseDia)
    // socket.on("recivedata", (args)=>{
    //     socket.emit('announcements', responseDia)
    // })
    
  });


  
  var job = new CronJob('0 9 * * *', async function() {
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
        responseDia = {
            animePosible: animePosibles,
            name: animeResponse.data.data.Page.media[rnds].title.romaji,
            anime: animeResponse.data.data.Page.media[rnds].coverImage.extraLarge
        }; 
    })
  }, null, true, 'America/Mazatlan');
  job.start();
