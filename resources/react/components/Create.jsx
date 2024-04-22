import React, { useEffect } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useForm, Head } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export const Create = ({ status }) => {
    const { data, setData, post, processing, errors, reset } = useForm({
        casNumber: '',
        productName: '',
        quantity: '',
        expiryDate: ''
    });


    const submit = (e) => {
        e.preventDefault();
        post(route('create'));
    };

    return (
        <GuestLayout>
            <h2 className="text-2xl font-semibold text-white mb-4">Create</h2>
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <form onSubmit={submit}>
                <div className="mb-4">
                    <InputLabel htmlFor="casNumber" value="CasNumber" children={undefined} />
                    <TextInput
                        id="casNumber"
                        type="text"
                        name="casNumber"
                        value={data.casNumber}
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('casNumber', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.casNumber} className="mt-2 text-red-500" />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="productName" value="Product" children={undefined} />
                    <TextInput
                        id="productName"
                        type="text"
                        name="productName"
                        value={data.productName}
                        autoComplete="productName"
                        onChange={(e) => setData('productName', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.productName} className="mt-2 text-red-500" />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="quantity" value="Quantity" children={undefined} />
                    <TextInput
                        id="quantity"
                        type="number"
                        name="quantity"
                        value={data.quantity}
                        autoComplete="quantity"
                        onChange={(e) => setData('quantity', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.quantity} className="mt-2 text-red-500" />
                </div>
                <div className="mb-4">
                    <InputLabel htmlFor="expiryDate" value="Expiry Date" children={undefined} />
                    <TextInput
                        id="expiryDate"
                        type="date"
                        name="expiryDate"
                        value={data.expiryDate}
                        autoComplete="expiryDate"
                        onChange={(e) => setData('expiryDate', e.target.value)}
                        className="mt-1 block w-full"
                    />
                    <InputError message={errors.expiryDate} className="mt-2 text-red-500" />
                </div>
                <PrimaryButton disabled={processing} className="ms-4">
                    Create
                </PrimaryButton>
            </form>
        </GuestLayout>
    );
};
