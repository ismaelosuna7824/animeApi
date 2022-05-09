import { DataSource } from "typeorm"

 export default class DATABASE {
    public type: TypeDB;
    public host: string;
    public port: number;
    public database: string;
    public entities: Array<any>;
    public syncronize: boolean;
    public ssl: boolean;

    constructor(type:TypeDB, host: string, port:number, database: string, entities: Array<any>, syncronize: boolean, ssl: boolean){
        this.type = type;
        this.host = host;
        this.port = port;
        this.database = database;
        this.entities = entities;
        this.syncronize = syncronize;
        this.ssl = ssl;
    }

    public initDatabase = async()=>{
        return new Promise<boolean>(async (resolve, reject) => {
                await new DataSource({
                    type: this.type,
                    host: this.host,
                    port: this.port,
                    username: "root",
                    password: "",
                    database: this.database,
                    entities: this.entities,
                    synchronize: this.syncronize,
                    ssl: this.ssl
                }).initialize().then(()=>{
                    resolve(true)
                }).catch((error)=>{
                    console.log(error);
                    resolve(false)
                })
        })
    }

 }

 export type TypeDB = 'mysql' | 'mongodb'