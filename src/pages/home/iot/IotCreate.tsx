import React, {useState} from "react";
import {Input} from "../../../components/forms/Input";
import {FormProvider, useForm} from "react-hook-form";
import {ICreateIot} from "../../../models/iot";
import {Radio} from "../../../components/forms/Radio";
import {PrimaryButton} from "../../../components/buttons/PrimaryButton";
import {useNavigate} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ApiErrorHelper from "../../../utils/apiErrorHelper";

export function IotCreate() {
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const methods = useForm<ICreateIot>({});

  const navaigateToCreateIot = () => {
    navigate("/");
  };

  const onSubmit = methods.handleSubmit(async data => {
    try {
      const body: ICreateIot = {
        device_name: data.device_name,
        sensor_type: data.sensor_type,
        status: data.status === "true" ? true : false,
      };
      await axiosPrivate.post("api/iot", body);
      navaigateToCreateIot();
    } catch (error) {
      console.error("Axios Error:", error);
      const errorHelper = new ApiErrorHelper(error);
      const errorMessage = errorHelper.getErrorMessage();
      setError(errorMessage);
    }
  });

  const statusRadio = [
    {
      id: "active",
      label: "Active",
      value: "true",
    },
    {
      id: "inactive",
      label: "Inactive",
      value: "false",
    },
  ];

  return (
    <div className="bg-white p-10 shadow-md">
      <h1 className="text-2xl font-bold">Create Iot</h1>
      <div className="mt-4">
        <FormProvider {...methods}>
          <form
            onSubmit={e => e.preventDefault()}
            noValidate
            autoComplete="off">
            <div className="gird-cols-4 grid gap-2">
              <div className="col-span-2">
                <Input
                  label="Device Name"
                  type="text"
                  id="device_name"
                  placeholder=""
                  validation={{
                    required: {
                      value: true,
                      message: "required",
                    },
                  }}
                />
              </div>
              <div className="col-span-2">
                <Input
                  label="Sensor Type"
                  type="text"
                  id="sensor_type"
                  placeholder=""
                  validation={{
                    required: {
                      value: true,
                      message: "required",
                    },
                  }}
                />
              </div>
              <div className="col-span-4">
                <Radio
                  registerName="status"
                  label="Status"
                  defaultValue="true"
                  options={statusRadio}
                />
              </div>
            </div>
            <div className="mb-6">
              <span className="text-xs text-red-500">{error}</span>
            </div>
            <PrimaryButton
              type="submit"
              id="createiot"
              text="Create Iot"
              className="mt-4 text-base"
              onClick={onSubmit}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
