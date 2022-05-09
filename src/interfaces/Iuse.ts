export interface Iuser  {
    uuid: string
    name: string
    surname: string
    age: number
    color: any[]
}

export interface Icolors  {
    id?: number
    name: string
}

// import { ObjectID } from "typeorm"

// export interface Iuser  {
//     id?: ObjectID
//     name: string
//     surname: string
//     age: number
// }
// export const validateIuser = (obj:any ): obj is Iuser => {
//     if('id' in obj == false){
//         return 'name' in obj && 'surname' in obj && 'age' in obj
//     }
    
// }

