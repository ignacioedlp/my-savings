import React, { useState } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { addSaving } from '../context/slices/savings.js';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router.js';

const optionsCategories = [
  { value: 'Fiat', label: 'Fiat', name: 'newCategory' },
  { value: 'Cripto', label: 'Cripto', name: 'newCategory' },
  { value: 'USD fisico', label: 'USD fisico', name: 'newCategory' },
  { value: 'Mercado libre', label: 'Mercado libre', name: 'newCategory' },
  { value: 'OnTop', label: 'OnTop', name: 'newCategory' },
  { value: 'Lemon', label: 'Lemon', name: 'newCategory' },
  { value: 'Payoneer', label: 'Payoneer', name: 'newCategory' },
  { value: 'Cuenta DNI', label: 'Cuenta DNI', name: 'newCategory' },
];

const optionsConcept = [
  { value: 'Salary', label: 'Salary', name: 'newConcept' },
  { value: 'Gift', label: 'Gift', name: 'newConcept' },
  { value: 'Invest', label: 'Invest', name: 'newConcept' },
];

const optionsFiats = [
  { value: 'usd', label: 'USD', name: 'newCurrency' },
  { value: 'ars', label: 'ARS', name: 'newCurrency' },
];

function CreateSaving({ optionsCurrency }) {
  const [values, setValues] = React.useState({
    newCategory: '',
    newCurrency: '',
    newConcept: '',
    newAmount: 0,
  });

  function handleChangeAmount(evt) {
    /*
      evt.target es el elemento que ejecuto el evento
      name identifica el input y value describe el valor actual
    */
    console.log(evt);
    const { target } = evt;
    const { name, value } = target;
    /*
      Este snippet:
      1. Clona el estado actual
      2. Reemplaza solo el valor del
         input que ejecutó el evento
    */
    const newValues = {
      ...values,
      [name]: value,
    };
    // Sincroniza el estado de nuevo
    setValues(newValues);
  }

  function handleChangeSelect(evt) {
    /*
      evt.target es el elemento que ejecuto el evento
      name identifica el input y value describe el valor actual
    */
    console.log(evt);

    const { label, value, name } = evt;
    /*
      Este snippet:
      1. Clona el estado actual
      2. Reemplaza solo el valor del
         input que ejecutó el evento
    */
    const newValues = {
      ...values,
      [name]: value,
    };
    // Sincroniza el estado de nuevo
    setValues(newValues);
  }

  const handleCreateSaving = async (e) => {
    e.preventDefault();
    let raw = JSON.stringify({
      category: values.newCategory,
      currency: values.newCurrency,
      concept: values.newConcept,
      amount: values.newAmount,
    });

    console.log(raw);

    try {
      const res = await fetch('https://my-savings.vercel.app/api/saving', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: raw,
        redirect: 'follow',
      });
      toast.success('Successfully created!');
    } catch (error) {
      console.log('error', error);
      toast.error('This is an error!');
    }

    // dispatch(addSaving(values))
  };

  return (
    <section className="text-white body-font relative ">
      <Toaster />
      <div className="container px-5 py-10 mx-auto">
        <div className="flex flex-col text-center w-full mb-4">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            New saving
          </h1>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  forHtml="newCategory"
                  className="leading-7 text-md text-whites"
                >
                  Category
                </label>
                <Select
                  options={optionsCategories}
                  onChange={handleChangeSelect}
                  type="text"
                  id="newCategory"
                  name="newCategory"
                  className="text-black"
                />
              </div>
            </div>

            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  forHtml="newCurrency"
                  className="leading-7 text-md text-whites"
                >
                  Currency
                </label>
                <Select
                  options={
                    values.newCategory.includes('Cripto')
                      ? optionsCurrency
                      : optionsFiats
                  }
                  onChange={handleChangeSelect}
                  type="text"
                  id="newCurrency"
                  name="newCurrency"
                  className="text-black"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  forHtml="newConcept"
                  className="leading-7 text-md text-white"
                >
                  Concept
                </label>
                <Select
                  options={optionsConcept}
                  onChange={handleChangeSelect}
                  type="text"
                  id="newConcept"
                  name="newConcept"
                  className="text-black"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  forHtml="newAmount"
                  className="leading-7 text-md text-white"
                >
                  Amount
                </label>
                <input
                  onChange={handleChangeAmount}
                  type="number"
                  id="newAmount"
                  value={values.newAmount}
                  name="newAmount"
                  className="w-full bg-white bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-black py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <button
              className="flex mx-auto mt-6 text-white bg-rose-500 border-0 py-2 px-5 focus:outline-none hover:bg-rose-600 rounded"
              onClick={handleCreateSaving}
            >
              Add saving
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CreateSaving;
