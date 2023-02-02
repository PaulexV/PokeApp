import { Timestamp } from "@angular/fire/firestore"

export interface PokeUser {
    id: string
    name: string
    description: string
    inventory: {
        pokeball: number, 
        superball: number,
        ultraball: number,
        masterball: number
    }
    captured: number[]
    encountered: number[]
    energy: number
    cooldown: {
        pokeball: Timestamp,
        superball: Timestamp,
        ultraball: Timestamp,
        masterball: Timestamp,
        energy: Timestamp
    }
}