import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api"
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];

var myCard0C9344B84A2D4C9EA84F14B44A189AB3_DEBUG: IVisualPlugin = {
    name: 'myCard0C9344B84A2D4C9EA84F14B44A189AB3_DEBUG',
    displayName: 'My first Card',
    class: 'Visual',
    apiVersion: '2.6.0',
    create: (options: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }

        throw 'Visual instance not found';
    },
    custom: true
};

if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["myCard0C9344B84A2D4C9EA84F14B44A189AB3_DEBUG"] = myCard0C9344B84A2D4C9EA84F14B44A189AB3_DEBUG;
}

export default myCard0C9344B84A2D4C9EA84F14B44A189AB3_DEBUG;