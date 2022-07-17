import React from 'react'

function Total({ amount, title, extra }) {
  return (
    <section className="text-gray-600 body-font w-64 shadow-md justify-center m-10 flex">
      <div className="flex flex-col items-center m-auto">
        <h1 className="sm:text-3xl text-2xl font-bold mb-4">{title}</h1>
        <h1 className="sm:text-3xl text-2xl font-bold mb-4">
          {amount.toLocaleString('es-ES')}$
        </h1>
        {extra != undefined && extra != null && (
          <h3 className="sm:text-lg text-lg font-bold mb-4 text-gray-400">
            {extra.toLocaleString('es-ES')}$
          </h3>
        )}
      </div>
    </section>
  )
}

export default Total
