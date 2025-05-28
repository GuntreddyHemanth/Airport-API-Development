import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { City } from "./City"

@Entity("countries")
export class Country {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column({ length: 2 })
  country_code_two: string

  @Column({ length: 3 })
  country_code_three: string

  @Column("integer")
  mobile_code: number

  @Column("integer")
  continent_id: number

  @OneToMany(
    () => City,
    (city) => city.country,
  )
  cities: City[]
}
