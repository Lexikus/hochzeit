import { onCleanup, createSignal, Show } from "solid-js";

const getDaysFromMilliseconds = (milliseconds: number) => Math.floor(milliseconds / (1000 * 60 * 60 * 24));
const getHoursFromMilliseconds = (milliseconds: number) => Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const getMinutesFromMilliseconds = (milliseconds: number) => Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
const getSecondsFromMilliseconds = (milliseconds: number) => Math.floor((milliseconds % (1000 * 60)) / 1000);

function getMillisecondsFrom(startDate: Date): number  {
    const now = new Date().getTime();
    const distance = startDate.getTime() - now;
    return distance;
}

export default ({ date }: { date: string }) => {
    const startDate = new Date(date);
    const distance = getMillisecondsFrom(startDate);

    const [days, setDays] = createSignal(getDaysFromMilliseconds(distance));
    const [hours, setHours] = createSignal(getHoursFromMilliseconds(distance));
    const [minutes, setMinutes] = createSignal(getMinutesFromMilliseconds(distance));
    const [seconds, setSeconds] = createSignal(getSecondsFromMilliseconds(distance));

    const interval = setInterval(
        () => {
            const distance = getMillisecondsFrom(startDate);
            setDays(getDaysFromMilliseconds(distance));
            setHours(getHoursFromMilliseconds(distance));
            setMinutes(getMinutesFromMilliseconds(distance));
            setSeconds(getSecondsFromMilliseconds(distance));
        },
        1000
    );
    onCleanup(() => clearInterval(interval));

    return (
        <div class="flex justify-center py-10">
            <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
                <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <Show
                        when={days() <= 99}
                        fallback={
                            <span class="font-mono text-5xl">{days}</span>
                        }
                    >
                        <span class="countdown font-mono text-5xl">
                            <span style={{ "--value": days() }}></span>
                        </span>
                    </Show>
                    Tage
                </div>
                <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span class="countdown font-mono text-5xl">
                        <span style={{ "--value": hours() }}></span>
                    </span>
                    Std
                </div>
                <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span class="countdown font-mono text-5xl">
                        <span style={{ "--value": minutes() }}></span>
                    </span>
                    Min
                </div>
                <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                    <span class="countdown font-mono text-5xl">
                        <span style={{ "--value": seconds() }}></span>
                    </span>
                    Sek
                </div>
            </div>
        </div>
    );
};