import { useContext }  from 'react'
import CountryContext from '../context/country/CountryContext'

export default function CountryList(){
    const countries = useContext(CountryContext);

  return (
    <div>
        <select name="country-field" id="">
        {
            countries.map(e=><option value={e.id}>{e.name}</option>)
        }
        </select>

    </div>
  )
}