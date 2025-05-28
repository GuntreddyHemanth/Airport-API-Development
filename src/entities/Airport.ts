import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm"
import { City } from "./City"

@Entity("airports")
export class Airport {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 10, nullable: true })
  icao_code: string

  @Column({ length: 3 })
  iata_code: string

  @Column()
  name: string

  @Column()
  type: string

  @Column("float")
  latitude_deg: number

  @Column("float")
  longitude_deg: number

  @Column("integer", { nullable: true })
  elevation_ft: number

  @Column({ nullable: true })
  city_id: number

  @ManyToOne(() => City, { nullable: true })
  @JoinColumn({ name: "city_id" })
  city: City
}
