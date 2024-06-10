function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }
  
  var colorPicker1 = new iro.ColorPicker("#picker1", {
    width: 250,
    color: "rgb(97, 0, 255)",
    borderWidth: 1,
    borderColor: "#fff",
    layout: [
      {
        component: iro.ui.Box,
      },
      {
        component: iro.ui.Slider,
        options: {
          id: 'hue-slider',
          sliderType: 'hue'
        }
      }
    ]
  });
  
  var colorPicker2 = new iro.ColorPicker("#picker2", {
    width: 250,
    color: "rgb(0, 71, 255)",
    borderWidth: 1,
    borderColor: "#fff",
    layout: [
      {
        component: iro.ui.Box,
      },
      {
        component: iro.ui.Slider,
        options: {
          id: 'hue-slider',
          sliderType: 'hue'
        }
      }
    ]
  });
  
  var colorPicker3 = new iro.ColorPicker("#picker3", {
    width: 250,
    color: "rgb(0, 255, 0)",
    borderWidth: 1,
    borderColor: "#fff",
    layout: [
      {
        component: iro.ui.Box,
      },
      {
        component: iro.ui.Slider,
        options: {
          id: 'hue-slider',
          sliderType: 'hue'
        }
      }
    ]
  });
  
  var colorPicker4 = new iro.ColorPicker("#picker4", {
    width: 250,
    color: "rgb(255, 168, 0)",
    borderWidth: 1,
    borderColor: "#fff",
    layout: [
      {
        component: iro.ui.Box,
      },
      {
        component: iro.ui.Slider,
        options: {
          id: 'hue-slider',
          sliderType: 'hue'
        }
      }
    ]
  });
  
  var colorPicker5 = new iro.ColorPicker("#picker5", {
    width: 250,
    color: "rgb(255, 0, 0)",
    borderWidth: 1,
    borderColor: "#fff",
    layout: [
      {
        component: iro.ui.Box,
      },
      {
        component: iro.ui.Slider,
        options: {
          id: 'hue-slider',
          sliderType: 'hue'
        }
      }
    ]
  });
  
  var colorPicker6 = new iro.ColorPicker("#picker6", {
    width: 250,
    color: "rgb(55, 70, 70)",
    borderWidth: 1,
    borderColor: "#fff",
    layout: [
      {
        component: iro.ui.Box,
      },
      {
        component: iro.ui.Slider,
        options: {
          id: 'hue-slider',
          sliderType: 'hue'
        }
      }
    ]
  });
  
  var pickerList={ "1": colorPicker1, "2": colorPicker2, "3": colorPicker3,
   "4": colorPicker4, "5": colorPicker5, "6": colorPicker6};
  
  setFieldsForPicker("1");
  setFieldsForPicker("2");
  setFieldsForPicker("3");
  setFieldsForPicker("4");
  setFieldsForPicker("5");
  setFieldsForPicker("6");
  
    function setFieldsForPicker(extension)
    {
      pickerList[extension].on('color:change', function(color) {
        pickerChanged(color,extension);
        });
  
      $("#HueField"+extension).on('change keydown paste input', function(){
        colorFieldChanged(extension);
      });
      
      $("#SaturationField"+extension).on('change keydown paste input', function(){
        colorFieldChanged(extension);
      });
      
      $("#ValueField"+extension).on('change keydown paste input', function(){
        colorFieldChanged(extension);
      });
      
      $("#HexField"+extension).on('change keydown paste input', function(){
        hexFieldChanged(extension);
      });
    }
  
    function pickerChanged(color, extension)
    {
      document.getElementById("HueField"+extension).value=Math.round(color.hsv["h"]);
      document.getElementById("SaturationField"+extension).value=Math.round(color.hsv["s"]);
      document.getElementById("ValueField"+extension).value=Math.round(color.hsv["v"]);
      document.getElementById("HexField"+extension).value=color.hexString;
      document.getElementById("PickedColor"+extension).style.backgroundColor=color.hexString;
    }
  
    function colorFieldChanged(extension)
    {
      hue=parseFloat(document.getElementById("HueField"+extension).value);
      if(!isNaN(hue))
      {
        if(hue>360) hue=360;
        if(hue<0) hue=0;
      }
      else
      {
        hue=0;
        document.getElementById("HueField"+extension).value=hue;
      }
  
      saturation=document.getElementById("SaturationField"+extension).value;
      if(!isNaN(saturation))
      {
        if(saturation>100) saturation=100;
        if(saturation<0) saturation=0;
      }
      else
      {
        saturation=0;
        document.getElementById("SaturationField"+extension).value=saturation;
      }
  
      value=document.getElementById("ValueField"+extension).value;
      if(!isNaN(value))
      {
        if(value>100) value=100;
        if(value<0) value=0;
      }
      else
      {
        value=0;
        document.getElementById("ValueField"+extension).value=value;
      }
  
      pickerList[extension].color.set({h: hue, s: saturation, v: value});
      document.getElementById("HexField"+extension).value=pickerList[extension].color.hexString;
      document.getElementById("PickedColor"+extension).style.backgroundColor=pickerList[extension].color.hexString;
    }
  
    function hexFieldChanged(extension)
    {
      c=hexToRgb(document.getElementById("HexField"+extension).value);
      if(c!=null)
      {
        document.getElementById("PickedColor"+extension).style.backgroundColor=document.getElementById("HexField"+extension).value;
        pickerList[extension].color.set(c);
        hsv_value=pickerList[extension].color.hsv;
        document.getElementById("HueField"+extension).value=Math.round(hsv_value["h"]);
        document.getElementById("SaturationField"+extension).value=Math.round(hsv_value["s"]);
        document.getElementById("ValueField"+extension).value=Math.round(hsv_value["v"]);
      }
    }
  
    function setShades(extension)
    {
      cp=pickerList[extension];
      old_color=cp.color.hsv;
      document.getElementById("shade5"+extension).style.backgroundColor=cp.color.hexString;
      document.getElementById("shadefield5"+extension).value=cp.color.hexString;
  
      //dark
      dark_saturation=90+getRandomInt(11);
      dark_value=20+getRandomInt(11);
      new_color=cp.color.clone();
      color_hue=new_color.hsv["h"];
      new_color.set({h: color_hue, s: dark_saturation, v: dark_value});
      document.getElementById("shade9"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield9"+extension).value=new_color.hexString;
  
      //light
      light_saturation=5+getRandomInt(6);
      light_value=95+getRandomInt(6);
      new_color.set({h: color_hue, s: light_saturation, v: light_value});
      document.getElementById("shade1"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield1"+extension).value=new_color.hexString;
  
      //middark
      midpoint_x=dark_saturation;
      midpoint_y=old_color["v"]-((dark_saturation-old_color["s"])/2);
      mid_dark=bezierPoint(old_color["s"],old_color["v"],midpoint_x,midpoint_y,dark_saturation,dark_value,0.65);
      new_color.set({h: color_hue, s: mid_dark["valx"], v: mid_dark["valy"]});
      document.getElementById("shade7"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield7"+extension).value=new_color.hexString;
  
      //between dark and middark
      mid_dark=bezierPoint(old_color["s"],old_color["v"],midpoint_x,midpoint_y,dark_saturation,dark_value,0.85);
      new_color.set({h: color_hue, s: mid_dark["valx"], v: mid_dark["valy"]});
      document.getElementById("shade8"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield8"+extension).value=new_color.hexString;
  
      //between middark and chosen color
      mid_dark=bezierPoint(old_color["s"],old_color["v"],midpoint_x,midpoint_y,dark_saturation,dark_value,0.4);
      new_color.set({h: color_hue, s: mid_dark["valx"], v: mid_dark["valy"]});
      document.getElementById("shade6"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield6"+extension).value=new_color.hexString;
  
      //midlight
      midpoint_y=light_value;
      midpoint_x=light_saturation-((light_value-old_color["v"])/2);
      mid_light=bezierPoint(light_saturation,light_value,midpoint_x,midpoint_y,old_color["s"],old_color["v"],0.65);
      new_color.set({h: color_hue, s: mid_light["valx"], v: mid_light["valy"]});
      document.getElementById("shade3"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield3"+extension).value=new_color.hexString;
  
      //between light and midlight
      mid_light=bezierPoint(light_saturation,light_value,midpoint_x,midpoint_y,old_color["s"],old_color["v"],0.4);
      new_color.set({h: color_hue, s: mid_light["valx"], v: mid_light["valy"]});
      document.getElementById("shade2"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield2"+extension).value=new_color.hexString;
  
      //between midlight and chosen color
      mid_light=bezierPoint(light_saturation,light_value,midpoint_x,midpoint_y,old_color["s"],old_color["v"],0.85);
      new_color.set({h: color_hue, s: mid_light["valx"], v: mid_light["valy"]});
      document.getElementById("shade4"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield4"+extension).value=new_color.hexString;
    }
  
    function setShadesNeutral(extension)
    {
      cp=pickerList[extension];
      old_color=cp.color.hsv;
      document.getElementById("shade5"+extension).style.backgroundColor=cp.color.hexString;
      document.getElementById("shadefield5"+extension).value=cp.color.hexString;
  
      //dark
      dark_saturation=90+getRandomInt(11);
      dark_value=10+getRandomInt(6);
      new_color=cp.color.clone();
      color_hue=new_color.hsv["h"];
      new_color.set({h: color_hue, s: dark_saturation, v: dark_value});
      document.getElementById("shade9"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield9"+extension).value=new_color.hexString;
  
      //light
      light_saturation=0+getRandomInt(6);
      light_value=95+getRandomInt(6);
      new_color.set({h: color_hue, s: light_saturation, v: light_value});
      document.getElementById("shade1"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield1"+extension).value=new_color.hexString;
  
      //middark
      midpoint_y=dark_value;
      midpoint_x=dark_saturation-((dark_saturation-old_color["s"])/2);
      mid_dark=bezierPoint(old_color["s"],old_color["v"],midpoint_x,midpoint_y,dark_saturation,dark_value,0.5);
      new_color.set({h: color_hue, s: mid_dark["valx"], v: mid_dark["valy"]});
      document.getElementById("shade7"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield7"+extension).value=new_color.hexString;
  
      //between dark and middark
      mid_dark=bezierPoint(old_color["s"],old_color["v"],midpoint_x,midpoint_y,dark_saturation,dark_value,0.75);
      new_color.set({h: color_hue, s: mid_dark["valx"], v: mid_dark["valy"]});
      document.getElementById("shade8"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield8"+extension).value=new_color.hexString;
  
      //between middark and chosen color
      mid_dark=bezierPoint(old_color["s"],old_color["v"],midpoint_x,midpoint_y,dark_saturation,dark_value,0.25);
      new_color.set({h: color_hue, s: mid_dark["valx"], v: mid_dark["valy"]});
      document.getElementById("shade6"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield6"+extension).value=new_color.hexString;
  
      //midlight
      midpoint_x=light_saturation;
      midpoint_y=light_value-((light_value-old_color["v"])/2);
      mid_light=bezierPoint(light_saturation,light_value,midpoint_x,midpoint_y,old_color["s"],old_color["v"],0.65);
      new_color.set({h: color_hue, s: mid_light["valx"], v: mid_light["valy"]});
      document.getElementById("shade3"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield3"+extension).value=new_color.hexString;
  
      //between light and midlight
      mid_light=bezierPoint(light_saturation,light_value,midpoint_x,midpoint_y,old_color["s"],old_color["v"],0.4);
      new_color.set({h: color_hue, s: mid_light["valx"], v: mid_light["valy"]});
      document.getElementById("shade2"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield2"+extension).value=new_color.hexString;
  
      //between midlight and chosen color
      mid_light=bezierPoint(light_saturation,light_value,midpoint_x,midpoint_y,old_color["s"],old_color["v"],0.85);
      new_color.set({h: color_hue, s: mid_light["valx"], v: mid_light["valy"]});
      document.getElementById("shade4"+extension).style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield4"+extension).value=new_color.hexString;
    }
  
    function bezierPoint(start_x,start_y,control_x,control_y,end_x,end_y,t)
    {
      x=(((1-t)*(1-t))*start_x)+2*((1-t)*t*control_x)+(t*t*end_x);
      y=(((1-t)*(1-t))*start_y)+2*((1-t)*t*control_y)+(t*t*end_y);
      return {valx: x, valy: y};
    }