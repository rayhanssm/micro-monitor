import { CirclePlus, Pencil, Trash2 } from "lucide-react";
import React from "react";

// TODO: delete later
const tableDummies = [
  {
    month: "January",
    target: 0,
  },
  {
    month: "February",
    target: 4000000,
  },
  {
    month: "March",
    target: 5000000,
  },
  {
    month: "April",
    target: 6000000,
  },
  {
    month: "May",
    target: 6000000,
  },
  {
    month: "June",
    target: 6000000,
  },
  {
    month: "July",
    target: 6000000,
  },
  {
    month: "August",
    target: 6000000,
  },
  {
    month: "September",
    target: 6000000,
  },
  {
    month: "Oktober",
    target: 6000000,
  },
  {
    month: "November",
    target: 6000000,
  },
  {
    month: "Desember",
    target: 6000000,
  },
];

const options = ["2024", "2023", "2022"];

function CustomTable() {
  const lastItem = tableDummies.length - 1;

  return (
    <div className="border rounded-md p-6">
      <table className="table-auto w-full rounded-md">
        <thead className="text-left">
          <tr>
            <th className="pb-2">Month</th>
            <th className="pb-2">Target</th>
            <th className="pb-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tableDummies.map((content, index) => (
            <tr key={index} className="border-t">
              <td
                className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
              >
                {content.month}
              </td>
              <td
                className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
              >
                {content.target ? content.target : "-"}
              </td>
              <td
                className={`pt-2.5 ${index === lastItem ? "pb-0" : "pb-2.5"}`}
              >
                {content.target ? (
                  <div className="flex gap-2">
                    <button>
                      <Pencil size={20} color="#0F766E" />
                    </button>
                    <button>
                      <Trash2 size={20} color="#0F766E" />
                    </button>
                  </div>
                ) : (
                  <div className="flex">
                    <button>
                      <CirclePlus size={20} color="#0F766E" />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;
