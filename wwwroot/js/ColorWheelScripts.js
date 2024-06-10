function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
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

      $("#angle").on('change', function(){
        processColors();
      });

      $("#factor").on('change', function(){
        processColors();
      });
    }

    function pickerChanged(color)
    {
      document.getElementById("HueField").value=Math.round(color.hsv["h"]);
      document.getElementById("SaturationField").value=Math.round(color.hsv["s"]);
      document.getElementById("ValueField").value=Math.round(color.hsv["v"]);
      document.getElementById("HexField").value=color.hexString;
      document.getElementById("PickedColor").style.backgroundColor=color.hexString;
      processColors();
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
      processColors();
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
        processColors();
      }
    }

    function readyInputs()
    {
      if(document.getElementById("analogous").checked)
      {
        //factor
        document.getElementById("factor").disabled=true;
        //angle
        angle=document.getElementById("angle");
        angle.disabled=false;
        angle.value=15;
        angle.min=0;
        angle.max=30;
        processColors();
        return;
      }
      if(document.getElementById("complementary").checked)
      {
        //factor
        factor=document.getElementById("factor");
        factor.disabled=false;
        factor.value=30;
        factor.min=0;
        factor.max=45;
        //angle
        document.getElementById("angle").disabled=true;
        processColors();
        return;
      }
      if(document.getElementById("triad").checked)
      {
        //factor
        factor=document.getElementById("factor");
        factor.disabled=false;
        factor.value=30;
        factor.min=0;
        factor.max=45;
        //angle
        angle=document.getElementById("angle");
        angle.disabled=false;
        angle.value=15;
        angle.min=0;
        angle.max=60;
        processColors();
        return;
      }
      if(document.getElementById("monochromatic").checked)
      {
        //factor
        factor=document.getElementById("factor");
        factor.disabled=false;
        factor.value=20;
        factor.min=0;
        factor.max=30;
        //angle
        document.getElementById("angle").disabled=true;
        processColors();
        return;
      }
    }

    function validateInputs()
    {
      if(document.getElementById("analogous").checked)
      {
        val=parseInt(document.getElementById("angle").value);
        if(!isNaN(val))
        {
          if(val>30) val=30;
          if(val<0) val=0;
        }
        else val=15;
        document.getElementById("angle").value=val;
        processColors();
        return;
      }
      if(document.getElementById("complementary").checked)
      {
        val=parseInt(document.getElementById("factor").value);
        if(!isNaN(val))
        {
          if(val>45) val=45;
          if(val<0) val=0;
        }
        else val=30;
        document.getElementById("factor").value=val;
        processColors();
        return;
      }
      if(document.getElementById("triad").checked)
      {
        val=parseInt(document.getElementById("angle").value);
        if(!isNaN(val))
        {
          if(val>60) val=60;
          if(val<0) val=0;
        }
        else val=15;
        document.getElementById("angle").value=val;

        val=parseInt(document.getElementById("factor").value);
        if(!isNaN(val))
        {
          if(val>45) val=45;
          if(val<0) val=0;
        }
        else val=30;
        document.getElementById("factor").value=val;
        processColors();
        return;
      }
      if(document.getElementById("monochromatic").checked)
      {
        val=parseInt(document.getElementById("factor").value);
        if(!isNaN(val))
        {
          if(val>30) val=30;
          if(val<0) val=0;
        }
        else val=20;
        document.getElementById("factor").value=val;
        processColors();
        return;
      }
    }

    function processColors()
    {
        if(document.getElementById("analogous").checked)
        {
            phi=parseFloat(document.getElementById("angle").value);
            new_color=colorPicker.color.clone();
            document.getElementById("shade3").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield3").value=new_color.hexString;

            new_hue=new_color.hsv.h+phi;
            if(new_hue>360)
            {
                new_hue=(new_hue-360);
            }
            new_color.set({h: new_hue, s:new_color.hsv.s, v:new_color.hsv.v});
            document.getElementById("shade2").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield2").value=new_color.hexString;

            new_hue=new_hue+phi;
            if(new_hue>360)
            {
                new_hue=(new_hue-360);
            }
            new_color.set({h: new_hue, s:new_color.hsv.s, v:new_color.hsv.v});
            document.getElementById("shade1").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield1").value=new_color.hexString;

            new_hue=new_hue-(3*phi);
            if(new_hue<0)
            {
                new_hue=360-(-new_hue);
            }
            new_color.set({h: new_hue, s:new_color.hsv.s, v:new_color.hsv.v});
            document.getElementById("shade4").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield4").value=new_color.hexString;

            new_hue=new_hue-phi;
            if(new_hue<0)
            {
                new_hue=360-(-new_hue);
            }
            new_color.set({h: new_hue, s:new_color.hsv.s, v:new_color.hsv.v});
            document.getElementById("shade5").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield5").value=new_color.hexString;

            return;
        }
        if(document.getElementById("complementary").checked)
        {
            scaling_factor=parseFloat(document.getElementById("factor").value);
            new_color=colorPicker.color.clone();
            document.getElementById("shade3").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield3").value=new_color.hexString;
            new_sat=new_color.hsv.s-scaling_factor;
            if(new_sat<0) new_sat=0;
            new_color.set({h: new_color.hsv.h, s:new_sat, v:new_color.hsv.v});
            document.getElementById("shade2").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield2").value=new_color.hexString;
            new_sat=new_color.hsv.s+(2*scaling_factor);
            if(new_sat>100) new_sat=100;
            new_color.set({h: new_color.hsv.h, s:new_sat, v:new_color.hsv.v});
            document.getElementById("shade4").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield4").value=new_color.hexString;

            new_hue=new_color.hsv.h+180;
            if(new_hue>360)
            {
                new_hue=(new_hue-360);
            }
            new_color.set({h: new_hue, s:new_color.hsv.s, v:new_color.hsv.v});
            document.getElementById("shade1").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield1").value=new_color.hexString;

            new_sat=new_color.hsv.s;
            if(new_sat>50) new_sat-=scaling_factor;
            else new_sat+=scaling_factor;
            if(new_sat>100) new_sat=100;
            if(new_sat<0) new_sat=0;
            new_color.set({h: new_hue, s:new_sat, v:new_color.hsv.v});
            document.getElementById("shade5").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield5").value=new_color.hexString;

            return;

        }
        if(document.getElementById("triad").checked)
        {
            phi=parseFloat(document.getElementById("angle").value);
            scaling_factor=parseFloat(document.getElementById("factor").value);
            new_color=colorPicker.color.clone();
            document.getElementById("shade3").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield3").value=new_color.hexString;

            hue_complimentary = new_color.hsv.h + 180;
            hue1 = hue_complimentary + phi;
            hue2 = hue_complimentary - phi;

            new_color.set({h: hue1, s:new_color.hsv.s, v:new_color.hsv.v});
            document.getElementById("shade2").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield2").value=new_color.hexString;
            new_sat=new_color.hsv.s;
            if(new_sat<=(100-scaling_factor))
            {
                new_sat+=scaling_factor;
            }
            else
            {
                new_sat-=scaling_factor;
            }
            new_color.set({h: hue1, s:new_sat, v:new_color.hsv.v});
            document.getElementById("shade1").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield1").value=new_color.hexString;

            new_sat=colorPicker.color.hsv.s;
            new_color.set({h: hue2, s:new_sat, v:new_color.hsv.v});
            document.getElementById("shade4").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield4").value=new_color.hexString;
            new_sat=new_color.hsv.s;
            if(new_sat<=(100-scaling_factor))
            {
                new_sat+=scaling_factor;
            }
            else
            {
                new_sat-=scaling_factor;
            }
            new_color.set({h: hue2, s:new_sat, v:new_color.hsv.v});
            document.getElementById("shade5").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield5").value=new_color.hexString;
            return;
        }
        if(document.getElementById("monochromatic").checked)
        {
            scaling_factor=parseFloat(document.getElementById("factor").value);
            selected_color=colorPicker.color.clone();
            new_color=selected_color.clone();
            document.getElementById("shade3").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield3").value=new_color.hexString;
            new_color.set({r:selected_color.rgb.r*((100-scaling_factor)/100), g: selected_color.rgb.g*((100-scaling_factor)/100),b:selected_color.rgb.b*((100-scaling_factor)/100)});
            document.getElementById("shade2").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield2").value=new_color.hexString;
            new_color.set({r:selected_color.rgb.r*((100-(2*scaling_factor))/100), g: selected_color.rgb.g*((100-(2*scaling_factor))/100),b:selected_color.rgb.b*((100-(2*scaling_factor))/100)});
            document.getElementById("shade1").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield1").value=new_color.hexString;
            new_color.set({r:selected_color.rgb.r*((100+scaling_factor)/100), g: selected_color.rgb.g*((100+scaling_factor)/100),b:selected_color.rgb.b*((100+scaling_factor)/100)});
            document.getElementById("shade4").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield4").value=new_color.hexString;
            new_color.set({r:selected_color.rgb.r*((100+(2*scaling_factor))/100), g: selected_color.rgb.g*((100+(2*scaling_factor))/100),b:selected_color.rgb.b*((100+(2*scaling_factor))/100)});
            document.getElementById("shade5").style.backgroundColor=new_color.hexString;
            document.getElementById("shadefield5").value=new_color.hexString;

            return;
        }
    }


var colorPicker = new iro.ColorPicker("#picker", {
    width: 250,
    color: "rgb(255, 255, 255)",
    borderWidth: 1,
    borderColor: "#fff",
  });

  setFieldsForPicker();