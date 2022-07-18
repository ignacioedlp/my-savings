import Head from 'next/head'
import CreateSaving from '../components/CreateSaving.jsx'
import Table from '../components/Table.jsx'
import Total from '../components/Total.jsx'

export default function Home({
  data,
  totalInUsdCCL,
  totalInArsCCL,
  dolarCCL,
  optionsCurrency,
  totalInCrypto,
  dolarBlue,
}) {
  return (
    <>
      <Head>
        <title>My savings</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="">
          <h1 className="text-xl font-semibold">My savings</h1>
        </div>
        <div className="mt-4 shadow-md">
          <CreateSaving optionsCurrency={optionsCurrency} />
        </div>
        <div className="flex flex-col md:flex-row justify-center w-full items-center">
          <Total title={'USD CCL'} amount={dolarCCL} />
          <Total title={'USD Blue'} amount={dolarBlue} />
          <Total title={'Total in ARS'} amount={totalInArsCCL.toFixed(2)} />
          <Total
            title={'Total in USD'}
            amount={totalInUsdCCL.totalInUsd}
            extra={totalInUsdCCL.totalInArsCCL.toFixed(2)}
          />
          <Total
            title={'Total in Crypto'}
            amount={totalInCrypto.totalInCrypto}
            extra={totalInCrypto.totalInArsCripto.toFixed(2)}
          />
        </div>
        <div className="mt-4 shadow-md">
          <Table data={data} />
        </div>
      </main>
    </>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('https://my-savings.vercel.app/api/saving')
  const criptoResponse = await fetch(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
    {
      method: 'GET',
      redirect: 'follow',
    },
  )

  const criptoList = await criptoResponse.json()
  console.log(criptoList)

  var requestOptions = {
    method: 'GET',
    redirect: 'follow',
  }

  const dolarCCL = await fetch(
    'https://api-dolar-argentina.herokuapp.com/api/contadoliqui',
    requestOptions,
  )
    .then((res) => res.json())
    .catch((error) => console.log('error', error))

  const dolarBlue = await fetch(
    'https://api-dolar-argentina.herokuapp.com/api/dolarblue',
    requestOptions,
  )
    .then((res) => res.json())
    .catch((error) => console.log('error', error))

  //Creo un array con objetos de {id, name, amount}
  let optionsCurrency = criptoList.map((coin) => {
    return { value: coin.id, label: coin.name, name: 'newCurrency' }
  })

  let totalInUsd = 0
  let totalInArsCCL = 0
  let totalInCrypto = 0

  if (response.statusCode === 500)
    return {
      props: {
        data,
        totalInUsdCCL: {
          totalInUsd: totalInUsd,
          totalInArsCCL: totalInUsd * parseFloat(dolarCCL.venta),
        },
        totalInArsCCL:
          totalInArsCCL +
          totalInUsd * parseFloat(dolarCCL.venta) +
          totalInCrypto * parseFloat(dolarBlue.venta),
        dolarCCL: parseFloat(dolarCCL.venta),
        dolarBlue: parseFloat(dolarBlue.venta),
        optionsCurrency: optionsCurrency,
        totalInCrypto: {
          totalInCrypto: totalInCrypto,
          totalInArsCripto: totalInCrypto * parseFloat(dolarBlue.venta),
        },
      },
    }

  const data = await response.json()

  for (const element of data) {
    if (element.currency == 'usd') {
      totalInUsd = totalInUsd + element.amount
    }
  }

  for (const element of data) {
    if (element.currency == 'ars') {
      totalInArsCCL = totalInArsCCL + element.amount
    }
  }

  for (const element of data) {
    if (element.category == 'Cripto') {
      let coin = criptoList.find((c) => c.id == element.currency)
      if (coin != undefined && coin != null) {
        totalInCrypto += coin.current_price * element.amount
      }
    }
  }

  return {
    props: {
      data,
      totalInUsdCCL: {
        totalInUsd: totalInUsd.toFixed(2),
        totalInArsCCL: totalInUsd * parseFloat(dolarCCL.venta),
      },
      totalInArsCCL:
        totalInArsCCL +
        totalInUsd * parseFloat(dolarCCL.venta) +
        totalInCrypto * parseFloat(dolarBlue.venta),
      dolarCCL: parseFloat(dolarCCL.venta),
      dolarBlue: parseFloat(dolarBlue.venta),
      optionsCurrency: optionsCurrency,
      totalInCrypto: {
        totalInCrypto: totalInCrypto.toFixed(2),
        totalInArsCripto: totalInCrypto * parseFloat(dolarBlue.venta),
      },
    },
  }
}
