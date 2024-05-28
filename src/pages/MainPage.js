import React,{useEffect, useState} from 'react'
import axios from 'axios'

export default function MainPage() {

    const[date, setDate]= useState(null);
    const[sourceCurrency, setSourceCurrency]=useState("");
    const[targetCurrency, setTargetCurrency]=useState("");
    const[amountInsourceCurrency, setAmountInSourceCurrency]=useState(0);
    const[amountInTargetCurrency, setAmountInTargetCurrency]=useState(0);
    const[currencyNames, setCurrencyNames] = useState([]);
    const[loading,setLoading] = useState(true);

    //handle submit method
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.get("http://localhost:5000/convert",{params:{date,sourceCurrency,targetCurrency,amountInsourceCurrency}});
            setAmountInTargetCurrency(response.data);
            setLoading(false);
            console.log(amountInsourceCurrency,amountInTargetCurrency);

        }catch(e){
          console.error(e);
        }
    };

    //get currency list
    useEffect(()=>{
        const getCurrencyNames = async()=>{
          try{
            const response = await axios.get("http://localhost:5000/getAllCurrencies");
            setCurrencyNames(response.data);
          }catch(e){
            console.error(e);
          }
        }
        getCurrencyNames();
    },[])

  return (
    <div>
      <h1 className="lg:mx-32 text-5xl font-bold text-blue-500">Currencies convertion </h1>
      <p className='lg:mx-32 opacity-40 py-6'>This is a web site to easily convert currencies based on the latest exchange rate</p>
      <div className='mt-5 flex items-center justify-center flex-col'>
        <section className='w-full lg:w-1/2'>
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                <label htmlFor={date} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                 <input onChange={(e)=>setDate(e.target.value)} type="date" id={date} name={date} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
                 </div>
                 <div className='mb-4'>
                <label htmlFor={sourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Source currency</label>
                 <select onChange={(e)=>setSourceCurrency(e.target.value)} name={sourceCurrency} id={sourceCurrency} value={sourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
                 <option value="">Select the source currency</option>
                 {Object.keys(currencyNames).map((currency)=>(
                  <option className='p-1' key={currency} value={currency}>{currencyNames[currency]}</option>

                 ))}
                 </select>
                 </div>
                 <div className='mb-4'>
                <label htmlFor={targetCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Target currency</label>
                 <select onChange={(e)=>setTargetCurrency(e.target.value)} name={targetCurrency} id={targetCurrency} value={targetCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required>
                 <option value="">Select the target currency</option>
                 {Object.keys(currencyNames).map((currency)=>(
                  <option className='p-1' key={currency} value={currency}>{currencyNames[currency]}</option>

                 ))}
                 </select>
                 </div>
                 <div className='mb-4'>
                <label htmlFor={amountInsourceCurrency} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Amount in source currency</label>
                 <input onChange={(e)=>setAmountInSourceCurrency(e.target.value)} type="number" name={amountInsourceCurrency} id={amountInsourceCurrency} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Amount in source currency" required />
                 </div>
                 <button  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Get the target currency</button>
            </form>
        </section>
      </div>
      {!loading ? <section className='mt-5 lg:mx-72 text-xl'>
       {amountInsourceCurrency} {currencyNames[sourceCurrency]} is equal to {" "}<span className='text-blue-500 font-bold '> {amountInTargetCurrency}</span>{" "} in {currencyNames[targetCurrency]}
       </section> : null}
      
    </div>
  )
}
