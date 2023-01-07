import dayjs from 'dayjs';
import './time-items.css'

export const TimeItems = (props) => {
    return (
        <section className='time-items'>
            {props.timeItems && props.timeItems.map((item, i) => {
                const key = `time-item-${i}`;
                const recommended = (i <= 1);
                return <div key={key} className='time-item' recommended={recommended.toString()}>
                    <p>{dayjs(item).format("HH:mm")} <span className='recommended-tooltip'>recommended</span></p>
                </div>
            })}
        </section>
    )
}