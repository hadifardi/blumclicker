(() => {

    if (window.BlumAC) return;
    window.BlumAC = true;
  
    const autoPlay = true;
    const gc = [208, 216, 0];
    const t = 5;
  
    if (autoPlay) {
      setInterval(() => {
        const playButton = document.querySelector("button.is-primary, .play-btn");
        if (!playButton) return;
        if (!playButton.textContent.toLowerCase().includes("play")) return;
        playButton.click();
      }, 5000)
    }
  
    setInterval(() => {
      const canvas = document.querySelector("canvas");
      if (canvas) findAndClickObjects(canvas);
    }, 100);
  
    function findAndClickObjects(screenCanvas) {
      const context = screenCanvas.getContext('2d');
      const width = screenCanvas.width;
      const height = screenCanvas.height;
      const imageData = context.getImageData(0, 0, width, height);
      const pixels = imageData.data;
  
      for (let x = 0; x < width; x += 1) {
        for (let y = 0; y < height; y += 1) {
          if (y < 70) continue;
  
          const index = (y * width + x) * 4;
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
  
          const greenRange = (gc[0] - t < r && r < gc[0] + t) && (gc[1] - t < g && g < gc[1] + t) && (gc[2] - t < b && b < gc[2] + t);
          
          total_hit = getRandomInt(10, 15);
          total_miss = getRandomInt(1, 4);
          
          hit_cnt = 0;
          miss_cnt = 0;

          randomBoolean = Math.random() <= 0.5; 
        
          if (greenRange) {
            if(randomBoolean){
                simulateClick(screenCanvas, x, y);
                hit_cnt += 1;
                if(hit_cnt == total_hit){
                    hit_cnt = 0;
                }
            } else {
                miss_cnt += 1;
                if(miss_cnt == total_miss){
                    miss_cnt = 0;
                }
            }
          }
        }
      }
    }

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
  
    function simulateClick(canvas, x, y) {
      const prop = {
        clientX: x,
        clientY: y,
        bubbles: true
      };
      canvas.dispatchEvent(new MouseEvent('click', prop));
      canvas.dispatchEvent(new MouseEvent('mousedown', prop));
      canvas.dispatchEvent(new MouseEvent('mouseup', prop));
    }
  
  })();
