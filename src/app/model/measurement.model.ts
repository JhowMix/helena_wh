import { MeasurementUnit } from "./measurement-unit.model";

export interface Measurement {
    id?: number;
    width: number;
    height: number;
    length: number;
    unit: MeasurementUnit;
}
