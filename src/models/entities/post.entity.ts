import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity({name: "posts"})
export class Posts extends BaseEntity{
    @PrimaryColumn({
        type:'int'
    })
    id: number;

    @Column({
        type: 'int',
        nullable: false
    })
    userId: number;

    @Column({
        length: 255,
        type: 'varchar',
        nullable: false
    })
    title: string;

    @Column({
        type: 'text',
        nullable: true
    })
    body: string;

    @CreateDateColumn({
        type: 'timestamp with time zone',
        nullable: false
    })
    created_at: Date;

    @UpdateDateColumn({
        type: 'timestamp with time zone',
        nullable: false
    })
    updated_at: Date;

    @DeleteDateColumn({
        type: 'timestamp with time zone',
        nullable: false
    })
    deleted_at: Date;
}

