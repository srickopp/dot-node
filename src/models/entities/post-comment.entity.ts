import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Posts } from "./post.entity";

@Entity({name: "posts_comments"})
export class PostComment extends BaseEntity{
    @PrimaryColumn({
        type:'int'
    })
    id: number;

    @Column({
        primary: true,
        type: 'int',
        nullable: false
    })
    postId: number;

    @Column({
        length: 255,
        type: 'varchar',
        nullable: false
    })
    name: string;

    @Column({
        length: 100,
        type: 'varchar',
        nullable: false
    })
    email: string;

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

    @ManyToOne(() => Posts, post => post.post_comments)
    @JoinColumn({
        name:'post_id'
    })
    post: Posts;
}