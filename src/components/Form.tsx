import { useState } from 'react';
import { api, type RouterOutputs } from '@/utils/api';
import { useSession } from "next-auth/react";


export type FormValues = {
  firstName: string;
  lastName: string;
  address: string;
  hospitalName: string;
  dateOfService: string;
  billAmount: string;
};

export const initialFormValues: FormValues = {
  firstName: '',
  lastName: '',
  address: '',
  hospitalName: '',
  dateOfService: '',
  billAmount: '',
};

type Bill = RouterOutputs["bill"]["getAll"][0];

const Form = () => {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [updated, setUpdated] = useState(false);

  const { data: sessionData } = useSession();
  
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const { refetch: refetchBills } = api.bill.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedBill(selectedBill ?? data[0] ?? null);
      },
    }
  );

  const createBill = api.bill.create.useMutation({
    onSuccess: () => {
      void refetchBills();
    },
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value
    }));
  };
  
  const onNext = () => {
    setUpdated(true);
  };
  
  const onEdit = () => {
    setUpdated(false);
  };

  const onSubmit = () => {

    createBill.mutate({
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      address: formValues.address,
      hospitalName: formValues.hospitalName,
      dateOfService: formValues.dateOfService,
      billAmount: formValues.billAmount,
    });

    formModal.close()

    setTimeout(() => {
      setFormValues(initialFormValues);
      setUpdated(false)
    }, 1000)
  };

  return (
    <div>
      <button className="btn btn-ghost" onClick={() => formModal.showModal()}>
        Create Bill
      </button>
      <dialog id="formModal" className="modal">
        <form method="dialog" className="modal-box">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          <div className="flex justify-center w-full max-w-lg">
          {updated ? (
            <div className="flex justify-center flex-wrap">
              <h2 className="font-bold text-lg my-5 mx-3">Bill Summary</h2>
              <div className="form-control mx-3 mb-6 space-y-1 w-full max-w-xs">
                <span><b>First Name:</b> {formValues.firstName}</span> 
                <span><b>Last Name:</b> {formValues.lastName}</span>
                <span><b>Address:</b> {formValues.address}</span>
                <span><b>Hospital Name:</b> {formValues.hospitalName}</span>
                <span><b>Date of Service:</b> {formValues.dateOfService}</span>
                <span><b>Bill Amount:</b> ${formValues.billAmount}</span>
              </div>
              <div className="form-control w-full max-w-xs my-2 space-y-2">
                <button className="btn" onClick={onEdit}>Edit</button>
                <button className="btn" onClick={onSubmit}>Submit</button>
              </div>
            </div>
          ) : (
          <div className="flex justify-center flex-wrap mx-3 my-3 space-y-1">
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input 
                type="text" 
                name="firstName" 
                value={formValues.firstName} 
                onChange={onChange} 
                placeholder="Type here" 
                className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input 
                type="text" 
                name="lastName" 
                value={formValues.lastName} 
                onChange={onChange} 
                placeholder="Type here" 
                className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input 
                type="text" 
                name="address" 
                value={formValues.address} 
                onChange={onChange} 
                placeholder="Type here" 
                className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Hospital Name</span>
              </label>
              <input 
                type="text" 
                name="hospitalName" 
                value={formValues.hospitalName} 
                onChange={onChange} 
                placeholder="Type here" 
                className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Date of Service</span>
              </label>
              <input 
                type="date" 
                name="dateOfService" 
                value={formValues.dateOfService} 
                onChange={onChange} 
                placeholder="Type here" 
                className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Bill Amount</span>
              </label>
              <input 
                type="number" 
                name="billAmount" 
                value={formValues.billAmount} 
                onChange={onChange} 
                placeholder="Type here" 
                className="input input-bordered w-full max-w-xs" />
            </div>
            <div className="form-control w-full max-w-xs p-5">
              <button className="btn" onClick={onNext}>Submit</button>
            </div>
          </div>
          )}
        </div>
        </form>
      </dialog>
    </div>
  );
};

export default Form;
