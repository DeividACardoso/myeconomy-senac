import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, Platform } from 'react-native';
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { styles } from './AppTextFormStyle';
import { formatDate } from '../../utils/DateFormatter';

interface AppTextFormProps {
    value: Date | null;
    onChange: (date: Date) => void;
    format?: 'monthYear' | 'fullDate';
}

export default function AppTextFormDate({
    value,
    onChange,
    format = 'fullDate',
}: AppTextFormProps) {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(value);
    const [dateSelected, setDateSelected] = useState(false);
    const [dateString, setDateString] = useState("");

    const onValueChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setDateSelected(true);
        onChange(currentDate);
        setShow(false);
    };

    const handlePress = () => {
        if (date == null) {
            setDate(new Date());
        }
        setShow(true);
    }

    useEffect(() => {
        setDate(value);
    }, [value]);

    useEffect(() => {
        if (date != null) {
            if (format === 'monthYear') {
                setDateString(formatDate(date));
            } else {
                setDateString(`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`);
            }
        } else {
            setDateString("Selecione uma data");
        }
    }, [date]);

    const textColor = 'gray';

    return (
        <View style={[styles.input]}>
            <TouchableOpacity onPress={handlePress}>
                <Text style={[styles.inputWOBorder, { color: textColor }]}>{dateString}</Text>
            </TouchableOpacity>
            {show && (
                <RNDateTimePicker
                    mode="date"
                    value={date}
                    onChange={onValueChange}
                />
            )}
        </View>
    );
}