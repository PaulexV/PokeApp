export interface PokeUser {
    id: string, 
    name: string, 
    inventory: {
        pokeball: number, 
        superball: number,
        hyperball: number,
        masterball: number
    }
    captured: number[]
    encountered: number[]
}