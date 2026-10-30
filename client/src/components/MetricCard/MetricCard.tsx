interface MetricCardProps {

  title: string;

  data: {

    value: string;

    unit?: string;

    trend?: string;

    status?: string;

    sparkline?: number[];

  };

}



function MetricCard({
  title,
  data
}: MetricCardProps) {


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
        transition
        duration-300
        hover:-translate-y-1
      "

    >



      <p

        className="
          text-sm
          opacity-70
        "

      >

        {title}

      </p>




      <div

        className="
          mt-2
          flex
          items-end
          gap-2
        "

      >


        <h2

          className="
            text-3xl
            font-bold
          "

        >

          {data.value}

        </h2>



        {
          data.unit && (

            <span

              className="
                mb-1
                text-sm
                opacity-70
              "

            >

              {data.unit}

            </span>

          )
        }



      </div>





      {
        data.trend && (

          <p

            className={`
              mt-3
              text-sm
              ${
                data.status === "success"
                  ? "text-green-500"
                  : "text-red-500"
              }
            `}

          >

            {data.trend}

          </p>

        )
      }





    </div>

  );

}


export default MetricCard;