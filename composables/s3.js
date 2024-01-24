export default function () {
  const { $storage } = useNuxtApp();
  const uploadProgress = ref(0);
  async function upload(path, file) {
    return await $storage.put(path, file, {
      onProgress({ transferredBytes, totalBytes }) {
        uploadProgress.value = (transferredBytes / totalBytes) * 100;
      },
    });
  }

  async function get(key, options = {}) {
    return await $storage.getUrl({
      key, options
    });
  }

  async function download(key, options) {
    return await $storage.downloadData(key, {
      onProgress({ transferredBytes, totalBytes }) {
        uploadProgress.value = (transferredBytes / totalBytes) * 100;
      },
      ...options
    });
  }

  return {
    uploadProgress,
    upload,
    get,
    download
  };
}
