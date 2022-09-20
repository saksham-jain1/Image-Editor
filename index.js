let options = {
  rotate: {
    min: 0,
    max: 360,
    value: 0,
  },
  skew: {
    min: 0,
    max: 45,
    value: 0,
  },
  scale: {
    min: 1,
    max: 3,
    value: 1,
  },
  flip: {
    vflip: false,
    hflip: false,
  },
  brightness: {
    min: -100,
    max: 200,
    value: 0,
  },
  blur: {
    min: 0,
    max: 5,
    value: 0,
    step:0.1,
  },
  contrast: {
    min: -100,
    max: 200,
    value: 0,
  },
  grayscale: {
    min: 0,
    max: 100,
    value: 0,
  },
  hue: {
    min: 0,
    max: 360,
    value: 0,
  },
  invert: {
    min: 0,
    max: 100,
    value: 0,
  },
  saturate: {
    min: -100,
    max: 100,
    value: 0,
  },
  sepia: {
    min: 0,
    max: 100,
    value: 0,
  },
  opacity: {
    min: 0,
    max: 100,
    value: 100,
  },
};
let selected_option = "rotate";

function update_option(e)
{
    document.getElementById(selected_option).classList.remove('selected');
    document.getElementById(e).classList.add('selected');
    selected_option=e;
    if(e!="flip")
    document.getElementById(
      "slider"
    ).innerHTML = `<span id="input_range">${options[selected_option].value}</span> <input type="range" min="${options[selected_option].min}" step="${options[selected_option]?.step}" max="${options[selected_option].max}"  oninput=update_value() value="${options[selected_option].value}" name="" id="input_slider">`;
    else
    {
      document.getElementById("slider").innerHTML = `<div class="flip_box">
                        <button class="flip" name="Vertical Flip"  onclick="update_flip('vflip')" id="vflip"><img src="flip.png"></button>
                        <button class="flip" name="Horizontal Flip"  onclick="update_flip('hflip')" id="hflip"><img src="flip (1).png"></button>
                </div>`;
    }
}

function update_flip(e)
{
  options.flip[e]=!options.flip[e];
  if(options.flip[e])
  document.getElementById(e).classList.add("selected")
  else
  document.getElementById(e).classList.remove("selected");
  update_value();
}

function update_value()
{
  if(selected_option!="flip")
  {
    options[selected_option].value = document.getElementById("input_slider").value;
    document.getElementById("input_range").innerText =
      options[selected_option].value;
  }
    document.getElementById("edit").style.transform = `rotate(${
      options.rotate.value
    }deg) skew(${options.skew.value}deg) scale(${options.flip.vflip ? -1 : 1},${
      options.flip.hflip ? -1 : 1
    })`;
    document.getElementById("edit").style.filter = `brightness(${
      options.brightness.value * 1 + 100
    }%) contrast(${options.contrast.value * 1 + 100}%) grayscale(${
      options.grayscale.value
    }%) hue-rotate(${options.hue.value}deg) saturate(${
      options.saturate.value * 1 + 100
    }%) blur(${options.blur.value}px) sepia(${options.sepia.value}%) opacity(${
      options.opacity.value
    }%) invert(${options.invert.value}%)`;
}

function download()
{
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = document.getElementById("edit").naturalWidth;
  canvas.height = document.getElementById("edit").naturalHeight;

  ctx.filter = `brightness(${options.brightness.value * 1 + 100}%) contrast(${
    options.contrast.value * 1 + 100
  }%) grayscale(${options.grayscale.value}%) hue-rotate(${
    options.hue.value
  }deg) saturate(${options.saturate.value * 1 + 100}%) blur(${
    options.blur.value
  }px) sepia(${options.sepia.value}%) opacity(${
    options.opacity.value
  }%) invert(${options.invert.value}%)`;
  ctx.translate(canvas.width / 2, canvas.height / 2);
  if (rotate !== 0) {
    ctx.rotate(options.rotate.value*Math.PI/100);
  }
  ctx.scale(options.flip.vflip ? -1 : 1, options.flip.hflip ? -1 : 1);
  ctx.drawImage(
    document.getElementById("edit"),
    -canvas.width / 2,
    -canvas.height / 2,
    canvas.width,
    canvas.height
  );

  const link = document.createElement("a");
  link.download = "image.jpg";
  link.href = canvas.toDataURL();
  link.click();
}

function selectImg()
{
  document.getElementById("file-input").click();
}

function setImg()
{
  let file = document.getElementById("file-input").files[0];
  if (!file) return;
  document.getElementById("edit").src = URL.createObjectURL(file);
}