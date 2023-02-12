import { onCleanup, createSignal } from "solid-js";
import "./Countdown.scss";

const getDaysFromMilliseconds = (milliseconds: number) => Math.floor(milliseconds / (1000 * 60 * 60 * 24));
const getHoursFromMilliseconds = (milliseconds: number) => Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const getMinutesFromMilliseconds = (milliseconds: number) => Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
const getSecondsFromMilliseconds = (milliseconds: number) => Math.floor((milliseconds % (1000 * 60)) / 1000);

function getMillisecondsFrom(startDate: Date): number  {
    const now = new Date().getTime();
    const distance = startDate.getTime() - now;
    return distance;
}

export const Countdown = ({ date }: { date: string }) => {
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
        <div class="countdown">
            <table>
                <tbody>
                    <tr>
                        <td>{ days }</td>
                        <td>{ hours }</td>
                        <td>{ minutes }</td>
                        <td>{ seconds }</td>
                    </tr>
                    <tr>
                        <td>Tage</td>
                        <td>Stunden</td>
                        <td>Minuten</td>
                        <td>Sekunden</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};