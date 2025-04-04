"use client";

import React, { useState, useEffect } from "react";
import { Label } from "./ui/label";
import { Input } from "@/components/ui/input";
import { getDate } from "@/helpers/getDate";
import { IoIosAddCircle } from "react-icons/io";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

// total, company, number are still pending
function Bill({ ...props }) {
  const date = getDate();
  const id = props.id;
  const company = props.company;
  const router = useRouter();

  const [billNum, setBillNum] = useState("");

  useEffect(() => {
    const fetchInvoiceNum = async () => {
      try {
        const response = await axios.post("/api/bills/get-last-bill", {
          companyId: id,
        });

        if (response.data.status === 200) {
          setBillNum(String(Number(response.data.lastBill.billNum) + 1));
        } else {
          if (company === "maa-saraswati-road-carriers") {
            setBillNum("001"); // changes for new year
          } else if (company === "the-rising-freight-carriers") {
            setBillNum("001"); // changes for new year
          } else if (company === "sharma-transport") {
            setBillNum("001"); // changes for new year
          } else {
            setBillNum("Invalid company");
          }
        }
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    fetchInvoiceNum();
  }, []);

  const [fieldData, setFieldData] = useState([
    {
      sNumber: "",
      date: ``,
      cnNum: "",
      from: "",
      to: "",
      particular: "",
      weight: "",
      rate: "",
      amount: "",
      advance: "",
      balance: "",
    },
  ]);
  const [normalData, setNormalData] = useState({
    name: "",
    total: "",
    mainBillDate: "",
  });

  const addField = (e: any) => {
    e.preventDefault();
    setFieldData((prev): any => {
      return [
        ...prev,
        {
          sNumber: "",
          date: ``,
          cnNum: "",
          from: "",
          to: "",
          particular: "",
          weight: "",
          rate: "",
          amount: "",
          advance: "",
          balance: "",
        },
      ];
    });
  };

  const handleChange = (e: any, index: number) => {
    const { name, value } = e.target;

    setFieldData((prev): any => {
      let item: any = prev[index];
      item[name] = value;
      return [...prev];
    });
  };

  const handleNormalChange = (e: any) => {
    const { name, value } = e.target;
    setNormalData({ ...normalData, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/bills", {
        company: id,
        billNum: billNum,
        // mainBillDate: date,
        list: fieldData,
        ...normalData,
      });

      if (response.status === 200 && response.data.status === 200) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }

      router.push(`/bills/${company}/${id}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <form
        action="#"
        method="post"
        onSubmit={handleSubmit}
        className="flex flex-col gap-y-4"
      >
        <div className="border bg-black dark:bg-white/90 dark:text-black text-white rounded p-2 font-semibold capitalize">
          Add New Bill details
        </div>

        <div className="grid grid-cols-3 gap-x-6">
          <div className="">
            <Label>M/S.</Label>
            <Input
              name="name"
              id="name"
              type="text"
              value={normalData.name}
              onChange={handleNormalChange}
              placeholder="m/s"
            />
          </div>
          <div className="">
            <Label htmlFor="billNo">BILL NO</Label>
            <Input
              id="billNo"
              type="text"
              value={billNum}
              onChange={(e) => setBillNum(e.target.value)}
              placeholder="Enter bill number"
            />
          </div>
          <div className="">
            <Label>DATE</Label>
            <Input
              type="text"
              name="mainBillDate"
              id="mainBillDate"
              value={normalData.mainBillDate}
              onChange={handleNormalChange}
              placeholder={`${date}`}
            />
          </div>
        </div>

        <div className="border bg-black dark:bg-white/90 dark:text-black text-white rounded p-2 font-semibold capitalize">
          Add Item details
        </div>

        {fieldData?.map((data, index) => (
          <div className="flex flex-col gap-y-4" key={index}>
            <div className="grid grid-cols-3 gap-x-6 gap-y-4">
              <div className="">
                <Label>S.NO.</Label>
                <Input
                  name="sNumber"
                  id="sNumber"
                  type="text"
                  value={data.sNumber}
                  onChange={(e: any) => handleChange(e, index)}
                  placeholder="set particular"
                />
              </div>

              <div className="">
                <Label>DATE</Label>
                <Input
                  name="date"
                  id="date"
                  type="text"
                  value={data.date}
                  onChange={(e: any) => handleChange(e, index)}
                  placeholder={`${date}`}
                />
              </div>

              <div className="">
                <Label>CN NUMBER</Label>
                <Input
                  name="cnNum"
                  id="cnNum"
                  type="text"
                  value={data.cnNum}
                  onChange={(e: any) => handleChange(e, index)}
                  placeholder="enter CN number"
                />
              </div>

              <div className="">
                <Label>FROM</Label>
                <Input
                  name="from"
                  id="from"
                  type="text"
                  value={data.from}
                  onChange={(e: any) => handleChange(e, index)}
                  placeholder="enter from"
                />
              </div>

              <div className="">
                <Label className="uppercase">To</Label>
                <Input
                  name="to"
                  id="to"
                  type="text"
                  value={data.to}
                  onChange={(e: any) => handleChange(e, index)}
                  placeholder="enter to"
                />
              </div>

              <div className="">
                <Label className="uppercase">particular</Label>
                <Input
                  name="particular"
                  id="particular"
                  type="text"
                  value={data.particular}
                  onChange={(e: any) => handleChange(e, index)}
                  placeholder="enter particular"
                />
              </div>

              <div className="">
                <Label className="uppercase">weight</Label>
                <Input
                  name="weight"
                  id="weight"
                  type="text"
                  value={data.weight}
                  onChange={(e: any) => handleChange(e, index)}
                  placeholder="enter weight"
                />
              </div>

              <div className="">
                <Label className="uppercase">rate</Label>
                <Input
                  name="rate"
                  id="rate"
                  type="text"
                  value={data.rate}
                  onChange={(e: any) => handleChange(e, index)}
                  placeholder="enter rate"
                />
              </div>

              <div className="">
                <Label className="uppercase">amount</Label>
                <Input
                  name="amount"
                  id="amount"
                  type="text"
                  value={data.amount}
                  onChange={(e: any) => handleChange(e, index)}
                  placeholder="enter amount"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="w-[43%]">
                <Label className="uppercase">advance</Label>
                <Input
                  name="advance"
                  id="advance"
                  type="text"
                  value={data.advance}
                  onChange={(e: any) => handleChange(e, index)}
                  placeholder="enter advance"
                />
              </div>

              <div className="w-[43%]">
                <Label className="uppercase">balance</Label>
                <Input
                  name="balance"
                  id="balance"
                  type="text"
                  value={data.balance}
                  onChange={(e: any) => handleChange(e, index)}
                  placeholder="enter balance"
                />
              </div>
              <div className="text-5xl w-[4%] flex justify-end items-end cursor-pointer">
                <IoIosAddCircle
                  className="hover:text-black/85"
                  onClick={addField}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="">
          <Label>TOTAL</Label>
          <Input
            name="total"
            id="total"
            type="text"
            value={normalData.total}
            onChange={handleNormalChange}
          />
        </div>

        <div className="flex justify-center pt-8">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
}

export default Bill;
