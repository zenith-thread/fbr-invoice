import { useState, useEffect } from "react";

import { toast } from "react-toastify";

// components
import FormInput from "./FormInput";
import Button from "./Button";

// custom hooks
import { useInvoice } from "../hooks/useInvoice";

const defaultFormFields = {
  invoiceNumber: "",
  productName: "",
  price: "",
  gst: "",
};

const Form = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { invoiceNumber, productName, price, gst } = formFields;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  // custom hooks
  const {
    invoiceCreateInvoiceAsync,
    invoiceLoadingCreateInvoice,
    invoiceSuccessCreateInvoice,
    invoiceFailedCreateInvoice,
  } = useInvoice();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    invoiceCreateInvoiceAsync(formFields);
    setFormFields(defaultFormFields);
  };

  useEffect(() => {
    if (invoiceSuccessCreateInvoice) {
      toast.success("Invoice created successfully");
    } else if (invoiceFailedCreateInvoice) {
      toast.error("Invoice creation failed");
    }
  }, [invoiceSuccessCreateInvoice, invoiceFailedCreateInvoice]);

  return (
    <div className="flex justify-center">
      <form className="w-[500px]" onSubmit={onSubmitHandler}>
        <FormInput
          label="Invoice Number"
          name="invoiceNumber"
          value={invoiceNumber}
          placeholder="Enter Invoice Number"
          type="text"
          onChangeHandler={onChangeHandler}
        />
        <FormInput
          label="Product Name"
          name="productName"
          value={productName}
          placeholder="Enter Product Name"
          type="text"
          onChangeHandler={onChangeHandler}
        />
        <FormInput
          label="Product Price"
          name="price"
          value={price}
          placeholder="Enter Product Price"
          type="text"
          onChangeHandler={onChangeHandler}
        />
        <FormInput
          label="GST"
          name="gst"
          value={gst}
          placeholder="Enter GST"
          type="text"
          onChangeHandler={onChangeHandler}
        />
        <Button className="btn" type="submit">
          {invoiceLoadingCreateInvoice ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default Form;
