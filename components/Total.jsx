import React from 'react'

function Total({ amount, title, extra }) {
  return (
    <section className="text-white body-font w-64 h-44 shadow-md justify-center m-10 flex bg-slate-700 rounded-md p-4 items-center">
      <div className="flex flex-col items-center m-auto text-center">
        <h1 className="sm:text-3xl text-2xl font-bold mb-4">{title}</h1>
        <h1 className="sm:text-3xl text-2xl font-bold mb-4 text-green-600">
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
