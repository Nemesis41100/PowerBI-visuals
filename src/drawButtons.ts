interface TextProperties {
    text?: string;
    fontFamily: string;
    fontSize: string;
    fontWeight?: string;
    fontStyle?: string;
    fontVariant?: string;
    whiteSpace?: string;
}


import { createTooltipServiceWrapper, TooltipEventArgs, ITooltipServiceWrapper, TooltipEnabledDataPoint } from "powerbi-visuals-utils-tooltiputils";

import powerbi from "powerbi-visuals-api";
import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;
import * as d3 from "d3";
import { style } from "d3";
import { textMeasurementService} from "powerbi-visuals-utils-formattingutils";
//import TextProperties = textMeasurementService. measureSvgTextWidth;
//import measureSvgTextElementWidth = textMeasurementService.measureSvgTextWidth;
type Selection<T extends d3.BaseType> = d3.Selection<T, any,any, any>;



export const labelCategoryIsDate = (categoricalColumn: DataViewCategoryColumn) => {

        if (categoricalColumn.source.type.dateTime) {
            return true;
        }
        else {
            return false;
        };        
};

export const labelCategoryFormat = (categoricalColumn: DataViewCategoryColumn) => {

    return categoricalColumn.source.format
};

export const drawForm = (
    selection: d3.Selection<SVGElement, any, any, any>,
    form:string,
    px:number,
    py:number,
    sizex:number,
    sizey:number,
    radius:number,
    point:string,
    color: string, 
    opacity:number,
    formThicknessColor:string,
    formThickness:number) => {

        if (form=="Circle") {

            drawCercle(
                selection,                        
                px,
                py,
                sizex/2,
                sizey/2,
                color,
                opacity/100,
                formThicknessColor,
                formThickness
            );

        };
        if (form=="Rectangle") {

            drawRect(
                selection,                        
                px-sizex/2,
                py-sizey/2,
                sizex,
                sizey,
                radius,
                color,
                opacity/100,
                formThicknessColor,
                formThickness
                );             
        };

};

export const drawCercle = (selection: d3.Selection<SVGElement, any, any, any>, 
    cx:number, 
    cy:number, 
    radiusx:number,
    radiusy:number,
    color: string, 
    opacity:number,
    formThicknessColor:string,
    formThickness:number
    ) => {   
    

        let bodyElement = d3.select("body");

    let element = selection.append('ellipse').classed('ellipse', true)
    .style("display","block")
    .style("fill",color)
    .attr("cx", cx)
    .attr("cy", cy)
    .attr("rx",radiusx)
    .attr("ry",radiusy)
    .style("fill-opacity", opacity)
    .style("stroke", formThicknessColor)
    .style("stroke-width", formThickness);


    
/*
tooltipServiceWrapper.addTooltip(
    selection,
    (tooltipEvent: TooltipEventArgs<TooltipEnabledDataPoint>) => {
        return tooltipEvent.data.tooltipInfo;
    });
    */
}

function showArea(){

    alert("Area of the rectangle is: 5" );
 }

 export const showTooltip = (selection: d3.Selection<SVGElement, any, any, any>) => {
    selection.append('rect').classed('rect', true)
    .style("display","block")
    .style("fill","black");
   // tooltip.style.display = "block";
    //tooltip.style.left = evt.pageX + 10 + 'px';
   // tooltip.style.top = evt.pageY + 10 + 'px';
 }
  
  function hideTooltip() {
    var tooltip = document.getElementById("tooltip");
    tooltip.style.display = "none";
  }

export const drawRect = (selection: d3.Selection<SVGElement, any, any, any>, 
    px:number, 
    py:number, 
    aretex:number,
    aretey:number,
    radius:number,
    color: string, 
    opacity:number,
    formThicknessColor:string,
    formThickness:number
    ) => {   
    
    selection.append('rect').classed('rect', true)
    .style("display","block")
    .style("fill",color)
    .attr("x", px)
    .attr("y", py)
    .attr("width",aretex)
    .attr("height",aretey)
    .attr("rx",radius)   
    .style("fill-opacity", opacity)
    .style("stroke", formThicknessColor)
    .style("stroke-width", formThickness)
    .attr("onmouseover", "showTooltip(selection)")
    .attr("onmouseout","hideTooltip();");

    
   

    
}

export const drawTriangle = (selection: d3.Selection<SVGElement, any, any, any>, 
    points:string,
    color: string, 
    opacity:number,
    formThicknessColor:string,
    formThickness:number
    ) => {   


    selection.append("polygon").classed('polygon', true)
    .style("display","block")
    .attr("points", points )
    .style("fill",color)
    .style("fill-opacity", opacity)
    .style("stroke", formThicknessColor)
    .style("stroke-width", formThickness)
                    
}

export const drawText= (selection: d3.Selection<SVGElement, any, any, any>, 
    text:string,
    x:number,
    y:number,
    dy:string,
    fontSize:number,
    color: string, 
    fontFamily:string,
    textAnchor:string,
    orientation:string
    ) => {       

    let el:d3.Selection<SVGElement, any, any, any> = selection.append("text").classed("textValue", true)
    .text(text)
    .attr("x", x)
    .attr("y", y)
    .attr("dy", dy)
    .attr("text-anchor", textAnchor)
    .style("font-size", fontSize.toString()+"px")
    .style("fill",color)
    .style("font-family",fontFamily)
    .attr("writing-mode",orientation);  

}

export const widthSVGText = (
    text:string,
    fontSize:number,    
    fontFamily:string
    ) => {

    let textProperties: TextProperties = {
        text: text,
        fontFamily: fontFamily,
        fontSize: ""+fontSize.toString()+"px"
    };

    return Math.ceil(textMeasurementService.measureSvgTextWidth(textProperties));

}

export const eightSVGText = (
    text:string,
    fontSize:number,    
    fontFamily:string
    ) => {

    let textProperties: TextProperties = {
        text: text,
        fontFamily: fontFamily,
        fontSize: ""+fontSize.toString()+"px"
    };

    return Math.ceil(textMeasurementService.measureSvgTextHeight(textProperties));

}

export const drawContourButton = (selection: d3.Selection<SVGElement, any, any, any>, color: string) => {
    selection
    .append("g")
    .append("path")
    .attr("d", `M24.71875,29H7.28125C4.9204102,29,3,27.0791016,3,24.71875V7.28125C3,4.9208984,4.9204102,3,7.28125,3h17.4375
C27.0795898, 3, 29, 4.9208984, 29, 7.28125v17.4375C29, 27.0791016, 27.0795898, 29, 24.71875, 29z M7.28125, 5
    C6.0234375, 5, 5, 6.0234375, 5, 7.28125v17.4375C5, 25.9765625, 6.0234375, 27, 7.28125, 27h17.4375
        C25.9765625, 27, 27, 25.9765625, 27, 24.71875V7.28125C27, 6.0234375, 25.9765625, 5, 24.71875, 5H7.28125z`)
    .attr("fill", color);
};

export const drawMinusButton = (selection: d3.Selection<SVGElement, any, any, any>, color: string) => {
    selection
        .append("g")
        .append("path")
        .attr("d", "M20,17h-8c-0.5522461,0-1-0.4472656-1-1s0.4477539-1,1-1h8c0.5522461,0,1,0.4472656,1,1S20.5522461,17,20,17z")
        .attr("fill", color);
    drawContourButton(selection,color);
/*
    selection
        .append("g")
        .append("path")
        .attr("d", `M24.71875,29H7.28125C4.9204102,29,3,27.0791016,3,24.71875V7.28125C3,4.9208984,4.9204102,3,7.28125,3h17.4375
    C27.0795898, 3, 29, 4.9208984, 29, 7.28125v17.4375C29, 27.0791016, 27.0795898, 29, 24.71875, 29z M7.28125, 5
        C6.0234375, 5, 5, 6.0234375, 5, 7.28125v17.4375C5, 25.9765625, 6.0234375, 27, 7.28125, 27h17.4375
            C25.9765625, 27, 27, 25.9765625, 27, 24.71875V7.28125C27, 6.0234375, 25.9765625, 5, 24.71875, 5H7.28125z`)
        .attr("fill", color);
        */
};

export const drawPlusButton = (selection: d3.Selection<SVGElement, any, any, any>, color: string) => {
    selection
        .append("g")
        .append("path")
        .attr("d", `M24.71875,29H7.28125C4.9204102,29,3,27.0791016,3,24.71875V7.28125C3,4.9208984,4.9204102,3,7.28125,3h17.4375
    C27.0795898,3,29,4.9208984,29,7.28125v17.4375C29,27.0791016,27.0795898,29,24.71875,29z M7.28125,5
        C6.0234375,5,5,6.0234375,5,7.28125v17.4375C5,25.9765625,6.0234375,27,7.28125,27h17.4375
            C25.9765625,27,27,25.9765625,27,24.71875V7.28125C27,6.0234375,25.9765625,5,24.71875,5H7.28125z`)
        .attr("fill", color);

    selection
        .append("g")
        .append("path")
        .attr("d", "M16,21c-0.5522461,0-1-0.4472656-1-1v-8c0-0.5527344,0.4477539-1,1-1s1,0.4472656,1,1v8 C17,20.5527344,16.5522461,21,16,21z")
        .attr("fill", color);
    selection
        .append("g")
        .append("path")
        .attr("d", "M20,17h-8c-0.5522461,0-1-0.4472656-1-1s0.4477539-1,1-1h8c0.5522461,0,1,0.4472656,1,1S20.5522461,17,20,17z")
        .attr("fill", color);
};

export const drawExpandButton = (selection: d3.Selection<d3.BaseType, any, any, any>, color: string) => {
    selection
        .append("path")
        .attr("d", "M33.17 17.17l-9.17 9.17-9.17-9.17-2.83 2.83 12 12 12-12z")
        .attr("fill", color);

    selection
        .append("path")
        .attr("d", "M0 0h48v48h-48z")
        .attr("fill", "none");
};

export const drawCollapseButton = (selection: d3.Selection<d3.BaseType, any, any, any>, color: string) => {
    selection
        .append("path")
        .attr("d", "M24 16l-12 12 2.83 2.83 9.17-9.17 9.17 9.17 2.83-2.83z")
        .attr("fill", color);

    selection
        .append("path")
        .attr("d", "M0 0h48v48h-48z")
        .attr("fill", "none");
};