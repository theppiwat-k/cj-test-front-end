export interface IIot {
  id: number;
  device_name: string;
  sensor_type: string;
  status: boolean;
}

export interface ICreateIot {
  device_name: string;
  sensor_type: string;
  status: string | boolean;
}

export interface IUpdateIot {
  device_name: string;
  sensor_type: string;
  status: boolean;
}
