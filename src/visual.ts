/*
*  Power BI Visual CLI
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

import "core-js/stable";
import "./../style/visual.less";
import powerbi from "powerbi-visuals-api";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions;
import VisualObjectInstance = powerbi.VisualObjectInstance;
import DataView = powerbi.DataView;
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject;
import IVisualHost = powerbi.extensibility.IVisualHost;
import { dataRoleHelper } from "powerbi-visuals-utils-dataviewutils";

import PrimitiveValue = powerbi.PrimitiveValue;

import DataViewCategorical = powerbi.DataViewCategorical;
import DataViewValueColumn = powerbi.DataViewValueColumn;
import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;



import * as d3 from "d3";

import { VisualSettings } from "./settings";
import VisualObjectInstanceEnumeration = powerbi.VisualObjectInstanceEnumeration;
import { style } from "d3";

import {drawCercle, drawRect, drawTriangle, drawText, drawForm, widthSVGText, eightSVGText } from "./drawButtons";
import { createValueColumns } from "powerbi-visuals-utils-dataviewutils/lib/dataViewTransform";
import { DataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils/lib/dataViewObjectsParser";
import { stringifyAsPrettyJSON } from "powerbi-visuals-utils-formattingutils/lib/src/stringExtensions";
import { ValueFormatterOptions } from "powerbi-visuals-utils-formattingutils/lib/src/valueFormatter";

import { createTooltipServiceWrapper, TooltipEventArgs, ITooltipServiceWrapper, TooltipEnabledDataPoint } from "powerbi-visuals-utils-tooltiputils";



type Selection<T extends d3.BaseType> = d3.Selection<T, any,any, any>;

export class Visual implements IVisual {
    // ...
    private host: IVisualHost;
    private svg: Selection<SVGElement>;
   
    private container: Selection<SVGElement>;
    private xAxis: Selection<SVGElement>;
    private visualSettings: VisualSettings;
    // ...

    private tooltipServiceWrapper: ITooltipServiceWrapper;

    constructor(options: VisualConstructorOptions) {

        this.host = options.host;
        this.svg = d3.select(options.element)
            .append('svg')
            .classed('myCard', true)
            .style("overflow-x", "scroll")
            .style("overflow-y", "scroll");

        this.container = this.svg.append("g")
            .classed('container', true)
            .style("overflow-x", "scroll");


        this.xAxis = this.svg.append('g')
                .classed('xAxis', true);
        //this.tooltipServiceWrapper = createTooltipServiceWrapper(this.host.  tooltipService, options.element);

       
    }

  


    public enumerateObjectInstances(options: EnumerateVisualObjectInstancesOptions): VisualObjectInstanceEnumeration {
        const settings: VisualSettings = this.visualSettings || <VisualSettings>VisualSettings.getDefault();
        
        

        return VisualSettings.enumerateObjectInstances(settings, options);
    }


    public update(options: VisualUpdateOptions) {

        
        this.visualSettings = VisualSettings.parse<VisualSettings>(options && options.dataViews && options.dataViews[0])
        let dataView: DataView = options.dataViews[0];
        
       

        const categoricalDataView: DataViewCategorical = dataView.categorical;


        if (!categoricalDataView ||
            !categoricalDataView.categories ||
            !categoricalDataView.categories[0] ||
            !categoricalDataView.values) {
            return;
        }
    
        let width: number = options.viewport.width;
        let height: number = options.viewport.height;
        this.svg.attr("width", width);
        this.svg.attr("height", height);
        
        this.container.remove();
        
        this.container = this.svg.append("g")
            .classed('container', true)
            .style("overflow-x", "scroll")
            .style("overflow-y", "scroll");

        let xstart:number = 20;
        let ystart:number = 20;   
      
        let px: number=0;
        let py: number=0;
        let lpx:number = 0;
        let lpy:number = 0;

        let labelSpace:number=10;
       
// Categories have only one column in data buckets
        // If you want to support several columns of categories data bucket, you should iterate categoricalDataView.categories array.
        let categoryFieldIndex:number = 0;
        // Measure has only one column in data buckets.
        // If you want to support several columns on data bucket, you should iterate years.values array in map function
        //let measureFieldIndex:number = 0;
        let categories: PrimitiveValue[] = categoricalDataView.categories[categoryFieldIndex].values;
        let categorieSource: DataViewCategoryColumn = categoricalDataView.categories[categoryFieldIndex];
        let values: DataViewValueColumn[] = categoricalDataView.values;
       
        let dataValueIndicator:DataViewValueColumn[] = values.filter(
            function(d) {
                if (d.source.roles["measure"]) {return true};
            }
        );

        let dataValueObjectif:DataViewValueColumn[] = values.filter(
            function(d) {
                if (d.source.roles["objectif"]) {return true};
            }
        );


        let msizet:number = 0;
        
        // iterate categories/

        
        var nbColumn:number=values.length;
        


        let formColor: string="white";
        let measureColor: string = "black";
        let orientation:string = "horizontal-rl";
        
        let pxLabel:number=0;
        let pyLabel:number=0;
        let labelCadrex:number=0;
        let labelCadrey:number=0;
        let heightTitre:number=0;
        let i:number=0;
        

        
        if (this.visualSettings.label.show){
            categories.map((category: PrimitiveValue, categoryIndex: number) => {
        
                msizet = Math.max(widthSVGText(category.toString(),
                this.visualSettings.label.labelFontSize,
                this.visualSettings.label.labelFontFamily)
                ,msizet);                
           
               });  
        };

        msizet = msizet + labelSpace;

        heightTitre = Math.max(eightSVGText(dataValueIndicator[0].source.displayName,
            this.visualSettings.label.labelFontSize,
            this.visualSettings.label.labelFontFamily),
            heightTitre);  

       
        
        if (this.visualSettings.label.labelTextAnchor=="start") {
            pxLabel= labelSpace/2;
        }
        else{
            if (this.visualSettings.label.labelTextAnchor=="middle"){
                pxLabel=msizet/2;
            }
            else {
                if (this.visualSettings.label.labelTextAnchor=="end") {
                    pxLabel=msizet-labelSpace/2;
                };
            };
        };

        i=0;
        if (this.visualSettings.measure.measureTitre) {ystart = ystart + heightTitre;};

        if (this.visualSettings.measure.measureTitre) {
            dataValueIndicator.map((indicator:DataViewValueColumn) => {
            
            
                py = ystart-heightTitre;

                if (this.visualSettings.form.formOrientation=="Horizontale") {            
                    px = xstart+( i+0.5)*(this.visualSettings.form.formSizex)+
                    i*(this.visualSettings.form.formSpacex)+
                    msizet;                    
                }
                else {                    
                    py = xstart+( i+0.5)*(this.visualSettings.form.formSizey)+
                        this.visualSettings.form.formSpacey+
                        i*(this.visualSettings.form.formSpacey)+
                        msizet;
                };

                drawText(
                this.container,
                indicator.source.displayName,
                px,
                py,
                "0.35em",
                this.visualSettings.label.labelFontSize,
                this.visualSettings.label.labelColor,
                this.visualSettings.label.labelFontFamily,
                "middle",
                orientation
                ); 
            i++;
        });
    };
 
        categories.map((category: PrimitiveValue, categoryIndex: number) => {
            const button = document.createElement("button") as HTMLButtonElement;
            button.value = category.toString();

            
            if (this.visualSettings.form.formOrientation=="Horizontale") {
                px = xstart+pxLabel;
                py = ystart+(categoryIndex)*(this.visualSettings.form.formSizey+
                this.visualSettings.form.formSpacey);
                labelCadrex=msizet;
                labelCadrey=this.visualSettings.form.formSizey;
                lpx=xstart+labelCadrex/2;
                lpy=py;

            }
            else {
                px = xstart+(categoryIndex+0.5)*(this.visualSettings.form.formSizex+
                this.visualSettings.form.formSpacex);
                py = ystart+pxLabel;
                orientation = "vertical-lr";
                labelCadrex = this.visualSettings.form.formSizex;
                labelCadrey=msizet;
                lpx=px,
                lpy=ystart+labelCadrey/2;
            };

            if (this.visualSettings.label.show){
                
                drawForm(
                    this.container,
                    this.visualSettings.form.formForm,
                    lpx,
                    lpy,                    
                    labelCadrex,
                    labelCadrey,
                    this.visualSettings.form.formRadius,
                    "",
                    this.visualSettings.label.labelCadreColor,
                    this.visualSettings.label.labelCadreOpacity,
                    this.visualSettings.label.labelCadreStrokeColor,
                    this.visualSettings.label.labelCadreStrokeSize
                    );

                drawText(
                    this.container,
                    category.toString(),
                    px,
                    py,
                    "0.35em",
                    this.visualSettings.label.labelFontSize,
                    this.visualSettings.label.labelColor,
                    this.visualSettings.label.labelFontFamily,
                    this.visualSettings.label.labelTextAnchor,
                    orientation
                    ); 
                   
                };
            i =0;
            dataValueIndicator.map((indicator: DataViewValueColumn) => {
   
                formColor = "white";
                measureColor = "black";

                
                if (this.visualSettings.form.formOrientation=="Horizontale") {
            
                    px = xstart+( i+0.5)*(this.visualSettings.form.formSizex)+
                    (i+1)*(this.visualSettings.form.formSpacex)+
                    msizet;
                    
                }
                else {
                    
                    py = xstart+( i+0.5)*(this.visualSettings.form.formSizey)+
                    this.visualSettings.form.formSpacey+
                    i*(this.visualSettings.form.formSpacey)+
                    msizet;
                };

                if (this.visualSettings.form.show) {
                    formColor = this.visualSettings.form.formColor3;
                    if (dataValueObjectif.length>0) {
                        formColor = this.visualSettings.form.formColor3;
                        measureColor = this.visualSettings.form.formMeasureColor3;
                        if(parseFloat(dataValueObjectif[0].values[categoryIndex].toString()) <= this.visualSettings.form.formSeuil1) { 
                            formColor = this.visualSettings.form.formColor1;
                            measureColor = this.visualSettings.form.formMeasureColor1;
                        }
                        else {
                            if(parseFloat(dataValueObjectif[0].values[categoryIndex].toString()) <= this.visualSettings.form.formSeuil2) {
                                formColor = this.visualSettings.form.formColor2;
                                measureColor = this.visualSettings.form.formMeasureColor2;
                            };
                        };                        
                    };
                    drawForm(
                        this.container,
                        this.visualSettings.form.formForm,
                        px,
                        py,                        
                        this.visualSettings.form.formSizex,
                        this.visualSettings.form.formSizey,
                        this.visualSettings.form.formRadius,
                        "",
                        formColor,
                        this.visualSettings.form.opacity,
                        this.visualSettings.form.formStrokeColor,
                        this.visualSettings.form.formStrokeSize
                        );
                };
                                
                if (this.visualSettings.measure.show){
                    
                    drawText(
                        this.container,
                        indicator.values[categoryIndex].toString(),
                        //valuesIndicator[i][categoryIndex].toString(),
                        px,
                        py,
                        "0.35em",
                        this.visualSettings.form.formMeasureFontSize,
                        measureColor,
                        this.visualSettings.form.formMeasureFontFamily,
                        "middle",
                        orientation
                    );
                };    
                i++;        
            });
            
        });

    }
   
}