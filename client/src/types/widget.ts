export interface FormField {

  name: string;

  label: string;

  type:
    | "text"
    | "email"
    | "number"
    | "slider"
    | "toggle";

  required?: boolean;

  min?: number;

  max?: number;

}




export interface TableRow {

  id: number;

  customer: string;

  amount: number;

  status: string;

}




export interface ChartData {

  month: string;

  value: number;

}




export interface MetricCardData {

  value: string;

  unit?: string;

  trend?: string;

  status?: string;

  sparkline?: number[];

}




export interface WidgetConfig {


  id?: string;


  type:
    | "METRIC_CARD"
    | "TABLE"
    | "CHART"
    | "DYNAMIC_FORM";



  title?: string;



  // Metric card data
  metricData?: MetricCardData;



  // Chart data
  chartData?: ChartData[];



  // Form
  fields?: FormField[];

  actionEndpoint?: string;



  // Table
  columns?: string[];

  rows?: TableRow[];

}