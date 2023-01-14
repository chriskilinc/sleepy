import dayjs from 'dayjs';
import './controls.css';
import { CustomizedSwitches } from '../switch/switch';

export const Controls = (props) => {
    return (
        <section className='controls' >
            <div className="control" visible={(props.timeItems.length === 0).toString()}>
                <CustomizedSwitches label={props.checked ? "calculate suggested bedtimes" : "calculate suggested wakeup-times"} checked={props.checked} setChecked={props.setChecked} />
            </div>

            <div className='control' visible={(props.timeItems.length === 0).toString()}>
                <p>{props.checked ? "if i want to wake up at" : "if i go to bed at"} <b>{dayjs(props.selectedTime).format("HH:mm")}</b></p>
                <button className='btn' onClick={props.onSelectedCalculation}>calculate when to {props.checked ? "go to bed" : "wake up"}</button>
            </div>

            {/* TODO: add seperator here? */}
            <br></br>

            <div className='control' visible={(props.timeItems.length === 0).toString()}>
                <p>if i go to bed now</p>
                <button className='btn' onClick={props.onCurrentBedtime}>calculate wake-up time</button>
            </div>

            <div className='control' visible={(props.timeItems.length > 0).toString()}>
                <button className='btn' onClick={props.onReset}>go back</button>
            </div>
        </section>
    )
}