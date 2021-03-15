/*
 *  Power BI Visualizations
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils";
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser;


export class FormSettings {

  public show:boolean = true;

  public formForm: string = "Circle";
  public formOrientation: string = "Horizontale";
  public formSizex: number = 50;
  public formSizey: number = 50;
  public formSpacex:number = 10;
  public formSpacey:number = 10;
  public formRadius:number = 0;
  public formSeuil1: number = 0;  
  public formSeuil2: number = 0;
  public formColor1: string = "green";
  public formColor2: string = "yellow";  
  public formColor3: string = "red";     
  public opacity:number = 100;
  

  public formMeasureColor1: string = "black";
  public formMeasureColor2: string = "black";
  public formMeasureColor3: string = "black";
  public formMeasureFontSize: number=10;
  public formMeasureFontFamily: string = "Arial";

  public formStrokeColor: string = "black";
  public formStrokeSize:number = 0;

}

export class LabelSettings {  

  public show:boolean = true;

  public labelTextAnchor: string = "middle";  
  public labelFontFamily: string = "Arial";
  public labelFontSize: number = 10;
  public labelColor: string = "black";

  
  public labelCadreColor: string = "white";
  public labelCadreOpacity:number=100;
  public labelCadreStrokeColor: string = "black";
  public labelCadreStrokeSize:number = 1;
 
  
}

export class Rcv_Script {

    public provider:string="";

};

export class MeasureSettings {

  public show:boolean = true;

  public measureTitre:boolean = true; 
  public measureFontFamily: string = "Arial";
  public measureFontSize: number = 10;
  public measureColor: string = "black";

  public measureListIndicateur: string[]=[];

}


export class VisualSettings extends DataViewObjectsParser {
  public form: FormSettings = new FormSettings();
  public label: LabelSettings = new LabelSettings();
  public measure: MeasureSettings = new MeasureSettings();
  public rcv_script: Rcv_Script = new Rcv_Script();

}

