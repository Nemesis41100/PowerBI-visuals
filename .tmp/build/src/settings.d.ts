import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;
export declare class FormSettings {
    formForm: string;
    formOrientation: string;
    formColor1: string;
    formThickness1: number;
    formThicknessColor1: string;
    formColor2: string;
    formThickness2: number;
    formThicknessColor2: string;
    fillRule: string;
    MarkerShape: string;
}
export declare class LabelSettings {
    labelTextAnchor: string;
    labelFontFamily: string;
    labelFontSize: number;
    labelColor: string;
}
export declare class MeasureSettings {
    measureColor: string;
    measureFontSize: number;
}
export declare class VisualSettings extends DataViewObjectsParser {
    form: FormSettings;
    label: LabelSettings;
    measure: MeasureSettings;
}
