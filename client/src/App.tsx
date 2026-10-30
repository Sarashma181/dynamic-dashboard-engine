import { useEffect, useState } from "react";
import DynamicRenderer from "./components/Layout/DynamicRenderer";
import { useDashboard } from "./hooks/useDashboard";
import DashboardSkeleton from "./components/Skeleton/DashboardSkeleton";


function App() {


  const [prompt, setPrompt] = useState(
    "Show me analytics"
  );


  const [submittedPrompt, setSubmittedPrompt] = useState(
    "Show me analytics"
  );



  const {
    data,
    isLoading,
    isFetching,
    error
  } = useDashboard(submittedPrompt);




  const layoutClass =
    data?.layout === "grid-3"
      ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"

      : data?.layout === "grid-2"
      ? "grid gap-6 md:grid-cols-2"

      : "flex flex-col gap-6";






  useEffect(() => {


    if (data?.theme) {

      document.documentElement.className =
        data.theme;

    }


  }, [data]);






  if (isLoading) {


    return (

      <div
        className="
          min-h-screen
          bg-[var(--background)]
          p-8
          text-[var(--text-color)]
        "
      >


        <h1
          className="
            mb-8
            text-3xl
            font-bold
          "
        >

          Xpin AI Dashboard

        </h1>



        <DashboardSkeleton />

      </div>

    );

  }





  if(error){


    return (

      <div
        className="
          min-h-screen
          p-8
          text-red-500
        "
      >

        Something went wrong

      </div>

    );

  }






  return (


    <div

      className="
        min-h-screen
        bg-[var(--background)]
        p-8
        text-[var(--text-color)]
      "

    >



      <h1

        className="
          mb-6
          text-3xl
          font-bold
        "

      >

        Xpin AI Dashboard

      </h1>






      {/* Prompt Input */}

      <div

        className="
          mb-6
          flex
          gap-4
        "

      >



        <input

          value={prompt}

          onChange={(e)=>
            setPrompt(e.target.value)
          }


          placeholder="Describe dashboard"


          className="
            flex-1
            rounded
            border
            p-3
            bg-[var(--background)]
            text-[var(--text-color)]
            border-[var(--border-color)]
          "

        />





        <button


          disabled={isFetching}


          onClick={() =>
            setSubmittedPrompt(prompt)
          }


          className="
            rounded
            bg-black
            px-5
            py-2
            text-white
            disabled:opacity-50
          "

        >


          {
            isFetching
              ? "Generating..."
              : "Generate Dashboard"
          }


        </button>



      </div>






      {
        isFetching && (

          <p
            className="
              mb-4
              text-sm
              opacity-70
            "
          >

            Generating dashboard...

          </p>

        )

      }







      <div className={layoutClass}>


        {
          data?.widgets?.map(

            (widget:any,index:number)=>(

              <DynamicRenderer

                key={index}

                widget={widget}

              />

            )

          )

        }


      </div>





    </div>


  );

}


export default App;