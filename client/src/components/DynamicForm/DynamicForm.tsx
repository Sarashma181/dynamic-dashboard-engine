import { useState } from "react";
import { useForm } from "react-hook-form";
import type { FormField } from "../../types/widget";
import { submitWidgetAction } from "../../services/widgetService";
import { useMutation } from "@tanstack/react-query";


interface Props {
  title?: string;
  fields?: FormField[];
  actionEndpoint?: string;
}


function DynamicForm({
 title,
 fields = [],
 actionEndpoint
}: Props) {


  const [submitted, setSubmitted] = useState(false);


  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm();



  const mutation = useMutation({

    mutationFn: submitWidgetAction,


    onMutate: () => {

      // Optimistic UI update
      setSubmitted(true);


      setTimeout(() => {
        setSubmitted(false);
      }, 3000);

    },


    onError: (error) => {

      // Rollback
      setSubmitted(false);

      console.error(
        "Action failed",
        error
      );

    },


    onSuccess: () => {

      reset();

    }

  });



  const onSubmit = (data: any) => {


    mutation.mutate({

  widgetId: actionEndpoint ?? "create-user",

  action:"submit",

  payload:data

});


  };



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


      <h2
        className="
          mb-4
          text-xl
          font-bold
        "
      >
        {title}
      </h2>



      <form
        onSubmit={
          handleSubmit(onSubmit)
        }
      >


        {fields.map((field) => (


          <div
            key={field.name}
            className="mb-4"
          >


            <label
              className="
                mb-1
                block
              "
            >
              {field.label}
            </label>



            {/* Slider field */}

            {field.type === "slider" && (

              <input

                type="range"
                aria-label={field.label}

                min={field.min}

                max={field.max}

                {...register(
                  field.name,
                  {
                    onChange: () => {
                      setSubmitted(false);
                    }
                  }
                )}

                className="
                  w-full
                "

              />

            )}




            {/* Toggle field */}

            {field.type === "toggle" && (

              <input

                type="checkbox"
                aria-label={field.label}

                {...register(
                  field.name,
                  {
                    onChange: () => {
                      setSubmitted(false);
                    }
                  }
                )}

                className="
                  h-5
                  w-5
                "

              />

            )}






            {/* Text / Email / Number fields */}

            {
              field.type !== "slider" &&
              field.type !== "toggle" && (

                <input

                  type={field.type}


                  {...register(

                    field.name,

                    {

                      required:
                        field.required
                          ? `${field.label} is required`
                          : false,


                      min:
                        field.min !== undefined
                          ? {
                              value: field.min,
                              message:
                                `${field.label} should be at least ${field.min}`
                            }
                          : undefined,


                      max:
                        field.max !== undefined
                          ? {
                              value: field.max,
                              message:
                                `${field.label} should be less than ${field.max}`
                            }
                          : undefined,


                      onChange: () => {
                        setSubmitted(false);
                      }

                    }

                  )}


                  min={field.min}

                  max={field.max}

                  onKeyDown={(e) => {

    if (
      field.type === "number" &&
      (
        e.key === "-" ||
        e.key === "e"
      )
    ) {

      e.preventDefault();

    }

  }}

                  className="
                    w-full
                    rounded
                    border
                    p-2
                    bg-[var(--background)]
                    text-[var(--text-color)]
                    border-[var(--border-color)]
                  "

                />

              )
            }





            {
              errors[field.name] && (

                <p
                  className="
                    mt-1
                    text-sm
                    text-red-500
                  "
                >
                  {
                    String(
                      errors[field.name]?.message
                    )
                  }

                </p>

              )
            }



          </div>


        ))}





        <button

          type="submit"

          disabled={
            mutation.isPending
          }


          className="
            rounded
            bg-black
            px-4
            py-2
            text-white
            disabled:opacity-50
          "

        >

          {
            mutation.isPending
              ? "Submitting..."
              : "Submit"
          }


        </button>



      </form>





      {
        submitted && (

          <p
            className="
              mt-4
              text-green-600
            "
          >
            User created successfully
          </p>

        )
      }



    </div>

  );

}


export default DynamicForm;