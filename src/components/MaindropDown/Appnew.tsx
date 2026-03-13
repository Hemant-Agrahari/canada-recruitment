// import { City, Country, State } from "country-state-city";
// import { useEffect, useState } from "react";
// import Dropdown from "@/components/CountryShow/Dropdown"; // Update import path as necessary

// // Define types for the state
// type CountryType = {
//   isoCode: string;
//   name: string;
// };

// type StateType = {
//   isoCode: string;
//   name: string;
// };

// type CityType = {
//   isoCode: string;
//   name: string;
// };

// const Appnew = () => {
//   const countryData: CountryType[] = Country.getAllCountries();
//   const [stateData, setStateData] = useState<StateType[]>([]);
//   const [cityData, setCityData] = useState<CityType[]>([]);

//   const [country, setCountry] = useState<CountryType | null>(countryData[0] || null);
//   const [state, setState] = useState<StateType | null>(null);
//   const [city, setCity] = useState<CityType | null>(null);

//   useEffect(() => {
//     if (country?.isoCode) {
//       setStateData(State.getStatesOfCountry(country.isoCode) || []);
//     }
//   }, [country]);

//   useEffect(() => {
//     if (state?.isoCode) {
//       setCityData(City.getCitiesOfState(country?.isoCode || '', state.isoCode) || []);
//     } else {
//       setCityData([]); // Reset city data if no state is selected
//     }
//   }, [state]);

//   useEffect(() => {
//     if (stateData.length && !state) {
//       setState(stateData[0]); // Set default state if state is not set
//     }
//   }, [stateData]);

//   useEffect(() => {
//     if (cityData.length && !city) {
//       setCity(cityData[0]); // Set default city if city is not set
//     }
//   }, [cityData]);

//   const getFilterdatabyLocation = () => {
//     // Add your implementation here
//     console.log('Fetching data by location...');
//   };

//   return (
//     <section className="min-h-screen px-3 grid place-items-center pb-20 selection:text-white selection:bg-teal-500 bg-gradient-to-r from-teal-400 to-teal-500">
//       <div>
//         <div className="flex flex-wrap gap-4 justify-center d-flex">
//           <div className="col-lg-3 col-md-6">
//             <div className="registration-form-box">
//               <Dropdown
//                 data={countryData}
//                 selected={country}
//                 setSelected={setCountry}
//                 label="Country"
//               />
//             </div>
//           </div>
//           {stateData.length > 0 && (
//             <div className="col-lg-3 col-md-6">
//               <div className="registration-form-box">
//                 <Dropdown
//                   data={stateData}
//                   selected={state}
//                   setSelected={setState}
//                   label="State"
//                 />
//               </div>
//             </div>
//           )}
//           {cityData.length > 0 && (
//             <div className="col-lg-3 col-md-6">
//               <div className="registration-form-box">
//                 <Dropdown
//                   data={cityData}
//                   selected={city}
//                   setSelected={setCity}
//                   label="City"
//                 />
//               </div>
//             </div>
//           )}
//           <div className="col-lg-3 col-md-6">
//             <div className="registration-form-box">
//               <input
//                 onClick={getFilterdatabyLocation}
//                 className="submitBnt btn btn-primary btn-block"
//                 defaultValue="Submit"
//                 type="button" // Changed type to "button" to prevent form submission
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Appnew;
