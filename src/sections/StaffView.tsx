import { staffList } from "@/_dummyData/auth";
import IconButton from "@/components/customize/atoms/button/IconButton";
import Pagination from "@/components/customize/molecules/pagination/Pagination";
import ModalCard from "@/components/customize/organisms/cards/ModalCard";
import StaffCard from "@/components/customize/organisms/cards/StaffCard";
import StaffForm from "@/components/customize/organisms/forms/StaffForm";
import { staffField, staffSchema } from "@/data/AuthData";
import { AuthRepository } from "@/repositories/AuthRepository";
import { IStaffRequest } from "@/types/requests/AuthRequest";
import { IStaffListResponse } from "@/types/responses/AuthResponse";
import { showToast } from "@/utils/toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { CirclePlus, LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

function StaffView() {
  const [isShowAddModal, setIsShowAddModal] = useState(false);
  const [isReload, setIsReload] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [currPage, setCurrPage] = useState<number>(1);
  const [totalData, setTotalData] = useState(0);
  // const pageCount = Math.ceil(dataLength / 12);
  const [data, setData] = useState<IStaffListResponse[] | null>([]);
  const pageCount = Math.ceil(totalData / 12);

  const methods = useForm({
    resolver: yupResolver(staffSchema),
    defaultValues: staffField(),
    mode: "onChange",
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: IStaffRequest) => {
    try {
      await AuthRepository.AddStaff(data);
      reset();
      setIsReload(!isReload);
      setIsShowAddModal(false);
      showToast("Staf berhasil ditambahkan", "success");
    } catch (error: any) {
      showToast(
        error.response?.data.error ? error.response.data.error : error.message,
        "error"
      );
    }
  };

  const getData = async () => {
    try {
      setIsLoadingData(true);
      const res = await AuthRepository.GetStaffList({
        size: 12,
        page: currPage,
      });
      setData(res.data.data);
      setTotalData(res.data.totalData);
      setIsLoadingData(false);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    getData();
  }, [isReload, currPage]);

  return (
    <div className="flex flex-col w-full gap-6">
      <div>
        <IconButton
          icon={<CirclePlus />}
          text="Tambah"
          type="filled"
          onClick={() => setIsShowAddModal(true)}
        />
      </div>

      {isLoadingData ? (
        <div className="w-full flex justify-center pt-20">
          <LoaderCircle size={40} className="animate-spin text-teal-500" />
        </div>
      ) : (
        <div className="flex flex-col lg:grid grid-cols-3 gap-x-5 gap-y-5">
          {data?.length === 0
            ? "Tidak ada data"
            : data?.map((staff) => (
                <StaffCard
                  key={staff.userID}
                  staffData={staff}
                  isReload={isReload}
                  setIsReload={setIsReload}
                />
              ))}
        </div>
      )}

      <div className="flex justify-center mt-14">
        <Pagination
          pageCount={pageCount}
          currPage={currPage}
          setCurrPage={setCurrPage}
        />
      </div>

      <ModalCard
        open={isShowAddModal}
        setOpen={setIsShowAddModal}
        title="Tambah Staff"
        buttonText={isSubmitting ? "Memuat..." : "Tambah"}
        onClick={handleSubmit(onSubmit)}
      >
        <FormProvider {...methods}>
          <StaffForm onSubmit={handleSubmit(onSubmit)} />
        </FormProvider>
      </ModalCard>
    </div>
  );
}

export default StaffView;
