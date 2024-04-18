import { UploadParams, Uploader } from "@/domain/forum/application/storage/uploader";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Injectable } from "@nestjs/common";
import { randomUUID } from "node:crypto";
import { EnvService } from "../env/env.service";

@Injectable()
export class R2Storage implements Uploader {
  private client: S3Client;

  constructor(private readonly envService: EnvService) {
    const accountId = this.envService.get("CLOUDFLARE_ACCOUNT_ID");

    const accessKeyId = this.envService.get("AWS_ACCESS_KEY_ID");
    const secretAccessKey = this.envService.get("AWS_SECRET_ACESS_KEY");

    this.client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: "auto",
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  async upload({ fileName, fileType, body }: UploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    const bucketName = this.envService.get("AWS_BUCKET_NAME");

    await this.client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      }),
    );

    return {
      url: uniqueFileName,
    };
  }
}
