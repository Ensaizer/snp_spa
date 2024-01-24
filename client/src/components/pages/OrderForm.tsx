import React from 'react';
import type {FC} from 'react';
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import {useAppSelector} from "../../store/hooks.ts";
import {useCreateNewOrderMutation} from "../../store/orderSlice/orderSlice.ts";
import {OrderFormType} from "../../types";


const OrderForm:FC = () => {
    const {user} = useAppSelector(state=>state.auth);
    const [create] = useCreateNewOrderMutation();

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20px' }}>
            <Typography variant="h3" gutterBottom>
                Оформить заказ
            </Typography>
            <Box
                component="form"
                sx={{ minWidth: '400px' }}
                onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    const formData = Object.fromEntries(new FormData(e.currentTarget)) as unknown as OrderFormType
                    formData.userId = user.id;
                    formData.status = 'в обработке';
                    void create(formData);
                }}
            >
                <Box mb={1}>
                    <TextField name="deliveryAddress" label="Адрес доставки" type="text" required fullWidth />
                </Box>
                <Box mb={1}>
                    <TextField name="deliveryDate" type="datetime-local" required fullWidth />
                </Box>
                <Box mb={1}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Варианты доставки</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="deliveryType"
                            label="Варианты доставки"
                        >
                            <MenuItem value={10}>Самовывоз</MenuItem>
                            <MenuItem value={20}>Курьерской компанией</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box mb={1}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Способы оплаты</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            name="paymentType"
                            label="Способы оплаты"
                        >
                            <MenuItem value={10}>банковской картой</MenuItem>
                            <MenuItem value={10}>курьеру во время доставки</MenuItem>
                            <MenuItem value={10}>безналичная оплата</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button type="submit" variant="contained" fullWidth>
                    Подтвердить заказ
                </Button>
            </Box>
        </Box>
    );
};

export default OrderForm;
