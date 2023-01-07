import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';

export const LocalizedTimePicker = (props) => {
    const [locale, setLocale] = React.useState('en');

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <TimePicker
                value={props.value}
                onChange={(newValue) => props.setValue(newValue)}
                renderInput={(params) => <TextField {...params} />}
                ampm={false}
            />
        </LocalizationProvider>
    );
}