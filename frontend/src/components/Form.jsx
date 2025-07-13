// src/components/Form.js

import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FormInput from "./FormInput";
import Button from "./Button";
import axios from "axios";

const defaultFormFields = {
  invoiceType: "Sale Invoice",
  invoiceDate: "", // yyyy-MM-dd
  sellerNTNCNIC: "",
  sellerBusinessName: "",
  sellerProvince: "",
  sellerAddress: "",
  buyerNTNCNIC: "",
  buyerBusinessName: "",
  buyerProvince: "",
  buyerAddress: "",
  buyerRegistrationType: "Registered", // or “Unregistered”
  invoiceRefNo: "",
  scenarioId: "SN000",

  // We’ll collapse the “items” array into _one_ set of inputs for now:
  hsCode: "",
  productDescription: "",
  rate: "", // e.g. “18%”
  uoM: "", // unit of measure
  quantity: "",
  totalValues: "",
  valueSalesExcludingST: "",
  fixedNotifiedValueOrRetailPrice: "",
  salesTaxApplicable: "",
  salesTaxWithheldAtSource: "",
  extraTax: "",
  furtherTax: "",
  sroScheduleNo: "",
  fedPayable: "",
  discount: "",
  saleType: "",
  sroItemSerialNo: "",
};

const Form = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const {
    invoiceType,
    invoiceDate,
    sellerNTNCNIC,
    sellerBusinessName,
    sellerProvince,
    sellerAddress,
    buyerNTNCNIC,
    buyerBusinessName,
    buyerProvince,
    buyerAddress,
    buyerRegistrationType,
    invoiceRefNo,
    scenarioId,
    hsCode,
    productDescription,
    rate,
    uoM,
    quantity,
    totalValues,
    valueSalesExcludingST,
    fixedNotifiedValueOrRetailPrice,
    salesTaxApplicable,
    salesTaxWithheldAtSource,
    extraTax,
    furtherTax,
    sroScheduleNo,
    fedPayable,
    discount,
    saleType,
    sroItemSerialNo,
  } = formFields;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // build the payload per FBR spec
    const payload = {
      invoiceType,
      invoiceDate,
      sellerNTNCNIC,
      sellerBusinessName,
      sellerProvince,
      sellerAddress,
      buyerNTNCNIC,
      buyerBusinessName,
      buyerProvince,
      buyerAddress,
      buyerRegistrationType,
      invoiceRefNo,
      scenarioId,
      items: [
        {
          hsCode,
          productDescription,
          rate,
          uoM,
          quantity: Number(quantity),
          totalValues: Number(totalValues),
          valueSalesExcludingST: Number(valueSalesExcludingST),
          fixedNotifiedValueOrRetailPrice: Number(
            fixedNotifiedValueOrRetailPrice
          ),
          salesTaxApplicable: Number(salesTaxApplicable),
          salesTaxWithheldAtSource: Number(salesTaxWithheldAtSource),
          extraTax,
          furtherTax: Number(furtherTax),
          sroScheduleNo,
          fedPayable: Number(fedPayable),
          discount: Number(discount),
          saleType,
          sroItemSerialNo,
        },
      ],
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/fbr/invoices`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (res.data.success) {
        toast.success("Invoice submitted to FBR sandbox successfully!");
        setFormFields(defaultFormFields);
      } else {
        toast.error("FBR returned an error: " + JSON.stringify(res.data.error));
      }
    } catch (err) {
      console.error(err);
      toast.error("Network or server error posting invoice to FBR");
    }
  };

  return (
    <div className="flex justify-center">
      <form className="w-[600px] space-y-4" onSubmit={onSubmitHandler}>
        {/* Top‐level fields */}
        <FormInput
          label="Invoice Date"
          name="invoiceDate"
          value={invoiceDate}
          placeholder="YYYY-MM-DD"
          type="date"
          onChangeHandler={onChangeHandler}
        />
        <FormInput
          label="Seller NTN/CNIC"
          name="sellerNTNCNIC"
          value={sellerNTNCNIC}
          placeholder="0000000000000"
          onChangeHandler={onChangeHandler}
        />
        <FormInput
          label="Seller Business Name"
          name="sellerBusinessName"
          value={sellerBusinessName}
          placeholder="Your Business Name"
          onChangeHandler={onChangeHandler}
        />
        <FormInput
          label="Seller Province"
          name="sellerProvince"
          value={sellerProvince}
          placeholder="Seller Province"
          onChangeHandler={onChangeHandler}
        />
        <FormInput
          label="Seller Address"
          name="sellerAddress"
          value={sellerAddress}
          placeholder="Seller Address"
          onChangeHandler={onChangeHandler}
        />

        <FormInput
          label="Buyer NTN/CNIC"
          name="buyerNTNCNIC"
          value={buyerNTNCNIC}
          placeholder="0000000000000"
          onChangeHandler={onChangeHandler}
        />
        <FormInput
          label="Buyer Business Name"
          name="buyerBusinessName"
          value={buyerBusinessName}
          placeholder="Buyer Business Name"
          onChangeHandler={onChangeHandler}
        />
        <FormInput
          label="Buyer Province"
          name="buyerProvince"
          value={buyerProvince}
          placeholder="Buyer Province"
          onChangeHandler={onChangeHandler}
        />
        <FormInput
          label="Buyer Address"
          name="buyerAddress"
          value={buyerAddress}
          placeholder="Buyer Address"
          onChangeHandler={onChangeHandler}
        />
        <FormInput
          label="Registration Type"
          name="buyerRegistrationType"
          value={buyerRegistrationType}
          placeholder="Registered / Unregistered"
          onChangeHandler={onChangeHandler}
        />

        <FormInput
          label="Invoice Ref No"
          name="invoiceRefNo"
          value={invoiceRefNo}
          placeholder="Your reference no"
          onChangeHandler={onChangeHandler}
        />
        <FormInput
          label="Scenario ID"
          name="scenarioId"
          value={scenarioId}
          placeholder="SN000"
          onChangeHandler={onChangeHandler}
        />

        {/* Item fields */}
        <div className="pt-4 border-t border-gray-600">
          <h3 className="text-lg text-white mb-2">Invoice Item</h3>
          <FormInput
            label="HS Code"
            name="hsCode"
            value={hsCode}
            placeholder="0000.0000"
            onChangeHandler={onChangeHandler}
          />
          <FormInput
            label="Description"
            name="productDescription"
            value={productDescription}
            placeholder="Product description"
            onChangeHandler={onChangeHandler}
          />
          <FormInput
            label="Rate"
            name="rate"
            value={rate}
            placeholder="e.g. 18%"
            onChangeHandler={onChangeHandler}
          />
          <FormInput
            label="UoM"
            name="uoM"
            value={uoM}
            placeholder="Unit of measure"
            onChangeHandler={onChangeHandler}
          />
          <FormInput
            label="Quantity"
            name="quantity"
            value={quantity}
            type="number"
            onChangeHandler={onChangeHandler}
          />
          <FormInput
            label="Total Values"
            name="totalValues"
            value={totalValues}
            type="number"
            onChangeHandler={onChangeHandler}
          />
          <FormInput
            label="Value excl. ST"
            name="valueSalesExcludingST"
            value={valueSalesExcludingST}
            type="number"
            onChangeHandler={onChangeHandler}
          />
          <FormInput
            label="Notified/Retail Price"
            name="fixedNotifiedValueOrRetailPrice"
            value={fixedNotifiedValueOrRetailPrice}
            type="number"
            onChangeHandler={onChangeHandler}
          />
          <FormInput
            label="Sales Tax App."
            name="salesTaxApplicable"
            value={salesTaxApplicable}
            type="number"
            onChangeHandler={onChangeHandler}
          />
          <FormInput
            label="ST Withheld at Source"
            name="salesTaxWithheldAtSource"
            value={salesTaxWithheldAtSource}
            type="number"
            onChangeHandler={onChangeHandler}
          />
          {/* …and the rest of your item fields similarly… */}
        </div>

        <Button type="submit">Submit to FBR Sandbox</Button>
      </form>
    </div>
  );
};

export default Form;
