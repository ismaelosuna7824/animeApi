import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';


@Entity()
export class Photos extends BaseEntity { 
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    photos: string

}
