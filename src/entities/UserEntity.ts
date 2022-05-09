import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';


@Entity()
export class Photos extends BaseEntity { 
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    photos: string

}

@Entity({database: 'prueba'})
export class Users extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    uuid:string

    @Index()
    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    age: number;

    @OneToOne(()=>Photos)
    @JoinColumn()
    photo: Photos

    @OneToMany(() => Colors, (color) => color.user, {cascade: true})
    colors: Colors[]
}


@Entity()
export class Colors extends BaseEntity { 
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string


    @ManyToOne(()=> Users, (usr)=> usr.colors)
    user: Users
}





// @Entity()
// export class Users extends BaseEntity{

//     @ObjectIdColumn()
//     id: ObjectID;
    
//     // @Index()
//      @Column()
//      uuid: string

//     @Index()
//     @Column()
//     name: string

//     @Column()
//     surname: string

//     @Column()
//     age: number;


//     @OneToOne(()=> Photos)
//     @JoinColumn()
//     photos: Photos
// }



// @Entity()
// export class Photos extends BaseEntity { 
    
//     @ObjectIdColumn()
//     id: ObjectID

//     @Column()
//     photos: string

// }