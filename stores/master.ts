import { defineStore } from "pinia";

export const useMasterStore = defineStore({
    id: "master",
    state: () => ({
        totalUsers: 0,
        automatic: false,
        sensor: {
            threshold: 0,
            value: 0
        },
        door: false,
        buzzer: {
            on: false,
            volume: 0
        },
        fan: {
            on: false,
            velocity: 0
        },
        delay: 0
    }),
    getters: {
        getTotalUsers(): number {
            return this.totalUsers;
        },
        getSensor(): any {
            return this.sensor;
        },
        getDoor(): boolean {
            return this.door;
        },
        getBuzzer(): any {
            return this.buzzer;
        },
        getFan(): any {
            return this.fan;
        },
        getAutomatic(): boolean {
            return this.automatic;
        },
        getDelay(): number {
            return this.delay;
        }
    },
    actions: {
        setTotalUsers(totalUsers: number) {
            this.totalUsers = totalUsers;
        },
        setSensor(sensor: any) {
            this.sensor = {
                threshold: sensor?.threshold ?? this.sensor.threshold,
                value: sensor?.value ?? this.sensor.value
            };
        },
        setDoor(door: boolean) {
            this.door = door;
        },
        setBuzzer(buzzer: any) {
            this.buzzer = {
                on: buzzer?.on ?? Boolean(this.buzzer.on),
                volume: buzzer?.volume ?? this.buzzer.volume
            };
        },
        setFan(fan: any) {
            this.fan = {
                on: fan?.on ?? Boolean(this.fan.on),
                velocity: fan?.velocity ?? this.fan.velocity
            };
        },
        setAutomatic(automatic: boolean) {
            this.automatic = automatic;
        },
        setDelay(delay: number) {
            console.log("delay", delay);
            this.delay = Math.abs(delay);
        }
    },
});