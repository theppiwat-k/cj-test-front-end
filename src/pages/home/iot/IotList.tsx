import React, {useEffect, useState} from "react";
import {IIot} from "../../../models/iot";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import {PrimaryButton} from "../../../components/buttons/PrimaryButton";
import {useNavigate} from "react-router-dom";
import {DangerButton} from "../../../components/buttons/DangerButton";
import {useAuth} from "../../../provider/AuthContext";

const initState: IIot[] = [];

export function IotList() {
  const {progress, setProgress} = useAuth();
  const navigate = useNavigate();
  const [iotList, setIotList] = useState<IIot[]>(initState);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    setProgress(progress + 20);
    const getIotList = async () => {
      try {
        const response = await axiosPrivate.get(`api/iot/all`);
        isMounted && setIotList(response.data);
      } catch (error) {
        if (isMounted) {
          console.error("error", error);
        }
      } finally {
        setProgress(100);
      }
    };
    getIotList();
    return () => {
      isMounted = false;
    };
  }, [axiosPrivate]);

  const navaigateToCreateIot = () => {
    navigate("iot-create");
  };

  const navaigateToView = (id: number) => {
    navigate(`iot-view/${id}`);
  };

  const deleteIot = async (id: number) => {
    if (confirm()) {
      try {
        await axiosPrivate.delete(`api/iot/${id}`);
        const response = await axiosPrivate.get(`api/iot/all`);
        setIotList(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="w-full bg-white p-10 shadow-md">
        <PrimaryButton
          type="button"
          id="createiot"
          text="Create IOT"
          onClick={navaigateToCreateIot}
        />
        {iotList && (
          <table className="mt-4 w-full table-fixed">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Device Name
                </th>
                <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Sensor Type
                </th>
                <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Status
                </th>
                <th className="bg-blueGray-50 text-blueGray-500 border-blueGray-100 whitespace-nowrap border border-l-0 border-r-0 border-solid px-6 py-3 text-left align-middle text-xs font-semibold uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {iotList.map(iot => (
                <tr key={iot.id}>
                  <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                    {iot.device_name}
                  </td>
                  <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                    {iot.sensor_type}
                  </td>
                  <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                    {iot.status === true ? "active" : "inactive"}
                  </td>
                  <td className="whitespace-nowrap border-l-0 border-r-0 border-t-0 p-4 px-6 align-middle text-xs">
                    <PrimaryButton
                      type="button"
                      id="createiot"
                      text="View"
                      className="mr-2"
                      onClick={() => {
                        navaigateToView(iot.id);
                      }}
                    />
                    <DangerButton
                      type="button"
                      id="createiot"
                      text="Delete"
                      onClick={() => {
                        deleteIot(iot.id);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
