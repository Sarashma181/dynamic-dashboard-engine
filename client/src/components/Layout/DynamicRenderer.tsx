import { widgetRegistry } from "../../registry/widgetRegistry";
import type { WidgetConfig } from "../../types/widget";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";


interface Props {
  widget: WidgetConfig;
}


function DynamicRenderer({
  widget
}: Props) {


  const Component =
    widgetRegistry[widget.type];



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


    // Backend metric card data
    ...(widget.type === "METRIC_CARD" && {

      data: widget.data

    }),



    // Backend chart data
    ...(widget.type === "CHART" && {

      data: widget.data

    })

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