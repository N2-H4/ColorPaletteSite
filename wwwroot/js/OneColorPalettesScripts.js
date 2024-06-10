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

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  
  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  function bezierPoint(start_x,start_y,control_x,control_y,end_x,end_y,t)
  {
      x=(((1-t)*(1-t))*start_x)+2*((1-t)*t*control_x)+(t*t*end_x);
      y=(((1-t)*(1-t))*start_y)+2*((1-t)*t*control_y)+(t*t*end_y);
      return {valx: x, valy: y};
  }

  function setFieldsForPicker()
    {
        colorPicker.on('color:change', function(color) {
        pickerChanged(color);
        });
  
      $("#HueField").on('change keydown paste input', function(){
        colorFieldChanged();
      });
      
      $("#SaturationField").on('change keydown paste input', function(){
        colorFieldChanged();
      });
      
      $("#ValueField").on('change keydown paste input', function(){
        colorFieldChanged();
      });
      
      $("#HexField").on('change keydown paste input', function(){
        hexFieldChanged();
      });
    }

    function setFieldsForPicker2()
    {
        colorPicker2.on('color:change', function(color) {
        pickerChanged2(color);
        });
  
      $("#HueField2").on('change keydown paste input', function(){
        colorFieldChanged2();
      });
      
      $("#SaturationField2").on('change keydown paste input', function(){
        colorFieldChanged2();
      });
      
      $("#ValueField2").on('change keydown paste input', function(){
        colorFieldChanged2();
      });
      
      $("#HexField2").on('change keydown paste input', function(){
        hexFieldChanged2();
      });
    }
  
    function pickerChanged(color)
    {
      document.getElementById("HueField").value=Math.round(color.hsv["h"]);
      document.getElementById("SaturationField").value=Math.round(color.hsv["s"]);
      document.getElementById("ValueField").value=Math.round(color.hsv["v"]);
      document.getElementById("HexField").value=color.hexString;
      document.getElementById("PickedColor").style.backgroundColor=color.hexString;
    }

    function pickerChanged2(color)
    {
      document.getElementById("HueField2").value=Math.round(color.hsv["h"]);
      document.getElementById("SaturationField2").value=Math.round(color.hsv["s"]);
      document.getElementById("ValueField2").value=Math.round(color.hsv["v"]);
      document.getElementById("HexField2").value=color.hexString;
      document.getElementById("PickedColor2").style.backgroundColor=color.hexString;
    }
  
    function colorFieldChanged()
    {
      hue=parseFloat(document.getElementById("HueField").value);
      if(!isNaN(hue))
      {
        if(hue>360) hue=360;
        if(hue<0) hue=0;
      }
      else
      {
        hue=0;
        document.getElementById("HueField").value=hue;
      }
  
      saturation=document.getElementById("SaturationField").value;
      if(!isNaN(saturation))
      {
        if(saturation>100) saturation=100;
        if(saturation<0) saturation=0;
      }
      else
      {
        saturation=0;
        document.getElementById("SaturationField").value=saturation;
      }
  
      value=document.getElementById("ValueField").value;
      if(!isNaN(value))
      {
        if(value>100) value=100;
        if(value<0) value=0;
      }
      else
      {
        value=0;
        document.getElementById("ValueField").value=value;
      }
  
      colorPicker.color.set({h: hue, s: saturation, v: value});
      document.getElementById("HexField").value=colorPicker.color.hexString;
      document.getElementById("PickedColor").style.backgroundColor=colorPicker.color.hexString;
    }

    function colorFieldChanged2()
    {
      hue=parseFloat(document.getElementById("HueField2").value);
      if(!isNaN(hue))
      {
        if(hue>360) hue=360;
        if(hue<0) hue=0;
      }
      else
      {
        hue=0;
        document.getElementById("HueField2").value=hue;
      }
  
      saturation=document.getElementById("SaturationField2").value;
      if(!isNaN(saturation))
      {
        if(saturation>100) saturation=100;
        if(saturation<0) saturation=0;
      }
      else
      {
        saturation=0;
        document.getElementById("SaturationField2").value=saturation;
      }
  
      value=document.getElementById("ValueField2").value;
      if(!isNaN(value))
      {
        if(value>100) value=100;
        if(value<0) value=0;
      }
      else
      {
        value=0;
        document.getElementById("ValueField2").value=value;
      }
  
      colorPicker2.color.set({h: hue, s: saturation, v: value});
      document.getElementById("HexField2").value=colorPicker2.color.hexString;
      document.getElementById("PickedColor2").style.backgroundColor=colorPicker2.color.hexString;
    }
  
    function hexFieldChanged()
    {
      c=hexToRgb(document.getElementById("HexField").value);
      if(c!=null)
      {
        document.getElementById("PickedColor").style.backgroundColor=document.getElementById("HexField").value;
        colorPicker.color.set(c);
        hsv_value=colorPicker.color.hsv;
        document.getElementById("HueField").value=Math.round(hsv_value["h"]);
        document.getElementById("SaturationField").value=Math.round(hsv_value["s"]);
        document.getElementById("ValueField").value=Math.round(hsv_value["v"]);
      }
    }

    function hexFieldChanged2()
    {
      c=hexToRgb(document.getElementById("HexField2").value);
      if(c!=null)
      {
        document.getElementById("PickedColor2").style.backgroundColor=document.getElementById("HexField2").value;
        colorPicker2.color.set(c);
        hsv_value=colorPicker2.color.hsv;
        document.getElementById("HueField2").value=Math.round(hsv_value["h"]);
        document.getElementById("SaturationField2").value=Math.round(hsv_value["s"]);
        document.getElementById("ValueField2").value=Math.round(hsv_value["v"]);
      }
    }

    function incrementHue(hue, direction)
    {
        new_hue=hue+(direction*(15+getRandomInt(11)));
        if(new_hue>360)
        {
            dif=new_hue-360;
            new_hue=0+dif;
        }
        if(new_hue<0)
        {
            dif=0-new_hue;
            new_hue=360-dif;
        }
        return new_hue;
    }

    function overlay(base, blend)
    {
      new_r=0;
      new_g=0;
      new_b=0;
      base_r=base.r/255;
      base_g=base.g/255;
      base_b=base.b/255;
      blend_r=blend.r/255;
      blend_g=blend.g/255;
      blend_b=blend.b/255;

      if(base_r<0.5)
      {
        new_r=2*base_r*blend_r;
      }
      else
      {
        new_r=1-(2*(1-base_r)*(1-blend_r));
      }
      if(base_g<0.5)
      {
        new_g=2*base_g*blend_g;
      }
      else
      {
        new_g=1-(2*(1-base_g)*(1-blend_g));
      }
      if(base_b<0.5)
      {
        new_b=2*base_b*blend_b;
      }
      else
      {
        new_b=1-(2*(1-base_b)*(1-blend_b));
      }
      return rgbToHex(Math.round(new_r*255),Math.round(new_g*255),Math.round(new_b*255));
    }

    function generatePalette()
    {
      main_color=colorPicker.color.hsv;
      direction=1;
      if(document.getElementById("checkboxDirection").checked)
      {
        direction=-1;
      }
      hue_offset=7+getRandomInt(11);
      sat_offset=10+getRandomInt(11);
      val_offset=10+getRandomInt(16);
      document.getElementById("shade52").style.backgroundColor=colorPicker.color.hexString;
      document.getElementById("shadefield52").value=colorPicker.color.hexString;

      //lighter
      new_color=colorPicker.color.clone();
      color_hue=main_color["h"];

      generateLighter(new_color.clone(),hue_offset,direction,sat_offset,val_offset,"51");
      generateDarker(new_color.clone(),hue_offset,-direction,sat_offset,val_offset,"53");

      midpoint_y=100;
      midpoint_x=main_color["s"]-((100-main_color["v"])/2);

      point=bezierPoint(main_color["s"],main_color["v"],midpoint_x,midpoint_y,0,100,0.25);
      color_hue=incrementHue(color_hue,direction);
      new_color.set({h: color_hue, s: point["valx"], v: point["valy"]});
      document.getElementById("shade42").style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield42").value=new_color.hexString;
      generateLighter(new_color.clone(),hue_offset,direction,sat_offset,val_offset,"41");
      generateDarker(new_color.clone(),hue_offset,-direction,sat_offset,val_offset,"43");

      point=bezierPoint(main_color["s"],main_color["v"],midpoint_x,midpoint_y,0,100,0.5);
      color_hue=incrementHue(color_hue,direction);
      new_color.set({h: color_hue, s: point["valx"], v: point["valy"]});
      document.getElementById("shade32").style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield32").value=new_color.hexString;
      generateLighter(new_color.clone(),hue_offset,direction,sat_offset,val_offset,"31");
      generateDarker(new_color.clone(),hue_offset,-direction,sat_offset,val_offset,"33");

      point=bezierPoint(main_color["s"],main_color["v"],midpoint_x,midpoint_y,0,100,0.7);
      color_hue=incrementHue(color_hue,direction);
      new_color.set({h: color_hue, s: point["valx"], v: point["valy"]});
      document.getElementById("shade22").style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield22").value=new_color.hexString;
      generateLighter(new_color.clone(),hue_offset,direction,sat_offset,val_offset,"21");
      generateDarker(new_color.clone(),hue_offset,-direction,sat_offset,val_offset,"23");

      point=bezierPoint(main_color["s"],main_color["v"],midpoint_x,midpoint_y,0,100,0.8);
      color_hue=incrementHue(color_hue,direction);
      new_color.set({h: color_hue, s: point["valx"], v: point["valy"]});
      document.getElementById("shade12").style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield12").value=new_color.hexString;
      generateLighter(new_color.clone(),hue_offset,direction,sat_offset,val_offset,"11");
      generateDarker(new_color.clone(),hue_offset,-direction,sat_offset,val_offset,"13");

      //darker
      color_hue=main_color["h"];
      midpoint_x=100;
      midpoint_y=main_color["v"]-((100-main_color["s"])/2);

      point=bezierPoint(main_color["s"],main_color["v"],midpoint_x,midpoint_y,100,0,0.25);
      color_hue=incrementHue(color_hue,-direction);
      new_color.set({h: color_hue, s: point["valx"], v: point["valy"]});
      document.getElementById("shade62").style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield62").value=new_color.hexString;
      generateLighter(new_color.clone(),hue_offset,direction,sat_offset,val_offset,"61");
      generateDarker(new_color.clone(),hue_offset,-direction,sat_offset,val_offset,"63");

      point=bezierPoint(main_color["s"],main_color["v"],midpoint_x,midpoint_y,100,0,0.5);
      color_hue=incrementHue(color_hue,-direction);
      new_color.set({h: color_hue, s: point["valx"], v: point["valy"]});
      document.getElementById("shade72").style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield72").value=new_color.hexString;
      generateLighter(new_color.clone(),hue_offset,direction,sat_offset,val_offset,"71");
      generateDarker(new_color.clone(),hue_offset,-direction,sat_offset,val_offset,"73");

      point=bezierPoint(main_color["s"],main_color["v"],midpoint_x,midpoint_y,100,0,0.7);
      color_hue=incrementHue(color_hue,-direction);
      new_color.set({h: color_hue, s: point["valx"], v: point["valy"]});
      document.getElementById("shade82").style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield82").value=new_color.hexString;
      generateLighter(new_color.clone(),hue_offset,direction,sat_offset,val_offset,"81");
      generateDarker(new_color.clone(),hue_offset,-direction,sat_offset,val_offset,"83");

      point=bezierPoint(main_color["s"],main_color["v"],midpoint_x,midpoint_y,100,0,0.8);
      color_hue=incrementHue(color_hue,-direction);
      new_color.set({h: color_hue, s: point["valx"], v: point["valy"]});
      document.getElementById("shade92").style.backgroundColor=new_color.hexString;
      document.getElementById("shadefield92").value=new_color.hexString;
      generateLighter(new_color.clone(),hue_offset,direction,sat_offset,val_offset,"91");
      generateDarker(new_color.clone(),hue_offset,-direction,sat_offset,val_offset,"93");

    }

    function generateLighter(color, hue_offset, hue_direction, sat_offset, val_offset, index)
    {
        new_hue=color.hsv["h"]+(hue_direction*hue_offset);
        if(new_hue>360)
        {
            dif=new_hue-360;
            new_hue=0+dif;
        }
        if(new_hue<0)
        {
            dif=0-new_hue;
            new_hue=360-dif;
        }
        new_sat=color.hsv["s"]-sat_offset;
        if(new_sat<0)
        {
            new_sat=0;
        }
        new_val=color.hsv["v"]+val_offset;
        if(new_val>100)
        {
            new_val=100;
        }
        color.set({h: new_hue, s: new_sat, v: new_val});
        document.getElementById("shade"+index).style.backgroundColor=color.hexString;
        document.getElementById("shadefield"+index).value=color.hexString;
    }

    function generateDarker(color, hue_offset, hue_direction, sat_offset, val_offset, index)
    {
        new_hue=color.hsv["h"]+(hue_direction*hue_offset);
        if(new_hue>360)
        {
            dif=new_hue-360;
            new_hue=0+dif;
        }
        if(new_hue<0)
        {
            dif=0-new_hue;
            new_hue=360-dif;
        }
        new_sat=color.hsv["s"]+sat_offset;
        if(new_sat>100)
        {
            new_sat=100;
        }
        new_val=color.hsv["v"]-val_offset;
        if(new_val<0)
        {
            new_val=0;
        }
        color.set({h: new_hue, s: new_sat, v: new_val});
        document.getElementById("shade"+index).style.backgroundColor=color.hexString;
        document.getElementById("shadefield"+index).value=color.hexString;
    }

    function generateOverlay()
    {
      blend=colorPicker2.color.rgb;

      for(i=1;i<=9;i++)
      {
        for(j=1;j<=3;j++)
        {
          base=hexToRgb(document.getElementById("shadefield"+i+j).value);
          c=overlay(base,blend);
          document.getElementById("shade"+i+j+"2").style.backgroundColor=c;
          document.getElementById("shadefield"+i+j+"2").value=c;
        }
      }

    }


  var colorPicker = new iro.ColorPicker("#picker", {
    width: 250,
    color: "rgb(0, 0, 0)",
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
    color: "rgb(0, 0, 0)",
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

  setFieldsForPicker();
  setFieldsForPicker2();