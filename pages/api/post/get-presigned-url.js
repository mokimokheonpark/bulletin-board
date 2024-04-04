import aws from "aws-sdk";

export default async function handler(res, req) {
  aws.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_KEY_ID,
    region: "us-east-2",
    signatureVersion: "v4",
  });

  const s3 = new aws.S3();
  const url = await s3.createPresignedPost({
    Bucket: process.env.S3_BUCKET_NAME,
    Fields: { key: res.query.file },
    Expires: 60,
    Conditions: [["content-length-range", 0, 5242880]],
  });

  req.status(200).json(url);
}
