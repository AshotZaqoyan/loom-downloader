import './style.css';
import axios from 'axios';

const fileInput = document.querySelector("input"),
  downloadBtn = document.querySelector("button"),
  errorElement = document.getElementById("error");

const fetchLoomDownloadUrl = async (id) => {
  try {
    const { data } = await axios.post(`https://www.loom.com/api/campaigns/sessions/${id}/transcoded-url`);
    return data.url;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      throw new Error('not found');
    } else {
      throw error;
    }
  }
};

const downloadLoomVideo = async (url) => {
  try {
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'arraybuffer',
    });

    const contentDisposition = response.headers['content-disposition'];
    const filename = contentDisposition ? contentDisposition.split('filename=')[1] : 'video.mp4';

    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.setAttribute('download', filename);

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    errorElement.innerHTML = "<p style='color: green;'>Video downloaded successfully!</p>";
    downloadBtn.innerText = "Download";
    //downloadBtn.disabled = false;
  } catch (error) {
    console.error(`Error during download process: ${error.message}`);
    downloadBtn.innerText = "Download";
    downloadBtn.disabled = false;
  }
};

downloadBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const url = fileInput.value.trim();

  if (isLoomLink(url)) {
    errorElement.innerHTML = "";
    downloadBtn.innerText = "Downloading video...";
    downloadBtn.disabled = true;

    const id = extractId(url);

    try {
      const loomUrl = await fetchLoomDownloadUrl(id);

      await downloadLoomVideo(loomUrl);
    } catch (error) {
      if (error.message === 'not found') {
        errorElement.innerText = "Please enter a valid Loom link.";
        errorElement.style.display = "block";
      } else {
        console.error(`Error during fetchLoomDownloadUrl: ${error.message}`);
        errorElement.innerText = "Oops, a problem occurred. Please try again.";
      }
    } finally {
      //downloadBtn.disabled = false; // Enable the button again
    }
  } else {
    errorElement.innerText = "Please enter Loom link only.";
  }
});

fileInput.addEventListener("input", () => {
  errorElement.innerHTML = "";
  if (fileInput.value.trim()!==""){
    downloadBtn.disabled = false;
  } else{
    downloadBtn.disabled = true;
  }
});


const extractId = (url) => {
  url = url.split('?')[0];
  return url.split('/').pop();
};

const isLoomLink = (url) => {
  return url.includes('https://www.loom.com/share/');
};
