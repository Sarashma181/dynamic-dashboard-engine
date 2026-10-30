import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


interface Props {
  title?: string;
  data?: any[];
}


function Chart({
  title,
  data = []
}: Props) {


  return (
    <div
      className="
        rounded-xl
        p-6
        shadow
        bg-[var(--card-background)]
        text-[var(--text-color)]
        border
        border-[var(--border-color)]
      "
    >

      <h2 className="mb-4 text-xl font-bold">
        {title}
      </h2>


      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <CartesianGrid
            stroke="var(--border-color)"
            strokeDasharray="3 3"
          />


          <XAxis
            dataKey="month"
            stroke="var(--text-color)"
          />


          <YAxis
            stroke="var(--text-color)"
          />


          <Tooltip
            contentStyle={{
              backgroundColor:
                "var(--card-background)",

              color:
                "var(--text-color)",

              borderColor:
                "var(--border-color)"
            }}
          />


          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>


    </div>
  );
}


export default Chart;