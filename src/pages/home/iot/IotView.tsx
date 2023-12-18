import React, {useEffect} from "react";
import {Input} from "../../../components/forms/Input";
import {FormProvider, useForm} from "react-hook-form";
import {ICreateIot} from "../../../models/iot";
import {Radio} from "../../../components/forms/Radio";
import {PrimaryButton} from "../../../components/buttons/PrimaryButton";
import {useNavigate, useParams} from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {useAuth} from "../../../provider/AuthContext";

export function IotView() {
  const {progress, setProgress} = useAuth();
  const params = useParams();
  const iotId = params.id;
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();
  const methods = useForm<ICreateIot>({});

  useEffect(() => {
    let isMounted = true;
    setProgress(progress + 20);
    const getIotList = async () => {
      try {
        const response = await axiosPrivate.get(`api/iot/${iotId}`);
        if (isMounted) {
          methods.setValue("device_name", response.data.device_name);
          methods.setValue("sensor_type", response.data.sensor_type);
          methods.setValue("status", response.data.status.toString());
        }
      } catch (error) {
        if (isMounted) {
          console.error("error", error);
        }
      } finally {
        setProgress(100);
      }
    };
    const controller = new AbortController();
    getIotList();
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);

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
      await axiosPrivate.patch(`api/iot/${iotId}`, body);
      navaigateToCreateIot();
    } catch (error) {
      console.error(error);
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
    <>
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
              <PrimaryButton
                type="submit"
                id="createiot"
                text="Update Iot"
                className="mt-4 text-base"
                onClick={onSubmit}
              />
            </form>
          </FormProvider>
        </div>
      </div>
    </>
  );
}
