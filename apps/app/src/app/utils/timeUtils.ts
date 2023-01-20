import { Timestamp } from "@angular/fire/firestore";

export function getTimestampWithAddedSeconds(seconds: number): Timestamp {
    return Timestamp.fromDate(new Date(Date.now() + seconds *1000))
}

export function getCooldownSeconds(time: Timestamp): number {
    const interval = time.seconds - Timestamp.now().seconds
    return interval
}

export function formatCooldown(seconds: number): string {
    if (seconds < 0) {return ""}
    if (seconds < 60) {
        return `${seconds}s`
    }
    const minutes= Math.floor(seconds/60)
    if (minutes < 60) {
        return `${minutes}m` + (seconds%60 ? `${seconds%60}s` : '')
    }
    return `${Math.floor(minutes/60)}h`
}

