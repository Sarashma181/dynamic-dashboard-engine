import { z } from "zod";



const MetricCardSchema = z.object({

  id: z.string().optional(),

  type: z.literal("METRIC_CARD"),

  title: z.string(),

  data: z.object({

    value: z.string(),

    unit: z.string().optional(),

    trend: z.string().optional(),

    status: z.string().optional(),

    sparkline: z.array(
      z.number()
    ).optional()

  })

});





const TableRowSchema = z.object({

  id: z.number(),

  customer: z.string(),

  amount: z.number(),

  status: z.string()

});





const TableSchema = z.object({

  id: z.string().optional(),

  type: z.literal("TABLE"),

  title: z.string(),

  columns: z.array(
    z.string()
  ).optional(),


  rows: z.array(
    TableRowSchema
  ).optional()

});







const FormFieldSchema = z.object({

  name: z.string(),

  label: z.string(),

  type: z.enum([

    "text",

    "email",

    "number",

    "slider",

    "toggle"

  ]),


  required: z.boolean().optional(),


  min: z.number().optional(),


  max: z.number().optional()

});





const FormSchema = z.object({

  id: z.string().optional(),

  type: z.literal("DYNAMIC_FORM"),

  title: z.string(),

  fields: z.array(
    FormFieldSchema
  ),


  actionEndpoint: z.string().optional()

});








const ChartSchema = z.object({

  id: z.string().optional(),

  type: z.literal("CHART"),

  title: z.string(),


  data: z.array(

    z.object({

      month: z.string(),

      value: z.number()

    })

  )

});







export const WidgetSchema =

z.discriminatedUnion(

  "type",

  [

    MetricCardSchema,

    TableSchema,

    ChartSchema,

    FormSchema

  ]

);







export const DashboardSchema = z.object({

  theme: z.string(),

  layout: z.string(),

  widgets: z.array(
    WidgetSchema
  )

});