import React, {useState} from 'react';
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
import type {OrderFormType} from "../../types";
import ModalOrder from "./ModalOrder.tsx";


const OrderForm:FC = () => {
    const [open, setModalOpen] = useState(false)
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
                    console.log(formData);
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
                            defaultValue='Самовывоз'
                        >
                            <MenuItem value='Самовывоз'>Самовывоз</MenuItem>
                            <MenuItem value='Курьерской компанией'>Курьерской компанией</MenuItem>
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
                            defaultValue='банковской картой'
                        >
                            <MenuItem value='банковской картой'>банковской картой</MenuItem>
                            <MenuItem value='курьеру во время доставки'>курьеру во время доставки</MenuItem>
                            <MenuItem value='безналичная оплата'>безналичная оплата</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button type="submit" variant="contained" fullWidth>
                    Подтвердить заказ
                </Button>
            </Box>
            <ModalOrder modalOpen={open} setModalOpen={setModalOpen}/>
        </Box>
    );
};

export default OrderForm;
