import dayjs from 'dayjs';
import './controls.css';

export const Controls = (props) => {
    return (
        <section className='controls' >
            <div className='control' visible={(props.timeItems.length === 0).toString()}>
                <p>if i go to bed at: <b>{dayjs(props.selectedTime).format("HH:mm")}</b></p>
                <button className='btn' onClick={props.onSelectedBedtime}>calculate selected wake-up time</button>
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