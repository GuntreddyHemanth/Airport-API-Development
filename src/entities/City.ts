import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm"
import { Country } from "./Country"
import { Airport } from "./Airport"

@Entity("cities")
export class City {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  country_id: number

  @Column({ default: true })
  is_active: boolean

  @Column("float")
  lat: number

  @Column("float")
  long: number

  @ManyToOne(() => Country)
  @JoinColumn({ name: "country_id" })
  country: Country

  @OneToMany(
    () => Airport,
    (airport) => airport.city,
  )
  airports: Airport[]
}
