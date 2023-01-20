export interface PokeUser {
    id: string, 
    name: string, 
    inventory: {
        pokeball: number, 
        superball: number,
        ultraball: number,
        masterball: number
    }
    captured: number[]
    encountered: number[]
}