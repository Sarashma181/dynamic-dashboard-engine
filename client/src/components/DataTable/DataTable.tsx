import { useMemo, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import TableRow from "./TableRow";


interface Props {
  title?: string;
  columns?: string[];
  rows?: any[];
}


function DataTable({
  title,
  columns = [],
  rows = []
}: Props) {


  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "asc",
  });


  const [filterText, setFilterText] = useState("");


  const parentRef = useRef<HTMLDivElement>(null);



  const handleSort = (column: string) => {

    setSortConfig(prev => ({

      key: column,

      direction:
        prev.key === column &&
        prev.direction === "asc"
          ? "desc"
          : "asc",

    }));

  };




  // Filtering
  const filteredRows = useMemo(() => {


    if (!filterText.trim()) {

      return rows;

    }


    const search =
      filterText.toLowerCase().trim();



    return rows.filter(row => {


      const idMatch =
        row.id?.toString() === search;



      const customerMatch =
        row.customer
          ?.toLowerCase()
          .includes(search);



      return (
        idMatch ||
        customerMatch
      );


    });


  }, [rows, filterText]);







  // Sorting
  const sortedRows = useMemo(() => {


    if (!sortConfig.key) {

      return filteredRows;

    }



    return [...filteredRows].sort(
      (a, b) => {


        const valueA =
          a[sortConfig.key];


        const valueB =
          b[sortConfig.key];



        if (valueA < valueB) {

          return sortConfig.direction === "asc"
            ? -1
            : 1;

        }



        if (valueA > valueB) {

          return sortConfig.direction === "asc"
            ? 1
            : -1;

        }



        return 0;


      }
    );


  }, [
    filteredRows,
    sortConfig
  ]);







  const rowVirtualizer = useVirtualizer({

    count: sortedRows.length,

    getScrollElement: () =>
      parentRef.current,

    estimateSize: () => 50,

    overscan: 5,

  });




  const virtualItems =
    rowVirtualizer.getVirtualItems();





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





      {/* Search */}

      <input

        type="text"

        placeholder="Search by ID or customer..."

        value={filterText}

        onChange={(e) =>
          setFilterText(e.target.value)
        }


        className="
          mb-4
          w-full
          rounded
          border
          p-2
          bg-[var(--background)]
          text-[var(--text-color)]
          border-[var(--border-color)]
        "

      />






      {/* Header */}

      <div
        className="
          flex
          border-b
          font-bold
          border-[var(--border-color)]
        "
      >


        {columns.map(column => (

          <div

            key={column}

            onClick={() =>
              handleSort(column)
            }


            className="
              flex-1
              cursor-pointer
              border-r
              p-2
              hover:bg-gray-100
            "

          >


            {column}


            {
              sortConfig.key === column &&
              (
                sortConfig.direction === "asc"
                  ? " ↑"
                  : " ↓"
              )
            }


          </div>

        ))}


      </div>







      {/* Virtualized rows */}

      <div

        ref={parentRef}

        className="
          h-96
          overflow-auto
        "

      >


        <div

          style={{

            height:
              `${rowVirtualizer.getTotalSize()}px`,

            position: "relative",

          }}

        >



          {
            virtualItems.map(
              (virtualRow) => {


                const row =
                  sortedRows[virtualRow.index];



                return (

                  <div

                    key={row.id}

                    style={{

                      position: "absolute",

                      top: 0,

                      left: 0,

                      width: "100%",

                      transform:
                        `translateY(${virtualRow.start}px)`,

                    }}

                  >


                    <TableRow

                      row={row}

                      columns={columns}

                    />


                  </div>

                );


              }
            )
          }



        </div>


      </div>



    </div>

  );

}


export default DataTable;