export default function () {
  const { $storage } = useNuxtApp();
  const uploadProgress = ref(0);

  async function upload(path, file) {
    return await $storage.put(path, file, {
      progressCallback(progress) {
        uploadProgress.value = progress.loaded;
      },
    });
  }

  async function get(key) {
    return await $storage.get(key);
  }

  return {
    uploadProgress,
    upload,
    get,
  };
}
