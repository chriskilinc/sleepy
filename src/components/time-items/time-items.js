import moment from "moment";
import './time-items.css'

export const TimeItems = (props) => {
    return (
        <section className='time-items'>
            {props.timeItems && props.timeItems.map((item, i) => {
                const key = `time-item-${i}`;
                const recommended = (i <= 1);
                return <div key={key} className='time-item' recommended={recommended.toString()}>
                    <p>{moment(item).format("HH:mm")} <span className='recommended-tooltip'>recommended</span></p>

                </div>
            })}
            {(props.timeItems && props.timeItems.length === 0) && <section className='information-placeholder'><p>insert datepicker here?</p></section>}
        </section>
    )
}