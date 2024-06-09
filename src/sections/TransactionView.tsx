"use client";

import { transactionList } from "@/_dummyData/transaction";
import IconButton from "@/components/customize/atoms/button/IconButton";
import RangeDatePicker from "@/components/customize/molecules/date-picker/RangeDatePicker";
import SearchField from "@/components/customize/molecules/input-field/SearchField";
import TransactionCard from "@/components/customize/organisms/cards/TransactionCard";
import TransactionTable from "@/components/customize/organisms/tables/TransactionTable";
import { fDayDate } from "@/utils/formatDate";
import { CirclePlus, Download } from "lucide-react";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";

function TransactionView() {
  const [selected, setSelected] = useState<DateRange>();
  const [isShowAddModal, setIsShowAddModal] = useState(false);

  return (
    <div className="px-[116px] py-[112px]">
      <div className="flex justify-between mb-6">
        <SearchField name="transactionSearch" setSearchText={() => {}} />

        <div className="flex gap-6">
          <RangeDatePicker selected={selected} setSelected={setSelected} />
          <IconButton
            icon={<Download />}
            text="Export to Excel"
            type="outlined"
          />
          <IconButton
            icon={<CirclePlus />}
            text="Add"
            type="filled"
            onClick={() => setIsShowAddModal(true)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-10 gap-y-5">
        {transactionList.map((data, index) => (
          <div key={index}>
            <p className="font-semibold text-2xl mb-4 lining-nums">
              {fDayDate(data.date)}
            </p>
            <TransactionCard data={data} />
          </div>
        ))}
      </div>

      {/* TODO: delete later */}
      {/* <TransactionTable
        isShowAddModal={isShowAddModal}
        setIsShowAddModal={setIsShowAddModal}
      /> */}
    </div>
  );
}

export default TransactionView;
