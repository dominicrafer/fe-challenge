export default function () {
  const { $storage } = useNuxtApp();
  const uploadProgress = ref(0);
  async function upload(key: string, file: File) {
    return await $storage.uploadData({
      key,
      data: file,
      options: {
        onProgress({ transferredBytes, totalBytes }: any) {
          uploadProgress.value = (transferredBytes / totalBytes) * 100;
        },
      },
    });
  }

  async function get(key: string, options = {}) {
    return await $storage.getUrl({
      key,
      options,
    });
  }

  async function download(key: string, options: Object) {
    return await $storage.downloadData({
      key,
      options: {
        onProgress({ transferredBytes, totalBytes }: any) {
          uploadProgress.value = (transferredBytes / totalBytes) * 100;
        },
        ...options,
      },
    });
  }

  return {
    uploadProgress,
    upload,
    get,
    download,
  };
}
