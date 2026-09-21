export default ({ env }: { env: (key: string) => string }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("rceo6lzn"),
        api_key: env("449263795216252"),
        api_secret: env("PJ7AUgHCAZaluiyJp5N2_YESxl0"),
      },
      actionOptions: {
        upload: {},
        uploadStream: {},
        delete: {},
      },
    },
  },
});
