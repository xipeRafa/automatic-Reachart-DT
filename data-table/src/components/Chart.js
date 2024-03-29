import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const Chart = ({data}) => {

   return (

      <LineChart width={1000} height={500} data={data} margin={{top: 25,right: 30, left: 20, bottom: 5}}>

            <Line type="monotone" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }}/>
            <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            <Line type="monotone" dataKey="amt" stroke="red" />

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
         

       </LineChart>
       
   )
}

export default Chart
