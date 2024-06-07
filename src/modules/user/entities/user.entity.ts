import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'wallet_addr', unique: true })
  walletAddr: string;

  @Column({ name: 'nick_name' })
  nickName: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
