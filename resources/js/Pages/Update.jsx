
import React from 'react';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const Update = ({ auth, status, product }) => {
    const { data, setData, put, processing, errors, reset } = useForm({
        cas_number: product.cas_number,
        name: product.name,
        ml: product.ml,
        concentration: product.concentration,
        expire_date: product.expire_date,
        cabinet: product.cabinet
    });


    const submit = (e) => {
        e.preventDefault();
        put(route('products.update', product.id));
      };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-white leading-tight">Update</h2>}
        >
            <div className="max-w-md mx-auto mt-6">
                <h2 className="text-2xl font-semibold text-white mb-4 text-center">Update</h2>
                {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                <form onSubmit={submit}>
                <div className="mb-4">
                <InputLabel htmlFor="cas_number" value="Numero Cas" children={undefined} />
                <TextInput
                  id="cas_number"
                  type="text"
                  name="cas_number"
                  value={data.cas_number}
                  isFocused={true}
                  onChange={(e) => setData('cas_number', e.target.value)}
                  className="mt-1 block w-full text-black"
                />
                <InputError message={errors.casNumber} className="mt-2 text-red-500" />
              </div>
              <div className="mb-4">
                <InputLabel htmlFor="name" value="Nom" children={undefined} />
                <TextInput
                  id="name"
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="mt-1 block w-full text-black"
                />
                <InputError message={errors.productName} className="mt-2 text-red-500" />
              </div>
              <div className="mb-4">
                <InputLabel htmlFor="ml" value="Quantitat (ml)" children={undefined} />
                <TextInput
                  id="ml"
                  type="number"
                  name="ml"
                  value={data.ml}
                  onChange={(e) => setData('ml', e.target.value)}
                  className="mt-1 block w-full text-black"
                />
                <InputError message={errors.quantity} className="mt-2 text-red-500" />
              </div>
              <div className="mb-4">
                <InputLabel htmlFor="quantity" value="Concentració" children={undefined} />
                <TextInput
                  id="concentration"
                  type="number"
                  name="concentration"
                  value={data.concentration}
                  onChange={(e) => setData('concentration', e.target.value)}
                  className="mt-1 block w-full text-black"
                />
                <InputError message={errors.quantity} className="mt-2 text-red-500" />
              </div>
              <div className="mb-4">
                <InputLabel htmlFor="expire_date" value="Data d'expiració" children={undefined} />
                <TextInput
                  id="expire_date"
                  type="date"
                  name="expire_date"
                  value={data.expire_date}
                  onChange={(e) => setData('expire_date', e.target.value)}
                  className="mt-1 block w-full text-black"
                />
                <InputError message={errors.expiryDate} className="mt-2 text-red-500" />
              </div>
              <div className="mb-4">
                <InputLabel htmlFor="cabinet" value="Armari" children={undefined} />
                <TextInput
                  id="cabinet"
                  type="text"
                  name="cabinet"
                  value={data.cabinet}
                  onChange={(e) => setData('cabinet', e.target.value)}
                  className="mt-1 block w-full text-black"
                />
                <InputError message={errors.quantity} className="mt-2 text-red-500" />
              </div>
                    <PrimaryButton disabled={processing} className="ms-4 bg-blue-600 hover:bg-blue-800 focus:bg-blue-800 active:bg-blue-900 !important">
                        Update
                    </PrimaryButton>
                </form>
            </div>
        </AuthenticatedLayout>
    );

};

export default Update;
