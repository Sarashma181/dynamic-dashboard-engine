import type { ComponentType } from "react";
import { widgetRegistry } from "../../registry/widgetRegistry";
import type { WidgetConfig } from "../../types/widget";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";


interface Props {
  widget: WidgetConfig;
}


function DynamicRenderer({
  widget
}: Props) {


const Component = widgetRegistry[widget.type] as ComponentType<any>;



  if (!Component) {

    return (

      <div className="
        rounded-lg
        bg-red-100
        p-4
        text-red-700
      ">

        Unsupported widget:
        {" "}
        {widget.type}

      </div>

    );

  }



  const props = {
  ...widget,

  ...(widget.type === "METRIC_CARD" && {
    title: widget.title ?? "",
    data: widget.metricData ?? { value: "0" },
  }),

  ...(widget.type === "CHART" && {
    title: widget.title ?? "",
    data: widget.chartData ?? [],
  }),
};


  return (

    <ErrorBoundary>

      <Component
        {...props}
      />

    </ErrorBoundary>

  );

}


export default DynamicRenderer;
