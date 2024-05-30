import { defineStore } from "pinia";

export const useMasterStore = defineStore({
    id: "master",
    state: () => ({
        totalUsers: 0,
        sensor: {
            threshold: 0,
            value: 0
        },
        servo: false,
        buzzer: {
            on: false,
            volume: 0
        },
        fan: {
            on: false,
            velocity: 0
        }
    }),
    getters: {
        getTotalUsers(): number {
            return this.totalUsers;
        },
        getSensor(): any {
            return this.sensor;
        },
        getServo(): boolean {
            return this.servo;
        },
        getBuzzer(): any {
            return this.buzzer;
        },
        getFan(): any {
            return this.fan;
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
        setServo(servo: boolean) {
            this.servo = servo;
        },
        setBuzzer(buzzer: any) {
            this.buzzer = {
                on: buzzer?.on ?? this.buzzer.on,
                volume: buzzer?.volume ?? this.buzzer.volume
            };
        },
        setFan(fan: any) {
            this.fan = {
                on: fan?.on ?? this.fan.on,
                velocity: fan?.velocity ?? this.fan.velocity
            };
        }
    },
});